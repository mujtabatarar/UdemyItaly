import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

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
  sectionIds: string[];

  @IsOptional()
  @IsString()
  metaData?: string;
}
