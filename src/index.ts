import {ApplicationConfig, Main} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  checkStartup();

  const app = new Main(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  // REFACTOR Replace this log for a specific logger suite
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

function checkStartup() {
  const requiredEnvVariables = [
    'MONGO_USER',
    'MONGO_PASS',
    'MONGO_HOST',
    'MONGO_PORT',
    'MONGO_DB',
    'POKEMON_ID_PATTERN',
    'POKEMON_NAME_PATTERN',
    'POKEMON_TYPE_PATTERN',
    'POKEMON_FILTER_DEFAULT_PAGE',
    'POKEMON_FILTER_DEFAULT_LIMIT',
  ];

  const nonConfiguredVariables = requiredEnvVariables.reduce(
    (result: string[], variable) => {
      return process.env[variable] ? result : [...result, variable];
    },
    [],
  );

  if (nonConfiguredVariables.length) {
    console.error(
      `The next required environment variables are not configured: ${JSON.stringify(
        nonConfiguredVariables,
      )}`,
    );
    process.exit(1);
  } else {
    console.log('Environment variables successfully configured');
  }
}
