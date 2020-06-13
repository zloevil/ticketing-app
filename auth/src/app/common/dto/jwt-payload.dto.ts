import {
  IsEmail, IsNotEmpty, IsNumber, IsUUID,
} from 'class-validator';

export class JwtPayloadDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  iat: number;

  @IsNotEmpty()
  @IsNumber()
  exp: number;
}
