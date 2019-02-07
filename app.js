const readline = require("readline");
const cli = require("./cli_module");

// Initialize CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "#> "
});

// Exit function.
const exit = () => {
  console.log("Good bye!");
  process.exit(0);
}

// Define root directory for the tiny CLI
const root = `${process.cwd()}/tmp`

// Create a sandbox directory to navigate in.
cli.mkdir('tmp', () => {
  process.chdir('tmp');
  rl.prompt();
});
console.log(`Your current working directory is: \n${process.cwd()}`);


// start CLI listener
rl.on("line", line => {
  _line = line ? line.trim().split(" ") : "";
  let cmd = _line[0];
  let args = _line.slice(1);

  switch (cmd) {
    case "cd":
      cli.cd(args[0], root, () => rl.prompt());
      break;
    case "ls":
      cli.ls(() => rl.prompt());
      break;
    case "touch":
      cli.touch(args[0], () => rl.prompt());
      break;
    case "mkdir":
      cli.mkdir(args[0], () => rl.prompt());
      break;
    case undefined:
      rl.prompt();
      break;
    case "exit":
      exit();
    default:
      console.log(`Unknown command: '${cmd}'`);
      rl.prompt();
      break;
  }
}).on("close", () => {
  exit();
});
