import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';

require('dotenv').config();

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { SectionsModule } from './modules/sections/sections.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { LessonsModule } from './modules/lessons/lessons.module';

// console.log("in app module", `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`);
console.log(
  'in app module',
  `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
);

@Module({
  imports: [
    // MongooseModule.forRoot(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
      {
        // mongodb://localhost:27017
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'udemy-service',
        level: 'debug',
        formatters: {
          level: (label) => {
            return { level: label };
          },
        },
      },
    }),
    UsersModule,
    CoursesModule,
    SectionsModule,
    LessonsModule,
    TeachersModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
