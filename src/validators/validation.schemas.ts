import Joi from 'joi';
import {
  filterFavorite,
  filterLimit,
  filterPage,
  pokemonId,
  pokemonName,
  pokemonNameRequired,
  pokemonType,
} from './validation.rules';

export const pokemonIdSchema = Joi.object({pokemonId});
export const pokemonNameSchema = Joi.object({pokemonName});
export const pokemonNameRequiredSchema = Joi.object({pokemonNameRequired});
export const pokemonTypeSchema = Joi.object({pokemonType});
export const filterPageSchema = Joi.object({filterPage});
export const filterLimitSchema = Joi.object({filterLimit});
export const filterFavoriteSchema = Joi.object({filterFavorite});
