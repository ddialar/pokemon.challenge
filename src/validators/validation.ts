import {
  filterFavoriteSchema,
  filterLimitSchema,
  filterPageSchema,
  pokemonIdSchema,
  pokemonNameRequiredSchema,
  pokemonNameSchema,
  pokemonTypeSchema
} from './validation.schemas';

interface ValidationResult {
  error?: string;
}

export const validatePokemonId = (pokemonId: string): ValidationResult => {
  const {error} = pokemonIdSchema.validate({pokemonId});
  return {error: error?.details[0].message};
};

export const validatePokemonName = (
  pokemonName?: string,
  required = false,
): ValidationResult => {
  const {error} = required
    ? pokemonNameRequiredSchema.validate({pokemonNameRequired: pokemonName})
    : pokemonNameSchema.validate({pokemonName});
  return {error: error?.details[0].message};
};

export const validatePokemonType = (pokemonType?: string): ValidationResult => {
  const {error} = pokemonTypeSchema.validate({pokemonType});
  return {error: error?.details[0].message};
};

export const validateFilterPage = (filterPage: number): ValidationResult => {
  const {error} = filterPageSchema.validate({filterPage});
  return {error: error?.details[0].message};
};

export const validateFilterLimit = (filterLimit: number): ValidationResult => {
  const {error} = filterLimitSchema.validate({filterLimit});
  return {error: error?.details[0].message};
};

export const validateFilterFavorite = (
  filterFavorite?: boolean,
): ValidationResult => {
  const {error} = filterFavoriteSchema.validate({filterFavorite});
  return {error: error?.details[0].message};
};
