import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

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
