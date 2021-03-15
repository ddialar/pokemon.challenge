import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Pokemon} from './../models';
import {PokemonRepository} from './../repositories/pokemon.repository';
import {ValidatorService} from './validator.service';

export type PokemonRequestFilter = {
  name?: string;
  type?: string;
  page?: number;
  limit?: number;
};

@injectable({scope: BindingScope.TRANSIENT})
export class PokemonService {
  constructor(
    @repository(PokemonRepository)
    private pokemonRepository: PokemonRepository,
    @service(ValidatorService)
    private validationService: ValidatorService,
  ) {}

  async getById(id: string): Promise<Pokemon> {
    this.validationService.validatePokemonId(id);

    try {
      return await this.pokemonRepository.findById(id);
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Retrieving pokemon with id '${id}': ${message}`,
      );
    }
  }

  async getByName(name: string): Promise<Pokemon> {
    this.validationService.validatePokemonName(name);

    const nameRegex = new RegExp(name, 'i');
    const filter = {
      where: {
        name: {
          regexp: nameRegex,
        },
      },
    };

    try {
      const retrievedPokemon = await this.pokemonRepository.findOne(filter);

      if (!retrievedPokemon) {
        throw new HttpErrors.NotFound();
      }

      return retrievedPokemon;
    } catch (error) {
      throw error.isHttpError
        ? error
        : new HttpErrors.InternalServerError(
            `Retrieving pokemon by name '${name}': ${error.message}`,
          );
    }
  }

  async getTypes(): Promise<string[]> {
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

  async getFiltered({
    name,
    type,
    page,
    limit,
  }: PokemonRequestFilter): Promise<Pokemon[]> {
    const where = {
      name: name && {regexp: new RegExp(name, 'i')},
      types: type ? {inq: [[type]]} : undefined,
    };
    const filter = {
      where,
      skip: page && limit ? (page - 1) * limit : undefined,
      limit,
      order: ['id ASC'],
    };

    try {
      return await this.pokemonRepository.findFiltered(filter);
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Retrieving pokemon using filtering parameters: ${message}`,
      );
    }
  }
}
