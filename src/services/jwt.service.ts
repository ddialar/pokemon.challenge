import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Algorithm, Secret, sign, SignOptions, verify} from 'jsonwebtoken';
import {promisify} from 'util';

const signAsync = promisify<object, Secret, SignOptions, string>(sign);
const verifyAsync = promisify(verify);
const secret: Secret = process.env.JWT_KEY!;

interface UserParams {
  id: string;
  username: string;
  name: string;
  surname: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor() {}

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized('Error verifying token: it is null');
    }

    try {
      const {id, username, name} = (await verifyAsync(
        token,
        secret,
      )) as UserParams;

      return Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: id,
          id,
          name,
          username: username,
        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token: ${error.message}`,
      );
    }
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token: userProfile is null',
      );
    }

    const payload: UserParams = {
      id: userProfile[securityId],
      name: userProfile.name!,
      surname: userProfile.surname,
      username: userProfile.username,
    };
    const options: SignOptions = {
      algorithm: (process.env.JWT_ALGORITHM as Algorithm) ?? 'HS512',
      expiresIn: parseInt(process.env.JWT_EXPIRING_TIME_IN_SECONDS ?? '60', 10),
    };

    try {
      return await signAsync(payload, secret, options);
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }
  }
}
