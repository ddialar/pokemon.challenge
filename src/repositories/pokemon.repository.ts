import {inject} from '@loopback/core';
import {DefaultCrudRepository, Filter} from '@loopback/repository';
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

  async findFiltered(filter: Filter<Pokemon>): Promise<Pokemon[]> {
    return this.find(filter);
  }
}
