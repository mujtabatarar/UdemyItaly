import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsDate,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { EMPLOYMENT_TYPES_ENUM, USER_STATUS } from '../enum/users.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  udemyUserName: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @IsOptional()
  @IsString()
  mobileNo?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsEnum(EMPLOYMENT_TYPES_ENUM)
  employementType?: EMPLOYMENT_TYPES_ENUM;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @IsString()
  deviceName?: string;

  @IsOptional()
  @IsString()
  deviceToken?: string;

  @IsOptional()
  @IsString()
  clientOs?: string;

  @IsOptional()
  @IsString()
  prefferedLanguage?: string;

  @IsOptional()
  @IsString()
  appVersion?: string;

  @IsOptional()
  @IsBoolean()
  isOnline?: boolean;

  @IsOptional()
  @IsDate()
  lastLogin?: Date;

  @IsOptional()
  @IsEnum(USER_STATUS)
  status?: USER_STATUS;
}

export class UpdateUserDto extends CreateUserDto {}
