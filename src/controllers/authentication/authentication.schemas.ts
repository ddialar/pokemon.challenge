import {ResponseModelOrSpec} from '@loopback/openapi-v3';
import {RequestBodyObject} from 'openapi3-ts';

export const LOGIN_RESPONSE_SCHEMA: ResponseModelOrSpec = {
  description: 'User model instance',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['token'],
        properties: {
          token: {
            type: 'string',
            description: 'JWT token',
          },
        },
      },
    },
  },
};

export const LOGIN_REQUEST_BODY_SCHEMA: Partial<RequestBodyObject> = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
            type: 'string' as const,
            example: 'jane@doe.com',
          },
          password: {
            type: 'string' as const,
            example: '123456',
          },
        },
      },
    },
  },
};
