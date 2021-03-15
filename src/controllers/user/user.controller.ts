import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {service} from '@loopback/core';
import {param, put, response} from '@loopback/rest';
import {SecurityBindings} from '@loopback/security';
import {User} from '../../models';
import {MyUserService} from './../../services';
import {ValidatorService} from './../../services/validator.service';
import {
  FAVORITE_POKEMON_RESPONSE_SCHEMA,
  POKEMON_ID_SCHEMA,
} from './user.schemas';

export class UserController {
  constructor(
    @inject(SecurityBindings.USER)
    private user: User,
    @service(MyUserService)
    private userService: MyUserService,
    @service(ValidatorService)
    private validatorService: ValidatorService,
  ) {}

  @put('/users/markFavorite/{pokemonId}')
  @authenticate('jwt')
  @response(200, FAVORITE_POKEMON_RESPONSE_SCHEMA)
  async markFavorite(
    @param(POKEMON_ID_SCHEMA) pokemonId: string,
  ): Promise<{message: string}> {
    this.validatorService.validatePokemonId(pokemonId);
    return this.userService.markPokemonFavorite(pokemonId, this.user);
  }

  @put('/users/unmarkFavorite/{pokemonId}')
  @authenticate('jwt')
  @response(200, FAVORITE_POKEMON_RESPONSE_SCHEMA)
  async unmarkFavorite(
    @param(POKEMON_ID_SCHEMA) pokemonId: string,
  ): Promise<{message: string}> {
    this.validatorService.validatePokemonId(pokemonId);
    return this.userService.unmarkPokemonFavorite(pokemonId, this.user);
  }
}
