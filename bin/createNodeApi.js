#!/usr/bin/env node
const util = require("util");
fs = require("fs");

const exec = util.promisify(require("child_process").exec);

const runCommand = async command => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const repoName = process.argv[2];
const repo = "https://github.com/tgolding55/create-node-api.git";
const cloneCommand = `git clone ${repo} ${repoName}`;
const installCommand = `cd ${repoName} && npm install`;
const removeDirCommand = `rm ${repoName}/bin/createNodeApi.js && rmdir ${repoName}/bin`;

const runCommands = async () => {
  console.log(`Cloning node api into ${repoName}`);

  const cloned = await runCommand(cloneCommand);
  if (!cloned) process.exit(-1);

  const fileName = "package.json";
  const file = JSON.parse(fs.readFileSync(fileName).toString());

  file.name = repoName;
  file.repository = "";
  file.version = "1.0.0";
  file.description = "";

  fs.writeFileSync(fileName, JSON.stringify(file));

  console.log("Installing packages");

  const installed = await runCommand(installCommand);
  if (!installed) process.exit(-1);

  console.log("Cleaning up");
  const cleanedUp = await runCommand(removeDirCommand);
  if (!cleanedUp) process.exit(-1);

  console.log("Node api created.");
};

runCommands();
