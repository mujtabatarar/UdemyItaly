import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './schema/courses.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersService } from '../teachers/teachers.service';
import { SectionsService } from '../sections/sections.service';
import { LessonsService } from '../lessons/lessons.service';
import { UsersService } from '../users/users.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { TeachersModule } from '../teachers/teachers.module';
import { UsersModule } from '../users/users.module';
import { LessonsModule } from '../lessons/lessons.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { SectionsModule } from '../sections/sections.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    TeachersModule,
    UsersModule,
    SectionsModule,
    LessonsModule,
    EnrollmentModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
