#!/usr/bin/env node
const util = require("util");

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
const createEnv = `cp ${repoName}/.env.example ${repoName}/.env`;
const removeDirCommand = `rm ${repoName}/bin/createNodeApi.js && rmdir ${repoName}/bin`;

const runCommands = async () => {
  try {
    console.log(`Cloning node api into ${repoName}`);

    const cloned = await runCommand(cloneCommand);
    if (!cloned) process.exit(-1);

    console.log("Installing packages");
    const installed = await runCommand(installCommand);
    if (!installed) process.exit(-1);

    console.log("Creating .env file");
    const created = await runCommand(createEnv);
    if (!created) process.exit(-1);

    console.log("Cleaning up");
    const cleanedUp = await runCommand(removeDirCommand);
    if (!cleanedUp) process.exit(-1);

    console.log("Node api created.");
  } catch (err) {
    console.error(err);
  }
};

runCommands();
