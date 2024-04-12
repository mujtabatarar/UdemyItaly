import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teachers, TeachersSchema } from './schema/teachers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teachers.name, schema: TeachersSchema },
    ]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
