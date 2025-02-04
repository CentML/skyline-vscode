import * as vscode from 'vscode';
import * as pb from './protobuf/innpv_pb';
import * as path from 'path';
const fs = require('fs');

import {Socket} from 'net';
import { simpleDecoration } from './decorations';
import { energy_component_type_mapping, getObjectKeyNameFromValue } from './utils';
import { stringify } from 'querystring';

const crypto = require('crypto');
const resolve = require('path').resolve;

export interface SkylineSessionOptions {
    context: vscode.ExtensionContext;
    projectRoot: string;
    addr: string;
    port: number;
    providers: string;
    isTelemetryEnabled: CallableFunction;
    webviewPanel: vscode.WebviewPanel;
    telemetryLogger: vscode.TelemetryLogger;
}

export interface SkylineEnvironment {
    reactProjectRoot: string;
}

export class SkylineSession {
    // Backend socket connection
    connection: Socket;
    port: number;
    addr: string;
    providers:string;
    seq_num: number;
    last_length: number;
    message_buffer: Uint8Array;
    startSkyline?: () => void | undefined;

    // Set to true if the backend should be restarted
    resetBackendConnection: boolean;

    // VSCode extension and views
    context: vscode.ExtensionContext;
    webviewPanel: vscode.WebviewPanel;
    openedEditors: Map<string, vscode.TextEditor>;

    // Received messages
    msg_initialize?: pb.InitializeResponse;
    msg_throughput?: pb.ThroughputResponse;
    msg_breakdown?: pb.BreakdownResponse;
    msg_habitat?: pb.HabitatResponse;
    msg_energy?: pb.EnergyResponse;
    msg_utilization? : pb.UtilizationResponse;
    msg_ddp?: pb.DDPBucketSizesComputationTimes;

    // Project information
    root_dir: string;

    // Environment
    reactProjectRoot: string;

    // Analytics
    isTelemetryEnabled: CallableFunction;
    telemetryLogger: vscode.TelemetryLogger;

    constructor(options: SkylineSessionOptions, environ: SkylineEnvironment) {
        console.log("DeepviewSession instantiated");

        this.resetBackendConnection = false;
        this.connection = new Socket();
        this.connection.on('connect', this.on_connect.bind(this));
        this.connection.on('data', this.on_data.bind(this));
        this.connection.on('close', this.on_close_connection.bind(this));
        this.port = options.port;
        this.addr = options.addr;
        this.providers = options.providers;

        this.seq_num = 0;
        this.last_length = -1;
        this.message_buffer = new Uint8Array();

        this.context = options.context;
        this.webviewPanel = options.webviewPanel;
        this.openedEditors = new Map<string, vscode.TextEditor>();

        this.root_dir = options.projectRoot;
        this.reactProjectRoot = environ.reactProjectRoot;

        this.isTelemetryEnabled = options.isTelemetryEnabled;
        this.telemetryLogger = options.telemetryLogger;

        this.webviewPanel.webview.onDidReceiveMessage(this.webview_handle_message.bind(this));
        this.webviewPanel.onDidDispose(this.disconnect.bind(this));
        this.webviewPanel.webview.html = this._getHtmlForWebview();
        
        vscode.workspace.onDidChangeTextDocument(this.on_text_change.bind(this));
        this.restart_profiling = this.restart_profiling.bind(this);
    }

    send_message(message: any, payloadName: string) {
        let msg = new pb.FromClient();
        msg.setSequenceNumber(this.seq_num ++);
        if (payloadName === "Initialize") {
            msg.setInitialize(message);
        } else if (payloadName === "Analysis") {
            msg.setAnalysis(message);
        } else {
            msg.setGeneric(message);
        }

        let buf = msg.serializeBinary();
        const lengthBuffer = Buffer.alloc(4);
        lengthBuffer.writeUInt32BE(buf.length, 0);
        this.connection.write(lengthBuffer);
        this.connection.write(buf);
    }

    on_connect() {
        let connectionMessage = {
            "message_type": "connection",
            "status": true
        };
        this.webviewPanel.webview.postMessage(connectionMessage);
        this.on_open();
    }  

    on_open() {
        // Send skyline initialization request
        console.log("Sending initialization request");
        const message = new pb.InitializeRequest();
        message.setProtocolVersion(5);
        message.setProjectRoot(this.root_dir);
        message.setEntryPoint("entry_point.py");
        this.send_message(message, "Initialize");
    }

    send_analysis_request(ddp_request:boolean) {
        // Send skyline analysis request
        console.log("Sending analysis request");
        const message = new pb.AnalysisRequest();
        message.setMockResponse(false);
        message.setDdpAnalysisRequest(ddp_request);
        this.send_message(message, "Analysis");
    }

    connect() {
        this.connection.connect(this.port, this.addr);
    }

    disconnect() {
        this.connection.destroy();
    }

    async restart_profiling() {
        this.reset_payload();
        let json_msg = await this.generateStateJson();
        json_msg['message_type'] = 'analysis';
        this.webviewPanel.webview.postMessage(json_msg);
    }
    
    on_text_change() {
        console.log("Text change");
        let changeEvent = {
            "message_type": "text_change"
        };
        this.webviewPanel.webview.postMessage(changeEvent);
    }

    report_error(err_text: String) {
        console.log("Reporting Error");
        let errorEvent = {
            "message_type": "error",
            "error_text": err_text
        };
        this.webviewPanel.webview.postMessage(errorEvent);
    }

    on_close_connection() {
        this.msg_initialize = undefined;
        this.reset_payload();
        let connectionMessage = {
            "message_type": "connection",
            "status": false
        };
        
        if (this.webviewPanel.active) {
            this.webviewPanel.webview.postMessage(connectionMessage);
        }        
    }

    reset_payload(){
        this.msg_throughput = undefined;
        this.msg_breakdown = undefined;
        this.msg_habitat = undefined;
        this.msg_energy = undefined;
        this.msg_utilization = undefined;
        this.msg_ddp = undefined;
    }

    webview_handle_message(msg: any) {
        console.log("webview_handle_message");
        console.log(msg);
        if (msg['command'] === 'connect') {
            vscode.window.showInformationMessage("Attempting to connect to backend.");
            this.connect();
        } else if (msg['command'] === 'begin_analysis_clicked') {
			vscode.window.showInformationMessage("Sending analysis request.");
			this.send_analysis_request(msg['ddpFlag']);
        } else if (msg['command'] === 'restart_profiling_clicked') {
			vscode.window.showInformationMessage("Restarting profiling.");
            this.restart_profiling();
        } else if (msg['command'] === "highlight_source_line") {
            const openPath = vscode.Uri.file(path.join(this.root_dir, msg["file"]));
            vscode.workspace.openTextDocument(openPath).then(doc => {
                vscode.window.showTextDocument(doc).then(editor => {
                    editor.revealRange(new vscode.Range(msg["lineno"], 0, msg["lineno"]+1, 0),
                    vscode.TextEditorRevealType.InCenter)
                });
            });
        } else if (msg['command'] === "encoding_start"){
            console.log(this.root_dir, msg);
            if(msg.file_names){
                msg["fileContents"] = []; // array of objects {fileName: encode(fileContent)}
                msg.file_names.forEach((fileName:any)=>{
                    try {
                        const data = fs.readFileSync(path.join(this.root_dir, fileName), "base64");
                        msg["fileContents"].push({name:fileName,content:data});
                      } catch (err) {
                        console.error(err);
                      }
                });
            }
            if (this.webviewPanel.active) {
                this.webviewPanel.webview.postMessage({message_type:"encoded_files",fileContents:msg["fileContents"]});
            }  
        }
    }

    async on_data(message: Uint8Array) {
        console.log("received data. length ", message.byteLength);
        
        // Append new message
        // TODO: Make this less inefficient
        let newBuffer = new Uint8Array(this.message_buffer.byteLength + message.byteLength);
        newBuffer.set(this.message_buffer);
        newBuffer.set(message, this.message_buffer.byteLength);
        this.message_buffer = newBuffer;

        while (this.message_buffer.byteLength >= 4) {
            // Read new message length
            if (this.last_length == -1) {
                this.last_length = (this.message_buffer[0] << 24) | 
                                   (this.message_buffer[1] << 16) |
                                   (this.message_buffer[2] << 8) | 
                                   this.message_buffer[3];
                this.message_buffer = this.message_buffer.slice(4);
            }

            // Digest message or quit if buffer not large enough
            if (this.message_buffer.byteLength >= this.last_length) {
                console.log("Handling message of length", this.last_length);
                let body = this.message_buffer.slice(0, this.last_length);
                this.message_buffer = this.message_buffer.slice(this.last_length);
                this.last_length = -1;
                this.handle_message(body);
            } else {
                break;
            }
        }

    }

    async handle_message(message: Uint8Array) {
        try {
            let msg = pb.FromServer.deserializeBinary(message);
            console.log("PAYLOAD CASE",msg.getPayloadCase());
            switch(msg.getPayloadCase()) {
                case pb.FromServer.PayloadCase.ERROR:
                    break;
                case pb.FromServer.PayloadCase.INITIALIZE:
                    this.msg_initialize = msg.getInitialize();
                    break;
                case pb.FromServer.PayloadCase.ANALYSIS_ERROR:
                    let error_message = msg.getAnalysisError()?.getErrorMessage()
                    if (error_message) {
                        this.report_error(error_message);
                    }
                    break;
                case pb.FromServer.PayloadCase.THROUGHPUT:
                    this.msg_throughput = msg.getThroughput();
                    break;
                case pb.FromServer.PayloadCase.BREAKDOWN:
                    this.msg_breakdown = msg.getBreakdown();
                    break;
                case pb.FromServer.PayloadCase.HABITAT:
                    this.msg_habitat = msg.getHabitat();
                    break;
                case pb.FromServer.PayloadCase.ENERGY:
                    this.msg_energy = msg.getEnergy();
                    break;
                case pb.FromServer.PayloadCase.UTILIZATION:
                    this.msg_utilization = msg.getUtilization();
                    break;
                case pb.FromServer.PayloadCase.DDP:
                    this.msg_ddp = msg.getDdp();
                    break;
            };
            let eventType: string | undefined =  getObjectKeyNameFromValue(pb.FromServer.PayloadCase, msg.getPayloadCase());
            eventType = eventType || "UNKNOWN";
            this.logUsage(eventType, msg.toObject());

            let json_msg = await this.generateStateJson();
            json_msg['message_type'] = 'analysis';
            try {
                fs.writeFileSync('/tmp/msg.json', JSON.stringify(json_msg));
            } catch (e) {
                console.error(e);
                if (e instanceof Error) {
                    this.logError(e);
                }
            }
            this.webviewPanel.webview.postMessage(json_msg);
        } catch (e) {
            console.log("exception!");
            console.log(message);
            console.log(e);
            if (e instanceof Error) {
                this.logError(e);
            }
        }
    }

    /**
     * Append annotations to an editor when opened. This function should be called by some 
     * hook that occurs when a new editor is opened.
     * 
     * @param editor The editor to annotate
     */
    annotate_editor(editor: vscode.TextEditor) {
        let document = editor.document;
        console.log("annotate_editor: ", editor.document.fileName);

        // Don't do anything for non-project files, or when breakdown information is not yet available.
        if (!document.fileName.startsWith(this.root_dir)) return;
        if (!this.msg_breakdown) return;

        let relativePath = document.fileName.slice(this.root_dir.length + 1);
        console.log("relativePath", relativePath);

        // Collect the annotations that belong to this open file
        let decorations = new Map<vscode.Range, vscode.DecorationOptions>();

        for (let node of this.msg_breakdown.getOperationTreeList()) {
            for (let ctx of node.getContextsList()) {
                let path = ctx.getFilePath()?.getComponentsList().join("/");
                console.log("candidiate: ", path);
                if (path == relativePath) {
                    let lineno = ctx.getLineNumber();
                    let opdata = node.getOperation();
                    
                    let label = new vscode.MarkdownString();
                    label.appendMarkdown(`**Forward**: ${opdata!.getForwardMs().toFixed(3)} ms\n\n`);
                    label.appendMarkdown(`**Backward**: ${opdata!.getBackwardMs().toFixed(3)} ms\n\n`);
                    label.appendMarkdown(`**Size**: ${opdata!.getSizeBytes()} bytes\n\n`);

                    let range = new vscode.Range(
                        new vscode.Position(lineno-1, 0),
                        new vscode.Position(lineno-1, 
                            document.lineAt(lineno-1).text.length)
                    );

                    if (!decorations.has(range)) {
                        decorations.set(range, {
                            range: range,
                            hoverMessage: [label]
                        });
                    } else {
                        (decorations.get(range)?.hoverMessage as vscode.MarkdownString).appendMarkdown("---");
                        (decorations.get(range)?.hoverMessage as vscode.MarkdownString).appendMarkdown(label.value);
                    }
                }
            }
        }

        // Add the annotations to the editor window
        editor.setDecorations(simpleDecoration, Array.from(decorations.values()));
    }

    private _getHtmlForWebview() {
        const buildPath = resolve(this.reactProjectRoot);
        console.log("resolved buildPath", buildPath);

		const manifest = require(path.join(buildPath, 'build', 'manifest.json'));
		const mainScript = manifest['index.html']['file'];
		const mainStyle = manifest['index.html']['css'][0];

        const buildPathOnDisk = vscode.Uri.file(path.join(buildPath, 'build'));
        const buildUri = this.webviewPanel.webview.asWebviewUri(buildPathOnDisk);
        const scriptPathOnDisk = vscode.Uri.file(path.join(buildPath, 'build', mainScript));
        const scriptUri = this.webviewPanel.webview.asWebviewUri(scriptPathOnDisk);
        const stylePathOnDisk = vscode.Uri.file(path.join(buildPath, 'build', mainStyle));
        const styleUri = this.webviewPanel.webview.asWebviewUri(stylePathOnDisk);
        const themeClass = vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark ? 'dark' : 'light';

		// Use a nonce to whitelist which scripts can be run
		const nonce = crypto.randomBytes(16).toString('base64');

		return `<!DOCTYPE html>
			<html lang="en" class="${themeClass}">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src *; img-src vscode-resource: http: https: data:; script-src 'unsafe-eval' 'nonce-${nonce}'; style-src vscode-resource: 'unsafe-inline' http: https: data:; font-src https:;">
				<title>DeepView</title>
                <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
                <base href="${ buildUri }/">
                </head>
                <body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
                </body>
			</html>`;
	}
    async generateStateJson() {
        let fields = {
            "message_type": "analysis",

            "project_root": this.msg_initialize?.getServerProjectRoot()?.toString(),
            "project_entry_point": this.msg_initialize?.getEntryPoint()?.toString(),
            "hardware_info": {
                "hostname": this.msg_initialize?.getHardware()?.getHostname(),
                "os": this.msg_initialize?.getHardware()?.getOs(),
                "gpus": this.msg_initialize?.getHardware()?.getGpusList(),
            },
            "throughput": {},
            "breakdown": {},
            "habitat": {},
            "additionalProviders": this.providers,
            "energy": {},
            "utilization": {},
            "ddp": {},
        };

        if (this.msg_throughput) {
            fields['throughput'] = {
                "samples_per_second": this.msg_throughput?.getSamplesPerSecond(),
                "predicted_max_samples_per_second": this.msg_throughput?.getPredictedMaxSamplesPerSecond(),
                "run_time_ms": [ 
                    this.msg_throughput?.getRunTimeMs()?.getSlope(),
                    this.msg_throughput?.getRunTimeMs()?.getBias()
                ],
                "peak_usage_bytes": [ 
                    this.msg_throughput?.getPeakUsageBytes()?.getSlope(),
                    this.msg_throughput?.getPeakUsageBytes()?.getBias()
                ],
                "batch_size_context": this.msg_throughput?.getBatchSizeContext()?.toString(),
                "can_manipulate_batch_size": this.msg_throughput?.getCanManipulateBatchSize()
            };
        }

        if (this.msg_breakdown) {
            fields['breakdown'] = {
                "peak_usage_bytes": this.msg_breakdown.getPeakUsageBytes(),
                "memory_capacity_bytes": this.msg_breakdown.getMemoryCapacityBytes(),
                "iteration_run_time_ms": this.msg_breakdown.getIterationRunTimeMs(),
                "batch_size": this.msg_breakdown.getBatchSize(),
                "num_nodes_operation_tree": this.msg_breakdown.getOperationTreeList().length,
                "num_nodes_weight_tree": this.msg_breakdown.getWeightTreeList().length,

                "operation_tree": this.msg_breakdown.getOperationTreeList().map((elem) => {
                    return { 
                        name: elem.getName(),
                        num_children: elem.getNumChildren(),
                        forward_ms: elem.getOperation()?.getForwardMs(),
                        backward_ms: elem.getOperation()?.getBackwardMs(),
                        size_bytes: elem.getOperation()?.getSizeBytes(),
                        file_refs: elem.getOperation()?.getContextInfoMapList().map((ctx) => {
                            return { 
                                path: (ctx.getContext()?.getFilePath()?.toArray()[0].join("/")),
                                line_no: ctx.getContext()?.getLineNumber(),
                                run_time_ms: ctx.getRunTimeMs(),
                                size_bytes: ctx.getSizeBytes(),
                            }
                        })
                    };
                })
            };
        }

        if (this.msg_habitat) {
            const predictions = [];
            for (let prediction of this.msg_habitat.getPredictionsList()) {
                predictions.push([ prediction.getDeviceName(), prediction.getRuntimeMs() ]);
            }
            fields['habitat'] = {
                predictions,
                error: this.msg_habitat.getAnalysisError()?.getErrorMessage()
            };
        }



        if (this.msg_energy){
            fields['energy'] = {
                current:{
                    total_consumption: this.msg_energy.getTotalConsumption(),
                    components: this.msg_energy.getComponentsList().map((item)=> ({type:energy_component_type_mapping(item.getComponentType()), consumption:item.getConsumptionJoules()})),
                    batch_size: this.msg_energy.getBatchSize()
                },
                past_measurements: this.msg_energy.getPastMeasurementsList().map((exp)=>(
                    {
                        total_consumption: exp.getTotalConsumption(),
                        components: exp.getComponentsList().map((item)=> ({type:energy_component_type_mapping(item.getComponentType()), consumption:item.getConsumptionJoules()})),
                        batch_size: exp.getBatchSize()

                    }
                )),
                error: this.msg_energy.getAnalysisError()?.getErrorMessage()
            };
        }

        if(this.msg_utilization){
            const rootNode = this.msg_utilization.getRootnode();
            interface NodeDataType {
                sliceId : number,
                name: string,
                start: number,
                end: number,
                cpuForward: number,
                cpuForwardSpan: number,
                gpuForward: number,
                gpuForwardSpan: number,
                cpuBackward: number,
                cpuBackwardSpan: number,
                gpuBackward: number,
                gpuBackwardSpan: number,
                children: Array<NodeDataType>,
            }
            if(rootNode)
            {
                const buildModelTree = (node: pb.UtilizationNode) =>{
                    const newNode: NodeDataType = {
                        sliceId :node.getSliceId(),
                        name: node.getName(),
                        start: node.getStart(),
                        end: node.getEnd(),
                        cpuForward: node.getCpuForward(),
                        cpuForwardSpan: node.getCpuForwardSpan(),
                        gpuForward: node.getGpuForward(),
                        gpuForwardSpan: node.getGpuForwardSpan(),
                        cpuBackward: node.getCpuBackward(),
                        cpuBackwardSpan: node.getCpuBackwardSpan(),
                        gpuBackward: node.getGpuBackward(),
                        gpuBackwardSpan: node.getGpuBackwardSpan(),
                        children:[]
                    };
                    const arrChild: Array<any> = node.getChildrenList().map((child)=>{
                            return buildModelTree(child);
                    });
                    if(arrChild.length > 0){newNode['children'] = arrChild;}
                    return newNode;
                };
                fields['utilization'] = {rootNode: buildModelTree(rootNode)};
            }
            fields['utilization'] = {...fields['utilization'],
                error:this.msg_utilization.getAnalysisError()?.getErrorMessage(),
                tensor_core_usage: this.msg_utilization.getTensorUtilization()
            };             
        }

        if(this.msg_ddp){
            fields['ddp'] = {
                fw_time: this.msg_ddp.getForwardTimeMs(),
                bucket_sizes: this.msg_ddp.getBucketSizesList(),
                expected_max_compute_times_array: this.msg_ddp.getComputationTimesList()?.map((item)=>({
                    ngpus: item.getNgpus(),
                    expected_compute_times: item.getExpectedMaxTimesList()
                })),
                error: this.msg_ddp.getAnalysisError()?.getErrorMessage(),
            };
        }

        return fields;
    }

    logUsage(eventName: string, data?: Record<string, any>){
        if (this.isTelemetryEnabled()) {
            this.telemetryLogger.logUsage(eventName, data);
        }
    }

    logError(data?: Record<string, any>){
        if (this.isTelemetryEnabled()) {
            this.telemetryLogger.logError("Client Error", data);
        }
    }
}
