import {LoginInputParams} from './../types';
import {loginSchema, pokemonIdSchema} from './validation.schemas';

interface ValidationResult {
  error?: string;
}

export const validateLoginData = ({
  username,
  password,
}: LoginInputParams): ValidationResult => {
  const {error} = loginSchema.validate({username, password});
  return {error: error?.details[0].message};
};

export const validatePokemonId = (pokemonId: string): ValidationResult => {
  const {error} = pokemonIdSchema.validate({pokemonId});
  return {error: error?.details[0].message};
};

export const validatePokemonName = (pokemonName: string): ValidationResult => {
  const {error} = pokemonIdSchema.validate({pokemonName});
  return {error: error?.details[0].message};
};
