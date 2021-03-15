import {UserService} from '@loopback/authentication';
import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {LoginInputParams} from '../types';
import {HashService} from './hash.service';

@injectable({scope: BindingScope.TRANSIENT})
export class MyUserService implements UserService<User, LoginInputParams> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  async verifyCredentials({
    username,
    password,
  }: LoginInputParams): Promise<User> {
    const invalidCredentialsError = 'Invalid username or password';

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
}
