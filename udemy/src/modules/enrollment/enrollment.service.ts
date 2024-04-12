import { HttpStatus, Injectable } from '@nestjs/common';
import { LoggerHandler } from 'src/helpers/logger-handler';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollments } from './schema/enrollment.schema';
import { Model } from 'mongoose';
import {
  ResponseData,
  ResponseHandlerInterface,
} from 'src/helpers/responseHandler';
import { errorMessage } from 'src/constants/error-message-constant';
import { CreateEnrollmentDto } from './dto/enrollment.dto';

@Injectable()
export class EnrollmentService {
  private readonly logger = new LoggerHandler(
    EnrollmentService.name,
  ).getInstance();

  constructor(
    @InjectModel(Enrollments.name) private enrollmentsModel: Model<Enrollments>,
  ) {}

  async create(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<ResponseHandlerInterface> {
    try {
      const createdEnrollment = new this.enrollmentsModel(createEnrollmentDto);
      const savedData = await createdEnrollment.save();
      return ResponseData.success(savedData);
    } catch (err) {
      this.logger.error(
        `createEnrollment -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findAll(): Promise<ResponseHandlerInterface> {
    try {
      const enrollments = await this.enrollmentsModel.find().exec();
      return ResponseData.success(enrollments);
    } catch (err) {
      this.logger.error(
        `findAllEnrollments -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findOne(id: string): Promise<ResponseHandlerInterface> {
    try {
      const enrollment = await this.enrollmentsModel.findById(id).exec();
      if (!enrollment) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(enrollment);
    } catch (err) {
      this.logger.error(`findById -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findByCourseId(courseId: string): Promise<ResponseHandlerInterface> {
    try {
      const enrollment = await this.enrollmentsModel
        .find({ courseId: courseId })
        .exec();
      if (!enrollment) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(enrollment);
    } catch (err) {
      this.logger.error(`findById -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }
}
