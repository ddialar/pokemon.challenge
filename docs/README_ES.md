![Header banner](https://github.com/ddialar/pokemon.challenge/blob/master/docs/img/headerBanner.png)

# Pokemon Challenge

<img src="https://img.shields.io/badge/Version-1.0.0-yellow" /> <img src="https://img.shields.io/badge/Loopback-4-blue" /> <img src="https://img.shields.io/badge/TypeScript-4.1.3-blue" /> <img src="https://img.shields.io/badge/openApi-4.1.5-green" /> <img src="https://img.shields.io/badge/Docker-20.10.2-blue" />

[🇬🇧 Version](https://github.com/ddialar/pokemon.challenge/blob/master/README.md)

## 📖 Índice

- [Descripción](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#description)
- [Requisitos del sistema](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#requirements)
- [Visión general del repositorio](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview)
  - [Variables de entorno](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-environment-variables)
  - [Arquitectura](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture)
    - [controllers](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-controllers)
    - [datasources](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-datasources)
    - [middlewares](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-middlewares)
    - [models](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-models)
    - [repositories](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-repositories)
    - [services](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-services)
    - [validators](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-validators)
    - [types](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-types)
    - [tests](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-architecture-tests)
  - [Entornos de ejecución](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-environments)
- [Listado de comandos](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands)
  - [Cambiando la versión de NodeJS](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands-switch-node)
  - [Proceso de instalación de módulos](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands-installation)
  - [Ejecución de los tests](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands-tests)
  - [Ejecución de la aplicación en modo de desarrollo](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands-dev-mode)
  - [Compilación de la aplicación](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands-pro-mode)
  - [Arreglar y aplicar estilos al código](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands-lint)
  - [Otros comandos útiles](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#commands-other)
- [Documentación de la API REST](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#apidoc)
- [Notas finales](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#final-notes)

## <a id="description"></a>🔍 Descripción

Este repositorio está orientado a completar una prueba de códigio usando [LoopBack 4](https://loopback.io/doc/en/lb4/).

En este caso, estoy implementando una aplicación de tipo backend REST CRUD la cual, en base a un conjunto de datos de pokemons, deberá proporcionar las siguientes funciones:

- ✅ Consultas de pokemons con las siguientes opciones:
  - ⚡️ Paginación.
  - ⚡️ Búsqueda por nombre.
  - ⚡️ Filtrado por tipo de pokemon.
  - ⚡️ Filtrado por favorito.
- ✅ Consulta de pokemon por id.
- ✅ Consulta de pokemon por nombre.
- ✅ Consultar un listado de tipos de pokemons.
- ✅ Modificar datos para marcar o desmarcar un pokemon como favorito.

Algunas de las herramientas usadas en este repositorio son las siguientes:

- ⚙️ `dotenv` para variables de entorno.
- 📝 `OpenAPI` para la documentación de la API REST.
- ✅ `Joi` para la validación de datos de entrada.
- 🧪 `Mocha` y `Postman` para testing.
- 🔍 `ESLint` para la revisión y formateado del código.
- 🐶 `Husky` para la gestión de los Git Hooks.
- 🐳 `Docker` para la gestión de imágenes de contenedores.
- 🌱 `MongoDB` como motor de base de datos.

Además este repositorio está diseñado para trabajar con `NodeJS 14.15.0 LTS`.

Si estás ejecutando versiones diferentes de NodeJS en tu sistema, simplemente ejecuta `nvm use` y éste se cambiará a la versión indicada en el archivo `.nvmrc`.

## <a id="requirements"></a>💻 Requisitos del sistema

Para ejecutar el código en su sistema, necesitas tener cubiertos los siguientes requisitos mínimos:

- NodeJS 14.15.0
- npm 6.14.11
- npx 6.14.11
- Docker 20.10.2
- docker-compose 1.27.4

Además de esto, es recomendable que cuentes con lo siguiente:

- nvm 0.33.0
- Navegador web (recomendado Google Chrome 88.0)
- Herramienta de gestión de bases de datos por entorno gráfico (recomendado Robo 3T 1.4.1)
- Postman 8.0.7

## <a id="repository-overview"></a>👀 Visión general del repositorio

### <a id="repository-overview-environment-variables"></a>⚙️ Variables de entorno

Debido a que he seleccionado `dotenv` como gestor de variables de entorno, en la raíz del proyecto habrá un direcotrio llamado [`env`](https://github.com/ddialar/pokemon.challenge/blob/master/env).

En este directorio he definido tres archivos de entorno:

- `.env.development` para desarrollo.
- `.env.test` para testing.
- `.postman.env` para la ejecución de los tests con Postman.

Los diferentes scripts creados para ejecutar la aplicación en cada entorno están preparados para cargar la configuración y aplicarla al código.

Los principales campos que deben estar incluidos en estos archivos son los siguientes:

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

### <a id="repository-overview-architecture"></a>🏗 Arquitectura

Este repositorio está implementado siguiente la Arquitectura por Capas más sencilla, es decir, **dominio** e **infraestructure**. No bstante, para mantener los beneficios del uso de la herramienta CLI proporcionada por Loopback, la estructura de directorios es la siguiente:

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

En este directorio he implementado los diferentes endpoints que la aplicación expone.

#### <a id="repository-overview-architecture-datasources"></a>📖 datasources

Aquí he configurado la conexión con la base de datos MongoDB.

#### <a id="repository-overview-architecture-middlewares"></a>🔄 middlewares

Ahora mismo sólo está implementado un logger para mostrar información acerca de las peticiones enviadas al backend.

#### <a id="repository-overview-architecture-models"></a>🪢 models

Aquí he definido la estructura de datos para los pokemons, que será usada en la aplicación.

#### <a id="repository-overview-architecture-repositories"></a>💾 repositories

En este directorio estoy usando las herramientas más básicas para el acceso a la base de datos así como algunos métodos personalizados, especialmente definidos para proporcionar los resultados necesarios.

#### <a id="repository-overview-architecture-services"></a>🎯 services

Este directorion pertenece directamente al a capa `domain` y en base a esto, aquí es donde he implementado la lógica de negocio de la aplicación.

Una vez dicho esto, los metodos definidos aquí son invocados por la capa `controllers` y además, serán usados por otros servicios y para llamar a la métodos de la capa `repository`.

#### <a id="repository-overview-architecture-validators"></a>✅ validators

He definido en este directorio, las reglas y validaciones necesarias para verificar y validar los datos que llegan a la aplicación.

Estos validatores son usados en la capa `services` a persar de que están definidos en el nivel de `infrastructure` level. He tomado esta decisión basándome en que la herramienta empleada para las validaciones puede cambiarse en futuros desarrollos de la aplicación y esta situación, no puede afectar a la lógica de negocio de la aplicación, alcanzando así un buen nivel de desacoplamiento.

#### <a id="repository-overview-architecture-types"></a>📝 types

El contenido incluido en este directorio pertenece exclusivamente a TypeScript.

Apesar de que la apliación es realmente sencilla, hay algunos tipos personalizados y/o interfaces que son usadas en diversos niveles, por lo tanto las he generalizado a un directorio de componentes comunes.

#### <a id="repository-overview-architecture-tests"></a>🧪 tests

Este directorio contiene lo que se espera. Sin embargo, hay tres directorios con diferentes funcionalidades:

- 📂 acceptance

  Aquí están definidos los casos de tests para verificar el comportamiento esperado de la aplicación.

- 📂 fixtures

  Aquí he definido algunos recusos usados en los casos de uso.

- 📂 postman

  En este directorio he incluido un conjunto de archivo que pertenecen a la suite de tests implementada para Postman.

### <a id="repository-overview-environments"></a>🛠 Entornos de ejecución

He definido tres entornos diferentes: `development`, `test`, y `postman`.

Los dos primeros entornos son ampliamente conocidos pero he creado el tercero para ejecutar la suite de tests basada en Postman, de manera independiente al resto del desarrollo.

Todos los entornos requieren de configuraciones específicas así como definiciones de bases de datos.

El primer requisito está cubierto por los arhcivos `.env` específicos con los que configuramos cada caso.

El segundo está satisfecho en este caso, por la configuración de diferentes contenedores Docker que son ejecutados en paralelo con el código. Esto significa que los scripts del sistema (definidos en el archivo `package.json`), están creados para ejecutar los contenedores de bases de datos para `development`, `test` y `postman`, dependiendo del entornos que se esté arrancando.

Todos los entornos están configurados para ser ejecutados independientemente así que podemos tenerlos todos levantados al mismo tiempo.

Finalmente, toda la aplicación está implementada de manera que cualquier propiedad configurable está definida a través de variables de entorno. de este modo, para cambiar su comportamiento más básico, por ejemplo la ubicación de la base de datos o la URL de arranque de la aplicación, sólo es necesario actualizar el archivo específico de variables de entorno y reiniciar la aplicación.

## <a id="commands"></a>🔥 Commands guide

### <a id="commands-switch-node"></a>✅ Cambiando la versión de NodeJS

```sh
nvm use
```

### <a id="commands-installation"></a>⬇️ Proceso de instalación de módulos

```sh
npm i
```

### <a id="commands-tests"></a>🧪 Ejecución de los tests

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
- Importar en Postman los archivos que están en el directorio `test/postman`.

```sh
# Run the specific environment for Postman.
npm run start:postman
```

La configuración del área de trabajo para Postman también está publicada en este [enlace](https://www.postman.com/ddialar/workspace/ddialar-pokemon-challenge/request/999892-eea02d9a-3eb5-4a78-9b85-6ec4e4fa20f3).

### <a id="commands-dev-mode"></a>🏭 Ejecución de la aplicación en modo desarrollo

**Required files:**

- `env/.env.development`

```sh
npm start
```

Open `http://127.0.0.1:3000` in your browser.

### <a id="commands-pro-mode"></a>🚀 Compilación de la aplicación

Compilación incremental del proyecto:

```sh
npm run build
```

Para forzar una compilación completa limpiando la caché de componentes:

```sh
npm run rebuild
```

En este caso no será necesario tener ningún archivo de entorno antes de compilar la aplicación. Sin embargo, este archivo sí será necesario proporcionarlo en el proceso de ejecución de la aplicación.

### <a id="commands-lint"></a>🩹 Arreglar y aplicar estilos al código

```sh
npm run lint
```

Para arreglar posibles errores:

```sh
npm run lint:fix
```

### <a id="commands-other"></a>🧰 Otros comandos útiles

Dado que parar la aplciación desde los modos de `development` o `postman` no detiene los contenedores específicamente creados para ellas, es necesario pararlos manualmente.

En estos casos, para detener el contenedor de cada entorno específico, los comandos que se deben ejecutar son estos:

```sh
npm run dev_infra:down
npm run test_infra:down
npm run postman_infra:down
```

Todos ellos detienen el contenedor, lo eliminan y borran el volumen de Docker asociado.

Generara la documentación de OpenAPI en un archivo.

```sh
npm run openapi-spec
```

## <a id="apidoc"></a>📗 Documentación de la API REST

`http://127.0.0.1:3000/explorer/`

El puerto de acceso debe ser definido en las variables de entorno. Echa un vistazo a la sección [**variables de entorno**](https://github.com/ddialar/pokemon.challenge/blob/master/docs/README_ES.md#repository-overview-environment-variables) section.

## <a id="final-notes"></a>🔍 Notas finales

Mientras se ejecuta la aplicación, en la consola aparecen algunos mensajes que no pertenece al código. Esto mensajes son los siguientes:

```
Top-level use of w, wtimeout, j, and fsync is deprecated. Use writeConcern instead.
```

```
(node:1800) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
```

Ambos están generados por errors sin solventar del divre para MongoDB. Estos errores será arreglados en futuras versiones.

Información adicional:

- [Foro oficial de MongoDB](https://developer.mongodb.com/community/forums/t/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-circular-dependency/15411/6)
- [Hilo en StackOverflow](https://stackoverflow.com/a/66376829)
