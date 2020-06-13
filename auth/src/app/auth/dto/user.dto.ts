import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { UserEntity } from '../../../entity/user.entity';

export class UserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  created: string;

  @IsNotEmpty()
  updated: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.created = user.created;
    this.updated = user.updated;
  }
}
