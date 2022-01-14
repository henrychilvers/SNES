#!/usr/bin/env node

// Copyright (c) 2021, Henry Chilvers
// All rights reserved.

// This source code is licensed under the BSD-style license found in the
// LICENSE file in the root directory of this source tree. 

import { Command } from "commander";
import crypter from "./crypter.js";
import config from "./config.js";
import utils from "./utils.js";
// import setup from "./setup.js";

const program = new Command();

program
  .version("2.0.0.0")
  // .option("-c, --config <path>", "set config path", "config/snes_config.json")
  .showHelpAfterError();

program
  .command("encrypt")
  .description("Encrypt a value for the given application + envrionment")
  .argument("<app-name>", "Application name")
  .argument("<env>", "Environment")
  .argument("<string-to-encrypt>", "Sensative string (password, token, key, etc.) to encrypt.")
  .action((appName, env, stringToEncrypt) => {
    console.log(
      "Encrypting %s for Application %s in Environment %s...\n",
      stringToEncrypt,
      appName,
      env
    );

    const envSetting = config.getSettings(appName, env);

    if (envSetting === undefined || utils.isEmptyJson(envSetting)) {
      console.error("\n" + appName + "/" + env + " config not found! Please use 'snes.js add " + appName + " " + env + " <key> <iv>'");
    } else {
      console.log(
        "Encrypted => " + crypter.encrypt(stringToEncrypt, envSetting)
      );
    }
  });

program
  .command("decrypt")
  .description("Decrypt a value for the given application + envrionment")
  .argument("<app-name>", "Application name")
  .argument("<env>", "Environment")
  .argument("<string-to-decrypt>", "Encrypted string to decrypt")
  .action((appName, env, stringToDecrypt) => {
    console.log(
      "Decrypting %s for Application %s in Environment %s...\n",
      stringToDecrypt,
      appName,
      env
    );

    const envSetting = config.getSettings(appName, env);

    if (envSetting === undefined) {
      console.error("\n" + appName + "/" + env + " config not found! Please use 'snes.js add " + appName + " " + env + " <key> <iv>'");
    } else {
      // console.log(envSetting);
      console.log(
        "Decrypted => " + crypter.decrypt(stringToDecrypt, envSetting)
      );
    }
  });

program
  .command("list")
  .description("List all settings")
  .argument("[app-name]", "Application name")
  .argument("[env]", "Environment")
  .action((appName, env) => {
    config.listSettings(appName, env)
  });

program
  .command("add")
  .description("Add a setting for the given application + envrionment")
  .argument("<app-name>", "Application name")
  .argument("<env>", "Environment")
  .argument("<key>", "Encryption key to add to the config.")
  .argument("<iv>", "Initialization vector to add to the config.")
  .option(
    "-o, --overwrite",
    "Overwite if the entry already exists in the config file.",
    false
  )
  .action((appName, env, key, iv, options) => {
    config.addSetting(appName, env, key, iv, options.overwrite);
  });

program
  .command("update")
  .description("Update a setting for the given application + envrionment")
  .argument("<app-name>", "Application name")
  .argument("<env>", "Environment")
  .argument("<key>", "Encryption key to add to the config.")
  .argument("<iv>", "Initialization vector to add to the config.")
  .action((appName, env, key, iv, options) => {
    config.updateSetting(appName, env, key, iv);
  });

program
  .command("delete")
  .description("Delete a setting for the given application + envrionment")
  .argument("<app-name>", "Application name")
  .argument("<env>", "Environment")
  .action((appName, env) => {
    config.deleteSetting(appName, env);
  });

await program.parseAsync(process.argv);
