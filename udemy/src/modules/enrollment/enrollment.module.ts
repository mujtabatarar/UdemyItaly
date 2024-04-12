import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Enrollments, EnrollmentsSchema } from './schema/enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Enrollments.name, schema: EnrollmentsSchema },
    ]),
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
