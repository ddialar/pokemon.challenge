import {config} from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../../../env/.env.test') });

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

export const MONGODB_CONFIG = {
  name: 'mongo',
  connector: 'mongodb',
  url: `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
  host: MONGO_HOST,
  port: MONGO_PORT,
  user: MONGO_USER,
  password: MONGO_USER,
  database: MONGO_DB,
  useNewUrlParser: true,
};

// const pokemonRepository = new PokemonRepository(new MongoDataSource(MONGODB_CONFIG));
