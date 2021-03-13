import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Pokemon, PokemonRelations} from '../models';

export type PokemonRequestFilter = {
  name?: string;
  type?: string;
  skip?: number;
  limit?: number;
};

export class PokemonRepository extends DefaultCrudRepository<
  Pokemon,
  typeof Pokemon.prototype.id,
  PokemonRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Pokemon, dataSource);
  }

  async findFiltered({
    name,
    type,
    skip,
    limit,
  }: PokemonRequestFilter): Promise<Pokemon[]> {
    const where = {
      name: name && {regexp: new RegExp(name, 'i')},
      types: type ? {inq: [[type]]} : undefined,
    };
    const filter = {
      where,
      skip,
      limit,
      order: ['id ASC'],
    };
    return this.find(filter);
  }
}
