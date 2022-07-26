#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = command => {
  try {
    execSync(command, { stdio: "inherit" });
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

console.log(`Cloning node api into ${repoName}`);

const cloned = runCommand(cloneCommand);
if (!cloned) process.exit(-1);

console.log("Installing packages");

const installed = runCommand(installCommand);
if (!installed) process.exit(-1);

console.log("Node api created.");
