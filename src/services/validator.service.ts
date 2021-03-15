import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {LoginInputParams} from '../types';
import * as validators from './../validators';

@injectable({scope: BindingScope.TRANSIENT})
export class ValidatorService {
  validateLogin({username, password}: LoginInputParams, message?: string) {
    const {error} = validators.validateLoginData({username, password});

    if (error) {
      throw new HttpErrors.BadRequest(
        `${message ?? 'Username or password is not valid'}: ${error}`,
      );
    }
  }

  validatePokemonId(pokemonId: string, message?: string) {
    const {error} = validators.validatePokemonId(pokemonId);

    if (error) {
      throw new HttpErrors.BadRequest(
        `${message ?? 'Pokemon id format mismatch'}: ${error}`,
      );
    }
  }

  validatePokemonName(pokemonName: string, message?: string) {
    const {error} = validators.validatePokemonName(pokemonName);

    if (error) {
      throw new HttpErrors.BadRequest(
        `${message ?? 'Pokemon name not valid'}: ${error}`,
      );
    }
  }
}
