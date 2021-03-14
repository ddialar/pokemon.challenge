import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
    hidden: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  surname: string;

  @property({
    type: 'string',
  })
  username: string;

  @property({
    type: 'string',
    hidden: true,
  })
  password: string;

  @property({
    type: 'string',
    hidden: true,
  })
  token: string;

  @property({
    type: 'array',
    itemType: 'string',
    hidden: true,
  })
  favoritePokemons: string[];

  @property({
    type: 'date',
    hidden: true,
  })
  createdAt?: string;

  @property({
    type: 'date',
    hidden: true,
  })
  updatedAt?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
