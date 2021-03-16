import {UserService} from '@loopback/authentication';
import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {LoginInputParams} from '../types';
import {HashService} from './hash.service';
import {PokemonService} from './pokemon.service';
import {ValidatorService} from './validator.service';

@injectable({scope: BindingScope.TRANSIENT})
export class MyUserService implements UserService<User, LoginInputParams> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(PokemonService)
    public pokemonService: PokemonService,
    @service(ValidatorService)
    public validatorService: ValidatorService,
  ) {}

  async verifyCredentials({
    username,
    password,
  }: LoginInputParams): Promise<User> {
    const invalidCredentialsError = 'Invalid username or password';

    this.validatorService.validateLogin({username, password});

    const retrievedUser = await this.userRepository.findOne({
      where: {username},
    });
    if (!retrievedUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const {password: hashedPassword} = retrievedUser;

    const validPassword = await HashService.checkPassword(
      password,
      hashedPassword,
    );
    if (!validPassword) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return retrievedUser;
  }

  convertToUserProfile({id, name, surname, username}: User): UserProfile {
    return {
      [securityId]: id!,
      id,
      name,
      surname,
      username,
    };
  }

  async markPokemonFavorite(
    pokemonId: string,
    {id}: User,
  ): Promise<{message: string}> {
    const presistedPokemon = await this.pokemonService.getById(pokemonId);
    if (!presistedPokemon) {
      throw new HttpErrors.NotFound(
        `Pokemon with id '${pokemonId}' doesn't exist`,
      );
    }

    try {
      const {favoritePokemons} = await this.userRepository.findById(id);

      if (!favoritePokemons.includes(pokemonId)) {
        await this.userRepository.updateById(id, {
          favoritePokemons: [...favoritePokemons, pokemonId],
        });
        return {
          message: 'The selected pokemon was marked as favorite successfully',
        };
      }

      return {message: 'The selected pokemon is already marked as favorite'};
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Marking pokemon as favorite by user '${id}': ${message}`,
      );
    }
  }

  async unmarkPokemonFavorite(
    pokemonId: string,
    {id}: User,
  ): Promise<{message: string}> {
    const presistedPokemon = await this.pokemonService.getById(pokemonId);
    if (!presistedPokemon) {
      throw new HttpErrors.NotFound(
        `Pokemon with id '${pokemonId}' doesn't exist`,
      );
    }

    try {
      const {favoritePokemons} = await this.userRepository.findById(id);

      const pokemonIndex = favoritePokemons.indexOf(pokemonId);

      if (pokemonIndex >= 0) {
        const updatedFavoritePokemons = [...favoritePokemons];
        updatedFavoritePokemons.splice(pokemonIndex, 1);
        await this.userRepository.updateById(id, {
          favoritePokemons: updatedFavoritePokemons,
        });
        return {
          message: 'The selected pokemon was unmarked as favorite successfully',
        };
      }

      return {message: 'The selected pokemon is already unmarked as favorite'};
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Unmarking pokemon as favorite by user '${id}': ${message}`,
      );
    }
  }
}
