import Joi from 'joi';

export const pokemonId = Joi.string()
  .pattern(new RegExp(process.env.POKEMON_ID_PATTERN!))
  .required();
export const pokemonName = Joi.string().pattern(
  new RegExp(process.env.POKEMON_NAME_PATTERN!),
);
export const pokemonNameRequired = pokemonName.required();
export const pokemonType = Joi.string().pattern(
  new RegExp(process.env.POKEMON_TYPE_PATTERN!),
);
export const filterPage = Joi.number().min(1);
export const filterLimit = Joi.number().min(0);
export const filterFavorite = Joi.boolean();
