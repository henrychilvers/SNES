<h1>
  <img src="https://i.redd.it/e05fskad5x321.png" style="border: 1px solid #000; max-width:128px; max-height:64px;" />
  SNES - Simple Node Encryptor/Decrypter of Strings
</h1>
[![GitHub Stars](https://img.shields.io/github/stars/henrychilvers/SNES.svg](https://github.com/henrychilvers/SNES/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/henrychilvers/SNES.svg)](https://github.com/henrychilvers/SNES/issues)
[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/henrychilvers/SNES)

SNES is a bash command line utility for encrypting and decrypting strings for use in your various applications. Allows for specifying multiple applications and multiple environments in order to encourage you to use different passwords/keys/secrets per application per environment.

This was born out of a need to manage encrypted secrets for about a half dozen different applications, each with 4 environments (Dev, QA, Stage, and Prod).

## Requires node.js (v14.x)

https://nodejs.org/en/download/

### Optional (but helpful)
Use a Node Version Manager such as nvm or nodist
```
nvm use v14.17.3
```

### Installation:
```
git clone https://github.com/henrychilvers/SNES.git
npm install
```

Upon first run, the config file (by default 'snes_config.json') where you settings are stored will be empty, so you'll need to run the "add" command to create your first application/environment setting.

NOTE: Your config values will be stored in plain text, so it is recommended that you do not commit this file to any non-private code repository! Hence the reason that the "snes_config.json" file is listed in the .gitignore file.

### Usage :
```
snes.js [options] [command]

Options:
  -V, --version                                 output the version number
  -h, --help                                    display help for command

Commands:
  encrypt <app-name> <env> <string-to-encrypt>  Encrypt a value for the given application + environment
  decrypt <app-name> <env> <string-to-decrypt>  Decrypt a value for the given application + environment

  list [app-name] [env]                         List settings for all apps/environments, a specific app/environment, or all for a give app
  add [options] <app-name> <env> <key> <iv>     Add a setting for the given application + environment
  update <app-name> <env> <key> <iv>            Update a setting for the given application + environment
  delete <app-name> <env>                       Delete a setting for the given application + environment
  help [command]                                display help for command
```

### Running unit tests...
```
npm run test
```

### TODO
1. Support specifying config file with '-c' option.
2. Unit testing with BATS? (https://github.com/bats-core/bats-core)
    1. Add when no config file
    2. Add when config file
    3. Add when app/env already exists and no override
    4. Add when app/env already exists and override
    5. Update when app/env exists
    6. Update when app/env does not exist
    7. Delete when app/env exists
    8. Delete when app/env does not exist
    9. List all for app
    10. List for single app/env
    11. List for single app/env does not exist
    12. Encrypt when app/env exists
    13. Encrypt when app/env does not exist
    14. Decrypt when app/env exists
    15. Decrypt when app/env does not exist
3. Interactive inital setup.
4. Better logo?
5. Add emojis to output results?

## License
Usage is provided under the [BSD 3 Claus License](https://opensource.org/licenses/BSD-3-Clause). See LICENSE for the full details.
