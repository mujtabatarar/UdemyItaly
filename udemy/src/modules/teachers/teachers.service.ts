import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto, FindByIdDto } from './dto/teachers.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teachers } from './schema/teachers.schema';
import { Model } from 'mongoose';
import { LoggerHandler } from 'src/helpers/logger-handler';
import {
  ResponseData,
  ResponseHandlerInterface,
} from 'src/helpers/responseHandler';
import { errorMessage } from 'src/constants/error-message-constant';

@Injectable()
export class TeachersService {
  private readonly logger = new LoggerHandler(
    TeachersService.name,
  ).getInstance();

  constructor(
    @InjectModel(Teachers.name) private teacherModel: Model<Teachers>,
  ) {}

  /**
   * Create a new teacher.
   * @param teacherData The data of the teacher to create.
   * @returns A Promise that resolves to a ResponseData object containing the created teacher data if successful, or an error response if an error occurs.
   */
  async create(param: CreateTeacherDto): Promise<ResponseHandlerInterface> {
    try {
      const createdTeacher = new this.teacherModel(param);
      const savedData = await createdTeacher.save();
      return ResponseData.success(savedData);
    } catch (err) {
      this.logger.error(`create -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  /**
   * Find a teacher by ID.
   * @param id The ID of the teacher to find.
   * @returns A Promise that resolves to a ResponseData object containing the teacher data if found, or an error response if not found or an error occurs.
   */
  async findById(param: FindByIdDto): Promise<ResponseHandlerInterface> {
    try {
      const teacher = await this.teacherModel
        .findById(param.id)
        .select('name email metaData')
        .exec();
      if (!teacher) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
    } catch (err) {
      this.logger.error(`findById -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }
}
