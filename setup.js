import { existsSync, readFileSync, writeFileSync } from "fs";
import prompt from "prompt";
import utils from "./utils.js";
import config from "./config.js";

const { start, get } = prompt;
//import { start, get } from "prompt";
// var prompt = require('prompt');
// var prompt = require('../lib/prompt');

async function initialSetup() {
  var conf = config.readConfig();

  if (!utils.isEmptyJson(conf)) {
    // console.log("Config file exists, no need to do initial setup.")
    return;
  }

  //console.log("initialSetup " + JSON.stringify(config, null, 2));
  prompt.start();

  //Get app name...
  //Get app environemnts...
  //For each environment, get the key and iv...
  prompt.get(["appName", "env", "key", "iv"], function (err, result) {
    if (err) {
      return onErr(err);
    }

    console.log("Command-line input received:");
    console.log("  appName: " + result.appName);
    console.log("  env: " + result.env);
    console.log("  key: " + result.key);
    console.log("  iv: " + result.iv);
  });

  //Save to config...
  // let data = JSON.stringify(envSettings, null, 2);
  // writeFileSync(configFileName, data);
};

export {
  initialSetup,
};

//private functions here...
