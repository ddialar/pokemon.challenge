import Joi from 'joi';
import {password, pokemonId, pokemonName, username} from './validation.rules';

export const loginSchema = Joi.object({username, password});
export const pokemonIdSchema = Joi.object({pokemonId});
export const pokemonNameSchema = Joi.object({pokemonName});
