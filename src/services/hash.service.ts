import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {compare} from 'bcrypt';

@injectable({scope: BindingScope.TRANSIENT})
export class HashService {
  static checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return compare(plainPassword, hashedPassword);
    } catch ({message}) {
      throw new HttpErrors.InternalServerError(
        `Error checking password. ${message}`,
      );
    }
  }
}
