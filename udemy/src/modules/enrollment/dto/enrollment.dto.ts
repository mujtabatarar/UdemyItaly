import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PaymentStatusEnum, StatusEnum } from '../enum/enrollment.enum';

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
