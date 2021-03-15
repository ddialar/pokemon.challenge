import {ParameterObject, ResponseModelOrSpec} from '@loopback/openapi-v3';
import {getModelSchemaRef} from '@loopback/rest';
import {User} from './../../models/user.model';

export const POKEMON_ID_SCHEMA: ParameterObject = {
  name: 'pokemonId',
  in: 'path',
  schema: {
    type: 'string',
    pattern: process.env.POKEMON_ID_PATTERN,
  },
};

export const GET_ALL_USERS_RESPONSE_SCHEMA: ResponseModelOrSpec = {
  description: 'Array of User model instances',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(User, {
          includeRelations: true,
          exclude: [
            'id',
            'password',
            'token',
            'favoritePokemons',
            'createdAt',
            'updatedAt',
          ],
        }),
      },
    },
  },
};

export const FAVORITE_POKEMON_RESPONSE_SCHEMA: ResponseModelOrSpec = {
  description: 'Favorite or unfavorite pokemon message',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            required: true,
          },
        },
      },
    },
  },
};
