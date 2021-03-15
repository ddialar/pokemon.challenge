import {service} from '@loopback/core';
import {post, requestBody, response} from '@loopback/rest';
import {AuthenticatedUser, AuthenticationService} from '../../services';
import {LoginInputParams} from '../../types';
import {
  LOGIN_REQUEST_BODY_SCHEMA,
  LOGIN_RESPONSE_SCHEMA,
} from './authentication.schemas';

export class AuthenticationController {
  constructor(
    @service(AuthenticationService)
    public authenticationService: AuthenticationService,
  ) {}

  @post('/login')
  @response(200, LOGIN_RESPONSE_SCHEMA)
  async login(
    @requestBody(LOGIN_REQUEST_BODY_SCHEMA)
    {username, password}: LoginInputParams,
  ): Promise<AuthenticatedUser> {
    return this.authenticationService.login(username, password);
  }
}
