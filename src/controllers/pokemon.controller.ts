import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Pokemon} from '../models';
import {PokemonRepository} from '../repositories';

export class PokemonController {
  constructor(
    @repository(PokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  // ###############################################################
  // #####                      REQUIRED                       #####
  // ###############################################################

  @get('/pokemons')
  @response(200, {
    description: 'Array of Pokemon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pokemon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string('name') name?: string,
    @param.query.string('type') type?: string,
    @param.query.integer('page') page?: number,
    @param.query.integer('limit') limit?: number,
  ): Promise<Pokemon[]> {
    const skip = page && limit ? (page - 1) * limit : undefined;
    return this.pokemonRepository.findFiltered({name, type, skip, limit});
  }

  @get('/pokemons/{id}')
  @response(200, {
    description: 'Pokemon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pokemon, {exclude: 'where'})
    filter?: FilterExcludingWhere<Pokemon>,
  ): Promise<Pokemon> {
    return this.pokemonRepository.findById(id, filter);
  }

  @get('/pokemons/name/{name}')
  @response(200, {
    description: 'Pokemon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  })
  async findByName(@param.path.string('name') name: string): Promise<Pokemon> {
    const nameRegex = new RegExp(name, 'i');
    const retrievedPokemon = await this.pokemonRepository.findOne({
      where: {name: {regexp: nameRegex}},
    });

    if (!retrievedPokemon) {
      throw new HttpErrors.NotFound();
    }

    return retrievedPokemon;
  }

  @get('/pokemons/types')
  @response(200, {
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
  })
  async findTypes(): Promise<string[]> {
    const retrievedTypes = await this.pokemonRepository.find(
      {},
      {fields: {types: true}},
    );

    return retrievedTypes
      .reduce((result, {types}) => {
        types.forEach(type => {
          result = result.includes(type) ? result : [...result, type];
        });
        return result;
      }, [] as string[])
      .sort();
  }

  // ###############################################################
  // #####                      REQUIRED                       #####
  // ###############################################################

  @patch('/pokemons')
  @response(200, {
    description: 'Pokemon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
    @param.where(Pokemon) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.pokemonRepository.updateAll(pokemon, where);
  }

  @put('/pokemons/{id}')
  @response(204, {
    description: 'Pokemon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pokemon: Pokemon,
  ): Promise<void> {
    await this.pokemonRepository.replaceById(id, pokemon);
  }
}
