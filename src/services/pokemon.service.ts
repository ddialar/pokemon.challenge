import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {PokemonRequestFilter} from '../types';
import {Pokemon} from './../models';
import {PokemonRepository} from './../repositories/pokemon.repository';
import {ValidatorService} from './validator.service';

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
    this.validationService.validatePokemonName(name, true);

    try {
      const retrievedPokemon = await this.pokemonRepository.findByName(name);

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
    try {
      const retrievedTypes = await this.pokemonRepository.findTypesPerPokemon();

      return retrievedTypes
        .reduce((result, types) => {
          types.forEach(type => {
            result = result.includes(type) ? result : [...result, type];
          });
          return result;
        }, [] as string[])
        .sort();
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Retrieving pokemon types: ${message}`,
      );
    }
  }

  async getFiltered({
    name,
    type,
    page = parseInt(process.env.POKEMON_FILTER_DEFAULT_PAGE!, 10),
    limit = parseInt(process.env.POKEMON_FILTER_DEFAULT_LIMIT!, 10),
    favorite,
  }: PokemonRequestFilter): Promise<Pokemon[]> {
    this.validationService.validatePokemonName(name);
    this.validationService.validatePokemonType(type);
    this.validationService.validateFilterPage(page);
    this.validationService.validateFilterLimit(limit);
    this.validationService.validateFilterFavorite(favorite);

    try {
      return await this.pokemonRepository.findFiltered({
        name,
        type,
        page,
        limit,
        favorite,
      });
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Retrieving pokemon using filtering parameters: ${message}`,
      );
    }
  }

  async markAsFavorite(id: string): Promise<void> {
    this.validationService.validatePokemonId(id);

    try {
      const retrievedPokemon = await this.pokemonRepository.findById(id);

      if (!retrievedPokemon) {
        throw new HttpErrors.NotFound();
      }

      await this.pokemonRepository.markAsFavorite(retrievedPokemon);
    } catch (error) {
      throw error.isHttpError
        ? error
        : new HttpErrors.InternalServerError(
            `Marking pokemon '${id}' as favorite: ${error.message}`,
          );
    }
  }

  async unmarkAsFavorite(id: string): Promise<void> {
    this.validationService.validatePokemonId(id);

    try {
      const retrievedPokemon = await this.pokemonRepository.findById(id);

      if (!retrievedPokemon) {
        throw new HttpErrors.NotFound();
      }

      await this.pokemonRepository.unmarkAsFavorite(retrievedPokemon);
    } catch (error) {
      throw error.isHttpError
        ? error
        : new HttpErrors.InternalServerError(
            `Unmarking pokemon '${id}' as favorite: ${error.message}`,
          );
    }
  }
}
