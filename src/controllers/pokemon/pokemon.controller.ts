import {service} from '@loopback/core';
import {get, param, put, response} from '@loopback/rest';
import {Pokemon} from '../../models';
import {PokemonService} from './../../services/pokemon.service';
import {
  POKEMONS_ARRAY_RESPONSE_SCHEMA,
  POKEMON_FILTER_FAVORITE_SCHEMA,
  POKEMON_FILTER_LIMIT_SCHEMA,
  POKEMON_FILTER_NAME_SCHEMA,
  POKEMON_FILTER_PAGE_SCHEMA,
  POKEMON_FILTER_TYPE_SCHEMA,
  POKEMON_ID_SCHEMA,
  POKEMON_MARKED_FAVORITE_SUCCESS_SCHEMA,
  POKEMON_NAME_SCHEMA,
  POKEMON_TYPES_ARRAY_RESPONSE_SCHEMA,
  POKEMON_UNMARKED_FAVORITE_SUCCESS_SCHEMA,
  SINGLE_POKEMON_RESPONSE_SCHEMA
} from './pokemon.schemas';

export class PokemonController {
  constructor(
    @service(PokemonService)
    public pokemonService: PokemonService,
  ) {}

  @get('/pokemons')
  @response(200, POKEMONS_ARRAY_RESPONSE_SCHEMA)
  async find(
    @param(POKEMON_FILTER_NAME_SCHEMA) name?: string,
    @param(POKEMON_FILTER_TYPE_SCHEMA) type?: string,
    @param(POKEMON_FILTER_PAGE_SCHEMA) page?: number,
    @param(POKEMON_FILTER_LIMIT_SCHEMA) limit?: number,
    @param(POKEMON_FILTER_FAVORITE_SCHEMA) favorite?: boolean,
  ): Promise<Pokemon[]> {
    return this.pokemonService.getFiltered({name, type, page, limit, favorite});
  }

  @get('/pokemons/{id}')
  @response(200, SINGLE_POKEMON_RESPONSE_SCHEMA)
  async findById(@param(POKEMON_ID_SCHEMA) id: string): Promise<Pokemon> {
    return this.pokemonService.getById(id);
  }

  @get('/pokemons/name/{name}')
  @response(200, SINGLE_POKEMON_RESPONSE_SCHEMA)
  async findByName(@param(POKEMON_NAME_SCHEMA) name: string): Promise<Pokemon> {
    return this.pokemonService.getByName(name);
  }

  @get('/pokemons/types')
  @response(200, POKEMON_TYPES_ARRAY_RESPONSE_SCHEMA)
  async findTypes(): Promise<string[]> {
    return this.pokemonService.getTypes();
  }

  @put('/pokemons/markAsFavorite/{id}')
  @response(204, POKEMON_MARKED_FAVORITE_SUCCESS_SCHEMA)
  async markAsFavorite(@param(POKEMON_ID_SCHEMA) id: string): Promise<void> {
    await this.pokemonService.markAsFavorite(id);
  }

  @put('/pokemons/unmarkAsFavorite/{id}')
  @response(204, POKEMON_UNMARKED_FAVORITE_SUCCESS_SCHEMA)
  async unmarkAsFavorite(@param(POKEMON_ID_SCHEMA) id: string): Promise<void> {
    await this.pokemonService.unmarkAsFavorite(id);
  }
}
