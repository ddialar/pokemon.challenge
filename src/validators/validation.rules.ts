import Joi from 'joi';

export const username = Joi.string()
  .email({minDomainSegments: 2, tlds: {allow: false}})
  .required();
export const password = Joi.string()
  .pattern(new RegExp(`/${process.env.PASSWORD_PATTERN}/`))
  .required();
export const pokemonId = Joi.string()
  .pattern(new RegExp(`/${process.env.POKEMON_ID_PATTERN}/`))
  .required();
export const pokemonName = Joi.string()
  .pattern(/^[a-zA-Z]+$/)
  .required();
