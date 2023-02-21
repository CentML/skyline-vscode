export const profiling_data = {
    message_type: "analysis",
    hardware_info: {
      gpus: ["Test GPU"],
    },
    project_root: "/home/ubuntu/habitat-a100/skyline/samples/resnet",
    project_entry_point: "entry_point.py",
    throughput: {
      samples_per_second: 179.4022216796875,
      predicted_max_samples_per_second: 253.4250946044922,
      run_time_ms: [3.9459390531219505,5.8745377327263055],
      peak_usage_bytes: [85101998.60686015,362023034.03342235],
      batch_size_context: "entry_point.py,11",
      can_manipulate_batch_size: true,
    },
    breakdown: {
      peak_usage_bytes: 692299776,
      memory_capacity_bytes: 8589934592,
      iteration_run_time_ms: 24.008880615234375,
      batch_size: 4,
      num_nodes_operation_tree: 56,
      num_nodes_weight_tree: 72,
      operation_tree: [
        {
          name: "root",
          num_children: 11,
          forward_ms: 12.462421417236328,
          backward_ms: 20.851369857788086,
          size_bytes: 1386957824,
          file_refs: [
            {
              path: "resnet.py",
              line_no: 182,
              run_time_ms: 0.7383040189743042,
              size_bytes: 9633792,
            },
            {
              path: "resnet.py",
              line_no: 183,
              run_time_ms: 0.5430613160133362,
              size_bytes: 52429824,
            },
            {
              path: "resnet.py",
              line_no: 184,
              run_time_ms: 0.25326934456825256,
              size_bytes: 52428800,
            },
            {
              path: "resnet.py",
              line_no: 185,
              run_time_ms: 0.4584106504917145,
              size_bytes: 25690112,
            },
            {
              path: "resnet.py",
              line_no: 187,
              run_time_ms: 8.541183471679688,
              size_bytes: 534001664,
            },
            {
              path: "resnet.py",
              line_no: 85,
              run_time_ms: 4.606293201446533,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 86,
              run_time_ms: 1.3073066473007202,
              size_bytes: 122387456,
            },
            {
              path: "resnet.py",
              line_no: 87,
              run_time_ms: 0.6290773153305054,
              size_bytes: 122355712,
            },
            {
              path: "resnet.py",
              line_no: 89,
              run_time_ms: 8.89958381652832,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 90,
              run_time_ms: 0.9847466945648193,
              size_bytes: 88833024,
            },
            {
              path: "resnet.py",
              line_no: 91,
              run_time_ms: 0.45499733090400696,
              size_bytes: 88866816,
            },
            {
              path: "resnet.py",
              line_no: 93,
              run_time_ms: 4.2308268547058105,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 94,
              run_time_ms: 3.455317258834839,
              size_bytes: 357554176,
            },
            {
              path: "resnet.py",
              line_no: 97,
              run_time_ms: 3.5921919345855713,
              size_bytes: 110262272,
            },
            {
              path: "resnet.py",
              line_no: 99,
              run_time_ms: 1.3127679824829102,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 100,
              run_time_ms: 1.7585493326187134,
              size_bytes: 356384768,
            },
            {
              path: "resnet.py",
              line_no: 188,
              run_time_ms: 8.253098487854004,
              size_bytes: 372535296,
            },
            {
              path: "resnet.py",
              line_no: 189,
              run_time_ms: 9.32863998413086,
              size_bytes: 264454144,
            },
            {
              path: "resnet.py",
              line_no: 190,
              run_time_ms: 5.108736038208008,
              size_bytes: 75653120,
            },
            {
              path: "resnet.py",
              line_no: 192,
              run_time_ms: 0.026282666251063347,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 193,
              run_time_ms: 0.0058026667684316635,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 194,
              run_time_ms: 0.05700266733765602,
              size_bytes: 131072,
            },
          ],
        },
        {
          name: "linear",
          num_children: 0,
          forward_ms: 0.02184533327817917,
          backward_ms: 0.03515733405947685,
          size_bytes: 131072,
          file_refs: [],
        },
        {
          name: "flatten",
          num_children: 0,
          forward_ms: 0.003413333324715495,
          backward_ms: 0.0023893334437161684,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "adaptive_avg_pool2d",
          num_children: 0,
          forward_ms: 0.015360000543296337,
          backward_ms: 0.010922666639089584,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "layer4.0",
          num_children: 11,
          forward_ms: 1.8503680229187012,
          backward_ms: 3.2583680152893066,
          size_bytes: 75653120,
          file_refs: [
            {
              path: "resnet.py",
              line_no: 85,
              run_time_ms: 1.0100053548812866,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 86,
              run_time_ms: 0.1133226677775383,
              size_bytes: 9973760,
            },
            {
              path: "resnet.py",
              line_no: 87,
              run_time_ms: 0.05700266733765602,
              size_bytes: 9961472,
            },
            {
              path: "resnet.py",
              line_no: 89,
              run_time_ms: 1.686527967453003,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 90,
              run_time_ms: 0.08191999793052673,
              size_bytes: 5320704,
            },
            {
              path: "resnet.py",
              line_no: 91,
              run_time_ms: 0.03379200026392937,
              size_bytes: 5373952,
            },
            {
              path: "resnet.py",
              line_no: 93,
              run_time_ms: 0.8311466574668884,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 94,
              run_time_ms: 0.22937600314617157,
              size_bytes: 19316736,
            },
            {
              path: "resnet.py",
              line_no: 97,
              run_time_ms: 0.8942933678627014,
              size_bytes: 6438912,
            },
            {
              path: "resnet.py",
              line_no: 99,
              run_time_ms: 0.077482670545578,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 100,
              run_time_ms: 0.09386666864156723,
              size_bytes: 19267584,
            },
          ],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.03788800165057182,
          backward_ms: 0.05597866699099541,
          size_bytes: 19267584,
          file_refs: [],
        },
        {
          name: "iadd",
          num_children: 0,
          forward_ms: 0.07543466985225677,
          backward_ms: 0.002047999994829297,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "conv2d, add_, batch_norm",
          num_children: 0,
          forward_ms: 0.2839893400669098,
          backward_ms: 0.6103039979934692,
          size_bytes: 6438912,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.11059200018644333,
          backward_ms: 0.11878400295972824,
          size_bytes: 19316736,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.2764799892902374,
          backward_ms: 0.5546666383743286,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.015701333060860634,
          backward_ms: 0.018090667203068733,
          size_bytes: 5373952,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.04642133414745331,
          backward_ms: 0.035498667508363724,
          size_bytes: 5320704,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.5908479690551758,
          backward_ms: 1.0956799983978271,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.02423466555774212,
          backward_ms: 0.03276799991726875,
          size_bytes: 9961472,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.058368001133203506,
          backward_ms: 0.05495466664433479,
          size_bytes: 9973760,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.3304106593132019,
          backward_ms: 0.6795946359634399,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "layer3.0",
          num_children: 11,
          forward_ms: 3.3573546409606934,
          backward_ms: 5.971285343170166,
          size_bytes: 264454144,
          file_refs: [
            {
              path: "resnet.py",
              line_no: 85,
              run_time_ms: 1.815551996231079,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 86,
              run_time_ms: 0.30583465099334717,
              size_bytes: 28913664,
            },
            {
              path: "resnet.py",
              line_no: 87,
              run_time_ms: 0.14267733693122864,
              size_bytes: 28901376,
            },
            {
              path: "resnet.py",
              line_no: 89,
              run_time_ms: 2.986325263977051,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 90,
              run_time_ms: 0.2051413357257843,
              size_bytes: 19279872,
            },
            {
              path: "resnet.py",
              line_no: 91,
              run_time_ms: 0.08806400001049042,
              size_bytes: 19267584,
            },
            {
              path: "resnet.py",
              line_no: 93,
              run_time_ms: 1.6817493438720703,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 94,
              run_time_ms: 0.5908480286598206,
              size_bytes: 78168064,
            },
            {
              path: "resnet.py",
              line_no: 97,
              run_time_ms: 0.8191999793052673,
              size_bytes: 12853248,
            },
            {
              path: "resnet.py",
              line_no: 99,
              run_time_ms: 0.29286399483680725,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 100,
              run_time_ms: 0.40038397908210754,
              size_bytes: 77070336,
            },
          ],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.19967998564243317,
          backward_ms: 0.20070399343967438,
          size_bytes: 77070336,
          file_refs: [],
        },
        {
          name: "iadd",
          num_children: 0,
          forward_ms: 0.2884266674518585,
          backward_ms: 0.0044373334385454655,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "conv2d, add_, batch_norm",
          num_children: 0,
          forward_ms: 0.2638506591320038,
          backward_ms: 0.5553493499755859,
          size_bytes: 12853248,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.25565865635871887,
          backward_ms: 0.3351893424987793,
          size_bytes: 78168064,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.5362346768379211,
          backward_ms: 1.145514726638794,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.031061332672834396,
          backward_ms: 0.05700266733765602,
          size_bytes: 19267584,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.10069333761930466,
          backward_ms: 0.10444799810647964,
          size_bytes: 19279872,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.9376426935195923,
          backward_ms: 2.048682689666748,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.060415998101234436,
          backward_ms: 0.0822613313794136,
          size_bytes: 28901376,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.1372160017490387,
          backward_ms: 0.16861866414546967,
          size_bytes: 28913664,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.5464746952056885,
          backward_ms: 1.2690773010253906,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "layer2.0",
          num_children: 11,
          forward_ms: 3.1767892837524414,
          backward_ms: 5.0763092041015625,
          size_bytes: 372535296,
          file_refs: [
            {
              path: "resnet.py",
              line_no: 85,
              run_time_ms: 1.0803200006484985,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 86,
              run_time_ms: 0.4505600035190582,
              size_bytes: 44961792,
            },
            {
              path: "resnet.py",
              line_no: 87,
              run_time_ms: 0.22493866086006165,
              size_bytes: 44957696,
            },
            {
              path: "resnet.py",
              line_no: 89,
              run_time_ms: 2.2603094577789307,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 90,
              run_time_ms: 0.26077866554260254,
              size_bytes: 25694208,
            },
            {
              path: "resnet.py",
              line_no: 91,
              run_time_ms: 0.12458667159080505,
              size_bytes: 25690112,
            },
            {
              path: "resnet.py",
              line_no: 93,
              run_time_ms: 0.8956586718559265,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 94,
              run_time_ms: 1.0052266120910645,
              size_bytes: 102776832,
            },
            {
              path: "resnet.py",
              line_no: 97,
              run_time_ms: 1.0629119873046875,
              size_bytes: 25694208,
            },
            {
              path: "resnet.py",
              line_no: 99,
              run_time_ms: 0.37614935636520386,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 100,
              run_time_ms: 0.5116586685180664,
              size_bytes: 102760448,
            },
          ],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.25565865635871887,
          backward_ms: 0.25600001215934753,
          size_bytes: 102760448,
          file_refs: [],
        },
        {
          name: "iadd",
          num_children: 0,
          forward_ms: 0.3734186887741089,
          backward_ms: 0.002730666659772396,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "conv2d, add_, batch_norm",
          num_children: 0,
          forward_ms: 0.30822399258613586,
          backward_ms: 0.7546879649162292,
          size_bytes: 25694208,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.3829759955406189,
          backward_ms: 0.6222506761550903,
          size_bytes: 102776832,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.3519146740436554,
          backward_ms: 0.5437439680099487,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.05120000243186951,
          backward_ms: 0.07338666915893555,
          size_bytes: 25690112,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.10990933328866959,
          backward_ms: 0.15086933970451355,
          size_bytes: 25694208,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.7256746888160706,
          backward_ms: 1.5346347093582153,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.10410667210817337,
          backward_ms: 0.12083199620246887,
          size_bytes: 44957696,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.18295466899871826,
          backward_ms: 0.26760533452033997,
          size_bytes: 44961792,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.33075201511383057,
          backward_ms: 0.749567985534668,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "layer1.0",
          num_children: 11,
          forward_ms: 3.3675947189331055,
          backward_ms: 5.17358922958374,
          size_bytes: 534001664,
          file_refs: [
            {
              path: "resnet.py",
              line_no: 85,
              run_time_ms: 0.7004159688949585,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 86,
              run_time_ms: 0.4375893473625183,
              size_bytes: 38538240,
            },
            {
              path: "resnet.py",
              line_no: 87,
              run_time_ms: 0.20445865392684937,
              size_bytes: 38535168,
            },
            {
              path: "resnet.py",
              line_no: 89,
              run_time_ms: 1.9664212465286255,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 90,
              run_time_ms: 0.4369066655635834,
              size_bytes: 38538240,
            },
            {
              path: "resnet.py",
              line_no: 91,
              run_time_ms: 0.20855465531349182,
              size_bytes: 38535168,
            },
            {
              path: "resnet.py",
              line_no: 93,
              run_time_ms: 0.822272002696991,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 94,
              run_time_ms: 1.6298667192459106,
              size_bytes: 157292544,
            },
            {
              path: "resnet.py",
              line_no: 97,
              run_time_ms: 0.8157866597175598,
              size_bytes: 65275904,
            },
            {
              path: "resnet.py",
              line_no: 99,
              run_time_ms: 0.566271960735321,
              size_bytes: 0,
            },
            {
              path: "resnet.py",
              line_no: 100,
              run_time_ms: 0.7526400089263916,
              size_bytes: 157286400,
            },
          ],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.37614932656288147,
          backward_ms: 0.37649065256118774,
          size_bytes: 157286400,
          file_refs: [],
        },
        {
          name: "iadd",
          num_children: 0,
          forward_ms: 0.5638826489448547,
          backward_ms: 0.0023893334437161684,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "conv2d, add_, batch_norm",
          num_children: 0,
          forward_ms: 0.30446934700012207,
          backward_ms: 0.5113173127174377,
          size_bytes: 65275904,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.6062080264091492,
          backward_ms: 1.0236586332321167,
          size_bytes: 157292544,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.3020800054073334,
          backward_ms: 0.52019202709198,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.1013759970664978,
          backward_ms: 0.10717866569757462,
          size_bytes: 38535168,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.1682773381471634,
          backward_ms: 0.2686293423175812,
          size_bytes: 38538240,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.45260798931121826,
          backward_ms: 1.5138132572174072,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.10171733051538467,
          backward_ms: 0.10274133086204529,
          size_bytes: 38535168,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.1693013310432434,
          backward_ms: 0.2682879865169525,
          size_bytes: 38538240,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.22152532637119293,
          backward_ms: 0.47889065742492676,
          size_bytes: 0,
          file_refs: [],
        },
        {
          name: "max_pool2d",
          num_children: 0,
          forward_ms: 0.10922666639089584,
          backward_ms: 0.3491840064525604,
          size_bytes: 25690112,
          file_refs: [],
        },
        {
          name: "relu",
          num_children: 0,
          forward_ms: 0.12697599828243256,
          backward_ms: 0.1262933313846588,
          size_bytes: 52428800,
          file_refs: [],
        },
        {
          name: "add_, batch_norm",
          num_children: 0,
          forward_ms: 0.19865600764751434,
          backward_ms: 0.34440532326698303,
          size_bytes: 52429824,
          file_refs: [],
        },
        {
          name: "conv2d",
          num_children: 0,
          forward_ms: 0.2348373383283615,
          backward_ms: 0.5034666657447815,
          size_bytes: 9633792,
          file_refs: [],
        },
      ],
    },
    habitat: [
      ["source", 22.029312],
      ["P100",14.069682],
      ["P4000", 4.268085], // 27.268085
      ["RTX2070", 16.088268],
      ["RTX2080Ti", 11.826558],
      ["T4", 22.029312],
      ["V100", 10.182922],
      ["A100", 10.068596],
      ["RTX3090", 9.841998],
      ["A40", 11.558072],
      ["A4000", 14.67059],
      ["RTX4000", 20.2342],
    ],
    energy: {
      current: {
        total_consumption: 2.30,
          components: [
            { type: "ENERGY_UNSPECIFIED", consumption: 0 },
            { type: "ENERGY_CPU_DRAM", consumption: 1.15 },
            { type: "ENERGY_GPU", consumption: 1.15 },
          ],
      },
      past_measurements: [
        {
          total_consumption: 8.10,
          components: [
            { type: "ENERGY_UNSPECIFIED", consumption: 0 },
            { type: "ENERGY_CPU_DRAM", consumption: 7.05 },
            { type: "ENERGY_GPU", consumption: 1.05 },
          ],
        },
        {
          total_consumption: 9.30,
          components: [
            { type: "ENERGY_UNSPECIFIED", consumption: 0 },
            { type: "ENERGY_CPU_DRAM", consumption: 1.15 },
            { type: "ENERGY_GPU", consumption: 8.15 },
          ],
        },
      ],
    },
  };
  