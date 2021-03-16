import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {config} from 'dotenv';
import path from 'path';
import {Main} from '../..';
import {MONGODB_CONFIG} from '../fixtures';

config({ path: path.resolve(__dirname, '../../../env/.env.test') });

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    host: process.env.HOST,
    port: +process.env.PORT!
  });

  const app = new Main({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  app.bind('datasource.config.mongo').to(MONGODB_CONFIG)

  return {app, client};
}

export interface AppWithClient {
  app: Main;
  client: Client;
}
