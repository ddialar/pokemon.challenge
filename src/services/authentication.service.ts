import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {HashService} from './hash.service';
import {TokenService} from './token.service';

export interface AuthenticatedUser {
  token: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async login(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const persistedUser = await this.userRepository.findOne({
      where: {username},
    });
    if (!persistedUser) {
      throw new HttpErrors.NotFound(
        `User with username '${username}' doesn't exist in login process.`,
      );
    }
    const {id: userId, password: hashedPassword, name, surname} = persistedUser;

    const validPassword = await HashService.checkPassword(
      password,
      hashedPassword,
    );
    if (!validPassword) {
      throw new HttpErrors.Unauthorized(
        `Password missmatches for username '${username}' in login process.`,
      );
    }

    const token = TokenService.encodeJwt({
      id: userId!,
      username,
      name,
      surname,
    });
    await this.userRepository.updateById(userId!, {token});

    return {token};
  }
}
