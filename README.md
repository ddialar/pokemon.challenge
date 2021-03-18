![Header banner](https://github.com/ddialar/pokemon.challenge/blob/master/docs/img/headerBanner.png)

# Pokemon Challenge

<img src="https://img.shields.io/badge/Version-1.0.0-yellow" /> <img src="https://img.shields.io/badge/Loopback-4-blue" /> <img src="https://img.shields.io/badge/TypeScript-4.1.3-blue" /> <img src="https://img.shields.io/badge/openApi-4.1.5-green" /> <img src="https://img.shields.io/badge/Docker-20.10.2-blue" />

[🇪🇸 Version](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md)

## 📖 Index

- [Description](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#description)
- [System requirements](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#requirements)
- [Repository overview](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview)
  - [Environment variables](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-environment-variables)
  - [Architecture](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture)
    - [controllers](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-controllers)
    - [datasources](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-datasources)
    - [middlewares](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-middlewares)
    - [models](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-models)
    - [repositories](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-repositories)
    - [services](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-services)
    - [validators](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-validators)
    - [types](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-types)
    - [tests](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-architecture-tests)
  - [Execution environments](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-environments)
- [Commands guide](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands)
  - [Switch Node version](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands-switch-node)
  - [Modules installation process](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands-installation)
  - [Run tests](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands-tests)
  - [Run application in development mode](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands-dev-mode)
  - [Build application](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands-pro-mode)
  - [Fix code style and formatting issues](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands-lint)
  - [Other useful commands](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#commands-other)
- [API REST documentation](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#apidoc)
- [Final notes](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#final-notes)

## <a id="description"></a>🔍 Description

This repository is aimed to accomplish a code challenge using [LoopBack 4](https://loopback.io/doc/en/lb4/).

In this case, I am implementing a backend REST CRUD type application which, based on a bunch of pokemons data, must provide the next features:

- ✅ Query pokemons with the options:
  - ⚡️ Pagination.
  - ⚡️ Search by name.
  - ⚡️ Filter by pokemon type.
  - ⚡️ Filter by favorite.
- ✅ Query a pokemon by id.
- ✅ Query a pokemon by name.
- ✅ Query list of pokemon types.
- ✅ Mutation to mark/unmark pokemon as favorite.

Some tools used on this repository are next:

- ⚙️ `dotenv` for environment variables.
- 📝 `OpenAPI` for API REST documentation.
- ✅ `Joi` for validating input data.
- 🧪 `Mocha` and `Postman` for testing.
- 🔍 `ESLint` for code linting and formating.
- 🐶 `Husky` for managing the Git Hooks.
- 🐳 `Docker` for container image management.
- 🌱 `MongoDB` as database engine.

Therefore this repository is defined to work with `NodeJS 14.15.0 LTS`.

If you are running differente versions of NodeJS in your system, just run `nvm use` and it will be switched to the version defined in the `.nvmrc` file.

## <a id="requirements"></a>💻 System requirements

To run this code in your system, it must satisfy the next minimum requirements:

- NodeJS 14.15.0
- npm 6.14.11
- npx 6.14.11
- Docker 20.10.2
- docker-compose 1.27.4

In addition, it's advisable to have next:

- nvm 0.33.0
- Web browser (recomended Google Chrome 88.0)
- Database UI tool (recomended Robo 3T 1.4.1)
- Postman 8.0.7

## <a id="repository-overview"></a>👀 Repository overview

### <a id="repository-overview-environment-variables"></a>⚙️ Environment variables

Due to I have selected `dotenv` as environmet variables handler, in the root of the project will be a folder named [`env`](https://github.com/ddialar/pokemon.challenge/blob/master/env).

In this folder I have defined three differente environment files:

- `.env.development` for development.
- `.env.test` for testing.
- `.postman.env` for testing run with Postman.

The different scripts created for running the application in every environment are prepared to load the configuration and applying it to the code.

The most basic fields we must include on these files are next:

```sh
NODE_ENV="development" | "test" | "postman"

# Set the port number and howt that best matches for every environment.
PORT=3003
HOST='localhost'

# Set the database configuration that best matches for your environment.
MONGO_USER='username'
MONGO_PASS='*********'
MONGO_HOST='localhost'
MONGO_PORT='31013'
MONGO_DB='db-name'

# Set the differente configurations that will be handled in the code.
POKEMON_ID_PATTERN='^[0-9]{3}$'
POKEMON_NAME_PATTERN='^[a-zA-Z]+$'
POKEMON_TYPE_PATTERN='^[a-zA-Z]+$'
POKEMON_FILTER_DEFAULT_PAGE=1
POKEMON_FILTER_DEFAULT_LIMIT=100
```

### <a id="repository-overview-architecture"></a>🏗 Architecture

This repository is implemented following the most basic Layered Architecture, it means, **domain** and **infrastructure**. However, in order to keep using the CLI provided by Loopback, the folders structure is next:

```
📂 src/
 +- 📂 controllers (infrastructure)
 +- 📂 datasources (infrastructure)
 +- 📂 middlewares (infrastructure)
 +- 📂 models (domain)
 +- 📂 repositories (infrastructure)
 +- 📂 services (domain)
 +- 📂 validators (intrastructure)
 +- 📂 types
 +- 📂 __tests__
     +- 📂 acceptance
     +- 📂 fixtures
     +- 📂 postman
```

#### <a id="repository-overview-architecture-controllers"></a>🧩 controllers

In this folder I implement the different endpoint that the application has exposed.

#### <a id="repository-overview-architecture-datasources"></a>📖 datasources

Here I have configured the connection to the MongoDB database.

#### <a id="repository-overview-architecture-middlewares"></a>🔄 middlewares

At this point there is implemented only a logger which will show information about requests sent to the backend.

#### <a id="repository-overview-architecture-models"></a>🪢 models

Here I have defined the data structure for the pokemons that will be used in the application.

#### <a id="repository-overview-architecture-repositories"></a>💾 repositories

At this folder I are using the most basic access to the database as well as custom methods specially defined in order to provide the needed results.

#### <a id="repository-overview-architecture-services"></a>🎯 services

This folder directly belongs to the `domain` layer and based on that, here we have implemented the application business logic.

Once said that, the methods defined here are invoked from the `controllers` layer and furthemore, they will use other services and will call other `repository` layer methods.

#### <a id="repository-overview-architecture-validators"></a>✅ validators

I have defined in this folder the needed rules and validators in order to check and validate the data that income the application.

These validators are used in the `services` layer despite of the are defined in the `infrastructure` level. I took this decision based on the tool used to implement the validators can be changed in the future development of the application and this situation can not affect the application business logic, reaching a good decoupling level.

#### <a id="repository-overview-architecture-types"></a>📝 types

The content included in this folder belongs to TypeScript exclusivelly.

Despite of the application is really easy, there are some custom types and/or interfaces which are used in several levels, so I have generalized them to a common types folder.

#### <a id="repository-overview-architecture-tests"></a>🧪 tests

This folder contains what it is. Nevertheless, there are three folder with different functionalities:

- 📂 acceptance

  Here there are defined the testing cases in order to verify the expected application behavior.

- 📂 fixtures

  Here I have defined several resources used in the testing cases.

- 📂 postman

  At this folder I have included a set of files that belong to the testing suite implemented for Postman.

### <a id="repository-overview-environments"></a>🛠 Execution environments

I have defined three different environments: `development`, `test`, and `postman`.

The two first environments are widely known but I have created the third one in order to run the Postman based on testing suite independently from the rest of the development.

All environments require specific configurations as well as database presets.

The first requirement is covered by the specific `.env` files that we configure for every case.

The second one is satisfied in this case by the configuration of different Docker containers that are executed in parallel with the code. It means that the system scrips (defined into the `package.json` file), are created in order to execute the `development`, `test` and `postman` database containers, depending on the environment we are running.

The whole environments are configured in order to be run independently so we can have both up at the same time.

Finally, the whole application is implemented in the way any configurable property is defined through environment variables. This way, in order to change its most basic behaviors such as the database location or the starting-up URL, it's only needed to update the specific envitonment variables file and restart the application.

## <a id="commands"></a>🔥 Commands guide

### <a id="commands-switch-node"></a>✅ Switch Node version

```sh
nvm use
```

### <a id="commands-installation"></a>⬇️ Modules installation process

```sh
npm i
```

### <a id="commands-tests"></a>🧪 Run tests

**Required files:**

- `env/.env.test`

```sh
# Unit and integration tests.
npm test
# Coverage.
npm run test:ci
```

**For testing with Postman**

- `env/.postman.env`
- Files at `test/postman` folder loaded in Postman.

```sh
# Run the specific environment for Postman.
npm run start:postman
```

The workspace configuration for Postman is also published at this [link](https://www.postman.com/ddialar/workspace/ddialar-pokemon-challenge/request/999892-eea02d9a-3eb5-4a78-9b85-6ec4e4fa20f3).

### <a id="commands-dev-mode"></a>🏭 Run application in development mode

**Required files:**

- `env/.env.development`

```sh
npm start
```

Open `http://127.0.0.1:3000` in your browser.

### <a id="commands-pro-mode"></a>🚀 Build application

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

In this case won't be needed to have any environment file before building the application. Nevertheless, this file will be needed to provide it in the application execution process.

### <a id="commands-lint"></a>🩹 Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

### <a id="commands-other"></a>🧰 Other useful commands

Due to stoping the application from `development` or `postman` modes doesn't stop the specific containers created ad-hoc, it's needed to stop them manually. The same happens when the testing suite breaks down.

At these cases, in order to stop every specific environment container, these commands must be run:

```sh
npm run dev_infra:down
npm run test_infra:down
npm run postman_infra:down
```

All of them stop the container, deletes it and deletes the bound Docker volume.

Generate OpenAPI spec into a file.

```sh
npm run openapi-spec
```

## <a id="apidoc"></a>📗 API REST documentation

`http://127.0.0.1:3000/explorer/`

The access port must be defined in the environment variables. Take a look to the [**environment variables**](https://github.com/ddialar/pokemon.challenge/blob/master/README.md#repository-overview-environment-variables) section.

## <a id="final-notes"></a>🔍 Final notes

Meanwhile the applciation is running, in the console appear several log messages that don't belong to the base code. These messages are like those:

```
Top-level use of w, wtimeout, j, and fsync is deprecated. Use writeConcern instead.
```

```
(node:1800) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
```

Both of them are generated by unfixed issues bound with the native MongoDB driver. These isses will be fixed in future releases.

Further information:

- [Official MongoDB forum](https://developer.mongodb.com/community/forums/t/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-circular-dependency/15411/6)
- [StackOverflow discussion](https://stackoverflow.com/a/66376829)
