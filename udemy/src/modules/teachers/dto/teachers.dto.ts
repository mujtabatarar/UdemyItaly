import { IsString, IsEmail, IsOptional, IsObject } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsObject({ message: 'metaData must be an object' })
  readonly metaData?: object;
}

export class FindByIdDto {
  @IsString()
  readonly id: string;
}
