import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import * as validators from './../validators';

@injectable({scope: BindingScope.TRANSIENT})
export class ValidatorService {
  validatePokemonId(pokemonId: string) {
    const {error} = validators.validatePokemonId(pokemonId);

    if (error) {
      throw new HttpErrors.BadRequest(`Pokemon id format mismatch: ${error}`);
    }
  }

  validatePokemonName(pokemonName?: string, required?: boolean) {
    const {error} = validators.validatePokemonName(pokemonName, required);

    if (error) {
      throw new HttpErrors.BadRequest(`Pokemon name not valid: ${error}`);
    }
  }

  validatePokemonType(pokemonType?: string) {
    const {error} = validators.validatePokemonType(pokemonType);

    if (error) {
      throw new HttpErrors.BadRequest(`Pokemon name not valid: ${error}`);
    }
  }

  validateFilterPage(page: number) {
    const {error} = validators.validateFilterPage(page);

    if (error) {
      throw new HttpErrors.BadRequest(
        `The pagination value is not valid: ${error}`,
      );
    }
  }

  validateFilterLimit(limit: number) {
    const {error} = validators.validateFilterLimit(limit);

    if (error) {
      throw new HttpErrors.BadRequest(
        `The pagination value is not valid: ${error}`,
      );
    }
  }

  validateFilterFavorite(favorite?: boolean) {
    const {error} = validators.validateFilterFavorite(favorite);

    if (error) {
      throw new HttpErrors.BadRequest(
        `The provided favorite options is not valid: ${error}`,
      );
    }
  }
}
