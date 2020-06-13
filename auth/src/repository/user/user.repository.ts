import { EntityRepository, Repository } from 'typeorm';
import { randomBytes, pbkdf2 } from 'crypto';
import { promisify } from 'util';
import { UserEntity } from '../../entity/user.entity';
import { Password } from './types';
import { CredentialsDto } from '../../app/auth/dto/credentials.dto';

const pbkdf2Async = promisify(pbkdf2);

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createByEmail(credentials: CredentialsDto) {
    const { email, password } = credentials;
    const { hash, salt } = await this.generateHash(password);
    const user = new UserEntity();
    user.email = email;
    user.hash = hash;
    user.salt = salt;
    return this.save(user);
  }

  validatePassword(password: string, user: UserEntity) {
    return this.compareHashes(password, user.hash, user.salt);
  }

  generateHash = async (string: string): Promise<Password> => {
    const salt = randomBytes(128).toString('base64');

    const hash = (await pbkdf2Async(string, salt, 12000, 128, 'sha256')).toString('base64');
    return {
      salt,
      hash,
    };
  }

  compareHashes = async (income: string, hash: string, salt: string): Promise<boolean> => {
    const hashResult = (await pbkdf2Async(income, salt, 12000, 128, 'sha256')).toString('base64');
    return hash === hashResult;
  }

  findByEmail(email: string) {
    return this.findOne({
      email,
    });
  }

  async findById(id: string) {
    return this.findOne(id, {
      cache: {
        id: `self-info_${id}`,
        milliseconds: 30000,
      },
    });
  }
}
