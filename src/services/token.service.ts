import {BindingScope, injectable} from '@loopback/core';
import {Algorithm, Secret, sign, SignOptions, verify} from 'jsonwebtoken';

interface UserParams {
  id: string;
  username: string;
  name: string;
  surname: string;
}

interface DecodedJwtToken extends UserParams {
  exp: number;
  iat: number;
}

@injectable({scope: BindingScope.TRANSIENT})
export class TokenService {
  public static encodeJwt({id, username, name, surname}: UserParams): string {
    const payload = {
      sub: id,
      username,
      name,
      surname,
    };
    const secret: Secret = process.env.JWT_KEY!;
    const options: SignOptions = {
      algorithm: (process.env.JWT_ALGORITHM as Algorithm) ?? 'HS512',
      expiresIn: parseInt(process.env.JWT_EXPIRING_TIME_IN_SECONDS ?? '60', 10),
    };

    return sign(payload, secret, options);
  }

  public static decodeJwt(encodedToken: string) {
    const secret: Secret = process.env.JWT_KEY!;
    return verify(encodedToken, secret) as DecodedJwtToken;
  }
}
