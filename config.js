import { existsSync, readFileSync, writeFileSync } from "fs";
import utils from "./utils.js";
import snesConfig from "config";

const configFileName = snesConfig.get('configfile');

const EnvSetting = class {
  constructor(application, environment, key, iv) {
    this.application = application;
    this.environment = environment;
    this.key = key;
    this.iv = iv;
  }
}

const configExists = function () {
  // console.log("configFileName = " + configFileName);
  return existsSync(configFileName);
};

const readConfig = function () {
  if (configExists()) {
    // console.log("config file exists");
    // const ff = readFileSync(configFileName);
    // console.log("ff => " + ff);
    return JSON.parse(readFileSync(configFileName));
  }

  // console.warn("Config file %s does not exist or is empty!", configFileName);
  return JSON.parse("[]");
};

const getSettings = function (appName, env = "") {
  let config = readConfig();
// console.log("config => " + JSON.stringify(config));
  //If we don't have any config, we won't be able to "find" the app/env value.
  if (utils.isEmptyJson(config)) {
    return config;
  }

  const envSetting = config.find(
    (elem) => elem.application == appName && (env === "" || elem.environment == env)
  );

  return envSetting;
};

async function listSettings(appName = "", env = "") {
  if (appName === "") {
    let config = readConfig();

    if (!utils.isEmptyJson(config)) {
      console.log("All settings:\n");
      console.log(config);
    }
  } else {
    let config = getSettings(appName, env);

    if (config === undefined || utils.isEmptyJson(config)) {
      console.error("Settings for %s / %s does not exist. Use the 'add' command to create the value.\n",
      appName, env);
    } else {
      console.log(
        "Settings for Application %s in Environment %s\n",
        appName,
        env
      );
      console.log(config);
    }
  }
}

async function addSetting(appName, env, key, iv, overwrite) {
  let existingSetting = getSettings(appName, env);
  // console.log("existingSetting => " + JSON.stringify(existingSetting));

  //If appName/env doesn't exist, then add it...
  if (existingSetting === undefined || utils.isEmptyJson(existingSetting)) {
    console.log(
      "Adding %s / %s for Application %s in Environment %s (Overwrite = %s)...\n",
      key,
      iv,
      appName,
      env,
      overwrite
    );

    let envSetting = new EnvSetting(appName, env, key, iv);
    let currentConfig = readConfig();

    currentConfig.push(envSetting);
    let updatedConfig = JSON.stringify(currentConfig, null, 2);

    writeFileSync(configFileName, updatedConfig);
  } else {
    //if app/env exists and ovverwrite == true, then update...
    if (overwrite) {
      updateSetting(appName, env, key, iv);
    } else {
      // if overwrite == false, then error...
      console.error("Settings for %s / %s already exist. Specify '-o' to overwrite the existing value.\n",
      appName, env);
    }
  }
}

async function updateSetting(appName, env, key, iv) {
  let existingSetting = getSettings(appName, env);
// console.log("existingSetting => " + JSON.stringify(existingSetting));

  //if app/env doesn't exist, then error
  if (existingSetting === undefined || utils.isEmptyJson(existingSetting)) {
    console.error("Settings for %s / %s does not exist. Use the 'add' command to create the value.\n",
      appName, env);
  } else {
    console.log(
      "Updating setting for Application %s in Environment %s to  %s / %s ...\n",
      appName,
      env,
      key,
      iv
    );
    
    // else update...
    let currentConfig = readConfig();
    let envSetting = currentConfig.find(
      (elem) => elem.application == appName && elem.environment == env
    );

    envSetting.key = key;
    envSetting.iv = iv;

    let updatedConfig = JSON.stringify(currentConfig, null, 2);
    // console.log(updatedConfig);
    writeFileSync(configFileName, updatedConfig);
  }
}

async function deleteSetting(appName, env) {
  let existingSetting = getSettings(appName, env);

  //if app/env doesn't exist, then error
  if (existingSetting === undefined || utils.isEmptyJson(existingSetting)) {
    console.error("Settings for %s / %s does not exist. Nothing to delete.\n",
    appName, env);
  } else {
    console.log(
      "Deleting setting for Application %s in Environment %s...\n",
      appName,
      env
    );
    // else delete...
    let currentConfig = readConfig();

    for (let [i, config] of currentConfig.entries()) {
      if (config.application == appName && config.environment == env) {
        currentConfig.splice(i, 1);
      }
   }

   let updatedConfig = JSON.stringify(currentConfig, null, 2);
    // console.log(updatedConfig);
    writeFileSync(configFileName, updatedConfig);
  }
}

export default {
  readConfig,
  getSettings,
  listSettings,
  addSetting,
  updateSetting,
  deleteSetting,
};
