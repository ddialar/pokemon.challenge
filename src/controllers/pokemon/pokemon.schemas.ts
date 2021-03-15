import {ResponseModelOrSpec} from '@loopback/openapi-v3';
import {getModelSchemaRef} from '@loopback/rest';
import {Pokemon} from './../../models/pokemon/pokemon.model';

export const POKEMONS_ARRAY_RESPONSE_SCHEMA: ResponseModelOrSpec = {
  description: 'Array of Pokemon model instances',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  },
};

export const POKEMON_TYPES_ARRAY_RESPONSE_SCHEMA: ResponseModelOrSpec = {
  description: 'Pokemon model instance',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const SINGLE_POKEMON_RESPONSE_SCHEMA: ResponseModelOrSpec = {
  description: 'Pokemon model instance',
  content: {
    'application/json': {
      schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
    },
  },
};
