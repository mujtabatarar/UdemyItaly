import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

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
