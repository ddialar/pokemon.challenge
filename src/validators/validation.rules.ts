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
export const filterPage = Joi.number().min(
  parseInt(process.env.POKEMON_FILTER_DEFAULT_PAGE!, 10),
);
export const filterLimit = Joi.number().min(
  parseInt(process.env.POKEMON_FILTER_DEFAULT_LIMIT!, 10),
);
export const filterFavorite = Joi.boolean();
