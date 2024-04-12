import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsEnum,
  IsEmail,
  IsObject,
  IsDate,
  IsBoolean,
} from 'class-validator';
import {
  EMPLOYMENT_TYPES_ENUM,
  PaymentStatusEnum,
  StatusEnum,
  USER_STATUS,
} from '../enum/udemy.enum';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  teacherId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  metaData: any;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  teacherId?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  metaData?: any;
}

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  expiryDate: string;

  @IsOptional()
  paymentDetails: any;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  paymentStatus: PaymentStatusEnum;

  @IsOptional()
  @IsString()
  subscriptionId: string;

  @IsOptional()
  @IsString()
  couponCode: string;

  @IsOptional()
  userProgress: any;
}

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  video_url: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sectionIds: string[];

  @IsOptional()
  metaData: any;
}

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  video_url?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sectionIds?: string[];

  @IsOptional()
  @IsString()
  metaData?: string;
}

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  courseIds?: string[];

  @IsOptional()
  metaData?: any;
}

export class UpdateSectionDto extends CreateSectionDto {}

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
  @IsString()
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
