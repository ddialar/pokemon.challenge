import {ParameterObject, ResponseModelOrSpec} from '@loopback/openapi-v3';
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

export const POKEMON_MARKED_FAVORITE_SUCCESS_SCHEMA: ResponseModelOrSpec = {
  description: 'Pokemon marked as favorite successfully',
};

export const POKEMON_UNMARKED_FAVORITE_SUCCESS_SCHEMA: ResponseModelOrSpec = {
  description: 'Pokemon unmarked as favorite successfully',
};

export const POKEMON_ID_SCHEMA: ParameterObject = {
  name: 'id',
  in: 'path',
  required: true,
  schema: {
    type: 'string',
    pattern: process.env.POKEMON_ID_PATTERN,
  },
};

export const POKEMON_NAME_SCHEMA: ParameterObject = {
  name: 'name',
  in: 'path',
  required: true,
  schema: {
    type: 'string',
    pattern: process.env.POKEMON_NAME_PATTERN,
  },
};

export const POKEMON_FILTER_NAME_SCHEMA: ParameterObject = {
  name: 'name',
  in: 'query',
  schema: {
    type: 'string',
    pattern: process.env.POKEMON_NAME_PATTERN,
  },
};

export const POKEMON_FILTER_TYPE_SCHEMA: ParameterObject = {
  name: 'type',
  in: 'query',
  schema: {
    type: 'string',
    pattern: process.env.POKEMON_TYPE_PATTERN,
  },
};

export const POKEMON_FILTER_PAGE_SCHEMA: ParameterObject = {
  name: 'page',
  in: 'query',
  schema: {
    type: 'number',
    minimum: parseInt(process.env.POKEMON_FILTER_DEFAULT_PAGE!, 10),
  },
};

export const POKEMON_FILTER_LIMIT_SCHEMA: ParameterObject = {
  name: 'limit',
  in: 'query',
  schema: {
    type: 'number',
    minimum: 0,
    default: parseInt(process.env.POKEMON_FILTER_DEFAULT_LIMIT!, 10),
    description:
      'If this value is set to 0, the whole records will be returned',
  },
};

export const POKEMON_FILTER_FAVORITE_SCHEMA: ParameterObject = {
  name: 'favorite',
  in: 'query',
  schema: {
    type: 'boolean',
  },
};
