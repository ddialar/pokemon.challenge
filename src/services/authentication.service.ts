import {TokenService, UserService} from '@loopback/authentication';
import {BindingScope, injectable, service} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {LoginInputParams} from '../types';
import {User} from './../models/user.model';
import {JwtService} from './jwt.service';
import {MyUserService} from './user.service';
import {ValidatorService} from './validator.service';

export interface AuthenticatedUser {
  token: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @service(JwtService)
    private jwtService: TokenService,
    @service(MyUserService)
    private userService: UserService<User, LoginInputParams>,
    @service(ValidatorService)
    private validationService: ValidatorService,
  ) {}

  public async login(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    this.validationService.validateLogin({username, password});

    try {
      const user = await this.userService.verifyCredentials({
        username,
        password,
      });
      const userProfile = this.userService.convertToUserProfile(user);
      const token = await this.jwtService.generateToken(userProfile);
      return {token};
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Login process error: ${message}`,
      );
    }
  }
}
