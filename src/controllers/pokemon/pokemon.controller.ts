import {repository} from '@loopback/repository';
import {get, param, response} from '@loopback/rest';
import {Pokemon} from '../../models';
import {PokemonService} from './../../services/pokemon.service';
import {
  POKEMONS_ARRAY_RESPONSE_SCHEMA,
  POKEMON_TYPES_ARRAY_RESPONSE_SCHEMA,
  SINGLE_POKEMON_RESPONSE_SCHEMA,
} from './pokemon.schemas';

export class PokemonController {
  constructor(
    @repository(PokemonService)
    public pokemonService: PokemonService,
  ) {}

  @get('/pokemons')
  @response(200, POKEMONS_ARRAY_RESPONSE_SCHEMA)
  async find(
    @param.query.string('name') name?: string,
    @param.query.string('type') type?: string,
    @param.query.integer('page') page?: number,
    @param.query.integer('limit') limit?: number,
  ): Promise<Pokemon[]> {
    return this.pokemonService.getFiltered({name, type, page, limit});
  }

  @get('/pokemons/{id}')
  @response(200, SINGLE_POKEMON_RESPONSE_SCHEMA)
  async findById(@param.path.string('id') id: string): Promise<Pokemon> {
    return this.pokemonService.getById(id);
  }

  @get('/pokemons/name/{name}')
  @response(200, SINGLE_POKEMON_RESPONSE_SCHEMA)
  async findByName(@param.path.string('name') name: string): Promise<Pokemon> {
    return this.pokemonService.getByName(name);
  }

  @get('/pokemons/types')
  @response(200, POKEMON_TYPES_ARRAY_RESPONSE_SCHEMA)
  async findTypes(): Promise<string[]> {
    return this.pokemonService.getTypes();
  }
}
