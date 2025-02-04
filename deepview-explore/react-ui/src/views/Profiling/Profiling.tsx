import { ComputeUtilization, MemoryBatchSize, TimeBreakdown } from '@centml/deepview-ui';
import { useAnalysis } from '@context/useAnalysis';
import { TabPanel } from '@centml/ui';
import { vscode } from '@utils/vscode';

const Profiling = () => {
	const { analysis, detail, timeBreakDown, updateDetail, utilizationData } = useAnalysis();

	return (
		<TabPanel id="profiling">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 mdplus:flex-row">
					<div className="w-full lg:w-[35%]">
						<TimeBreakdown
							handleHighlightCode={({ path, line_no }) => vscode.highlightCode(path, line_no)}
							timeBreakdown={timeBreakDown}
							detail={detail}
							updateDetail={updateDetail}
						/>
					</div>

					<div className="w-full lg:w-[65%]">
						<MemoryBatchSize analysis={analysis} />
					</div>
				</div>
				<ComputeUtilization utilization={analysis.utilization} utilizationData={utilizationData} />
			</div>
		</TabPanel>
	);
};

export default Profiling;
