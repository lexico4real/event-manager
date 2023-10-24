# `Event Manager`

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Badge](#badge)
- [Contributing](#contributing)
- [License](#license)

## Description

`Event Manager` A fictional event management application organizes events in categories. The categories are organized as a tree with infinite depth, that can be manipulated by the application administrators. Each tree node, a category, contains a unique numeric identifier (id), as well as a string label (the category name). Each tree node may contain 0 or N descending nodes.


## Installation

Before installing the project, ensure that you have the following prerequisites:

- Node.js version 12.0 or higher
- npm package manager
- Nest.js version 9.1.5

To install the project, follow these steps:

- Clone the repository using git clone `https://github.com/your-mtn-username/event-manager.git`
- Navigate to the project directory using cd event-manager
- Install dependencies using:

```bash
$ npm install
```

## Running the app

To run the application, use the following command:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

These will start the server and run the application with the ts-node-dev package, which automatically restarts the server when a file changes.

```bash
# production mode
$ npm run start:prod
```

This command will build the application and generate a dist directory with the compiled files.

The application entry point is the `main.ts` file, which initializes the Nest.js application instance and sets up the various modules, controllers, and providers.

## Test

The project includes unit tests and integration tests for various components, such as controllers, services, and repositories. The test files are located in the `test` folder and use the Jest testing framework, a popular and powerful testing tool for Node.js.

You can test this using using [postman] (https://www.postman.com)

To run the unit tests, use the following command:

```
$ npm run test
```

This will execute the tests and generate a report with the results. The `jest.config.js` file defines the Jest configuration and options, such as test environment, coverage, and watch mode.

## Building the Application

To build the application, use the following command:

```
$ npm run build
```

This will compile the TypeScript code into JavaScript and generate a `dist` folder with the compiled files. The `tsconfig.json` file defines the TypeScript configuration and options.

## Badge

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Contributing

Contributions to the project are welcome and appreciated. To contribute, follow these guidelines:

- Fork the repository on GitHub and create a new branch from the `develop` branch.

- Make your changes and commit them with a descriptive message that follows the Conventional Commits specification.

- Push your changes to your fork and create a pull request to the `develop` branch of the original repository.

- Use a linter such as ESLint and a formatter such as Prettier to maintain code quality and consistency.

- Follow the code style guidelines defined in the `.editorconfig` and .`prettierrc` files.

## License

This project is licensed under the MIT License, a permissive and widely-used open-source license that allows anyone to use, modify, and distribute the software without restrictions. See the LICENSE file for more information.

## Encryption method using AES512

```
function encryptData(data) {
  const cipher = crypto.createCipheriv(process.env.ECNRYPTION_METHOD, key, encryptionIV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64') // Encrypts data and converts to hex and base64
}
```
