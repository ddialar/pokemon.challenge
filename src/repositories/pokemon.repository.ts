import {inject} from '@loopback/core';
import {DefaultCrudRepository, Filter} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Pokemon, PokemonRelations} from '../models';
import {PokemonRequestFilter} from '../types';

export class PokemonRepository extends DefaultCrudRepository<
  Pokemon,
  typeof Pokemon.prototype.id,
  PokemonRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Pokemon, dataSource);
  }

  async findByPokemonId(pokemonId: string): Promise<Pokemon | null> {
    const filter = {
      where: {
        id: pokemonId
      },
    };

    return this.findOne(filter);
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const nameRegex = new RegExp(name, 'i');
    const filter = {
      where: {
        name: {
          regexp: nameRegex,
        },
      },
    };

    return this.findOne(filter);
  }

  async findTypesPerPokemon(): Promise<string[][]> {
    return (await this.find({fields: {types: true}})).map(({types}) => types);
  }

  async findFiltered({
    name,
    type,
    page,
    limit,
    favorite,
  }: PokemonRequestFilter): Promise<Pokemon[]> {
    const where = {
      name: name ? {regexp: new RegExp(name, 'i')} : undefined,
      types: type ? {inq: [[type]]} : undefined,
      favorite: favorite ? favorite : undefined,
    };

    const filter: Filter<Pokemon> = {
      where,
      skip: page && limit ? (page - 1) * limit : undefined,
      limit,
      order: ['id ASC'],
    };

    return this.find(filter);
  }

  async markAsFavorite(pokemon: Pokemon): Promise<void> {
    await this.update(new Pokemon({...pokemon, favorite: true}));
  }

  async unmarkAsFavorite(pokemon: Pokemon): Promise<void> {
    await this.update(new Pokemon({...pokemon, favorite: false}));
  }
}
