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
      const retrievedPokemon = await this.pokemonRepository.findByPokemonId(id);

      if (!retrievedPokemon) {
        throw new Error('PokemonNotFound')
      }

      return retrievedPokemon;
    } catch (error) {
      throw error.message.match('PokemonNotFound')
        ? new HttpErrors.NotFound(`Pokemon with id '${id}' is not registered`,)
        : new HttpErrors.InternalServerError(`Retrieving pokemon with id '${id}': ${error.message}`);
    }
  }

  async getByName(name: string): Promise<Pokemon> {
    this.validationService.validatePokemonName(name, true);

    try {
      const retrievedPokemon = await this.pokemonRepository.findByName(name);

      if (!retrievedPokemon) {
        throw new Error('PokemonNotFound')
      }

      return retrievedPokemon;
    } catch (error) {
      throw error.message.match('PokemonNotFound')
        ? new HttpErrors.NotFound(`Pokemon with name '${name}' is not registered`,)
        : new HttpErrors.InternalServerError(`Retrieving pokemon by name '${name}': ${error.message}`);
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
      const retrievedPokemon = await this.pokemonRepository.findByPokemonId(id);

      if (!retrievedPokemon) {
        throw new Error('PokemonNotFound')
      }

      await this.pokemonRepository.markFavorite(retrievedPokemon, true);
    } catch (error) {
      throw error.message.match('PokemonNotFound')
        ? new HttpErrors.NotFound(`Pokemon with id '${id}' is not registered`,)
        : new HttpErrors.InternalServerError(`Marking pokemon '${id}' as favorite: ${error.message}`);
    }
  }

  async unmarkAsFavorite(id: string): Promise<void> {
    this.validationService.validatePokemonId(id);

    try {
      const retrievedPokemon = await this.pokemonRepository.findByPokemonId(id);

      if (!retrievedPokemon) {
        throw new Error('PokemonNotFound')
      }

      await this.pokemonRepository.markFavorite(retrievedPokemon, false);
    } catch (error) {
      throw error.message.match('PokemonNotFound')
        ? new HttpErrors.NotFound(`Pokemon with id '${id}' is not registered`,)
        : new HttpErrors.InternalServerError(`Unmarking pokemon '${id}' as favorite: ${error.message}`);
    }
  }
}
