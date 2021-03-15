import {TokenService, UserService} from '@loopback/authentication';
import {BindingScope, injectable, service} from '@loopback/core';
import {LoginInputParams} from '../types';
import {User} from './../models/user.model';
import {JwtService} from './jwt.service';
import {MyUserService} from './user.service';

export interface AuthenticatedUser {
  token: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @service(JwtService)
    public jwtService: TokenService,
    @service(MyUserService)
    public userService: UserService<User, LoginInputParams>,
  ) {}

  public async login(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.userService.verifyCredentials({username, password});
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }
}
