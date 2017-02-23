import yargs from "yargs";
import generate, {sourceTypes} from "./generate";
import {outputDir} from "./init";

yargs
  .usage()
  .help()
  .alias("h", "help")
  .wrap(Math.min(yargs.terminalWidth() - 1, 120))
  .command({
    command: "gen",
    desc: "generate a random WebAssembly test file",
    builder: (yargs) => yargs
      .options({
        attempts: {
          alias: "a",
          number: true,
          describe: "Number of attempts to generate a file, 0 for infinite",
          default: 1,
        },
        outdir: {
          alias: "o",
          describe: "Output directory for the generated files",
          default: outputDir
        },
        type: {
          alias: "t",
          string: true,
          describe: "Type of source file generated",
          choices: ["c", "cpp", "cpp11"],
          default: "c"
        },
        validate: {
          boolean: true,
          describe: "Run wasm-spec interpreter to validate generated file",
          default: true
        },
        interpreted: {
          boolean: true,
          describe: "Generate interpreted version for comparison purposes",
          default: true
        },
        fileName: {
          string: true,
          describe: "Name of the generated files (without extension)",
          default: "test"
        },
        inline: {
          boolean: true,
          describe: "Inline the WebAssembly module in the javascript file"
        },
        silent: {
          alias: "s",
          boolean: true,
          describe: "Silently run generating tools"
        },
        wasmVersion: {
          number: true,
          describe: "The version of wasm binary to use (currently only changes the number in the resulting binary)"
        }
      }),
    handler: (argv) => {
      const args = {
        sourceType: sourceTypes[argv.type],
        validate: argv.validate,
        fileName: argv.fileName,
        outdir: argv.outdir,
        inlineWasm: argv.inline,
        execOptions: {},
        forceBinaryVersion: argv.wasmVersion,
      };
      if (argv.silent) {
        args.execOptions.stdio = "ignore";
      }
      doGenerate(argv.attempts, args);
    }
  })
  .demand(1)
  .argv;

async function doGenerate(maxAttempts, args) {
  let nAttempts = 0;
  while (maxAttempts === 0 || nAttempts < maxAttempts) {
    nAttempts++;
    try {
      const {wasm, src, js, valid} = await generate(args);
      console.log(`Source file: ${src}`);
      console.log(`Javascript file: ${js}`);
      console.log(`WebAssembly file: ${wasm}${args.validate ? ` is ${valid ? "" : "not "}valid`: ""}`);
      return;
    } catch (e) {
      console.log("Failed to generate test");
      console.error(e);
    }
  }
}
