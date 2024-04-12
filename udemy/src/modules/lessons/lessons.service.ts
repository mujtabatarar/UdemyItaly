import { HttpStatus, Injectable } from '@nestjs/common';
import { LoggerHandler } from 'src/helpers/logger-handler';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './schema/lessons.schema';
import { Model } from 'mongoose';
import {
  ResponseData,
  ResponseHandlerInterface,
} from 'src/helpers/responseHandler';
import { errorMessage } from 'src/constants/error-message-constant';
import { CreateLessonDto, UpdateLessonDto } from './dto/lessons.dto';

@Injectable()
export class LessonsService {
  private readonly logger = new LoggerHandler(
    LessonsService.name,
  ).getInstance();

  constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson>) {}

  async create(
    createLessonDto: CreateLessonDto,
  ): Promise<ResponseHandlerInterface> {
    try {
      const createdLesson = new this.lessonModel(createLessonDto);
      const savedData = await createdLesson.save(); // Await the save operation
      return ResponseData.success(savedData);
    } catch (err) {
      this.logger.error(
        `createLesson -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findAll(): Promise<ResponseHandlerInterface> {
    try {
      const lessons = await this.lessonModel.find().exec();
      return ResponseData.success(lessons);
    } catch (err) {
      this.logger.error(
        `findAllLessons -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findOne(id: string): Promise<ResponseHandlerInterface> {
    try {
      const lesson = await this.lessonModel.findById(id).exec();
      if (!lesson) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(lesson);
    } catch (err) {
      this.logger.error(
        `findLessonById -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async updateLesson(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<ResponseHandlerInterface> {
    try {
      const { sectionIds } = updateLessonDto;

      // Using $addToSet to add new sectionsIds without duplicating
      const updatedLesson = await this.lessonModel
        .findByIdAndUpdate(id, { $addToSet: { sectionIds } }, { new: true })
        .exec();

      if (!updatedLesson) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.LESSON_NOT_FOUND,
        );
      }

      return ResponseData.success(updatedLesson);
    } catch (err) {
      this.logger.error(
        `updateLesson -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async remove(id: string): Promise<ResponseHandlerInterface> {
    try {
      const removedLesson = await this.lessonModel.findByIdAndRemove(id).exec();
      if (!removedLesson) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(removedLesson);
    } catch (err) {
      this.logger.error(
        `removeLesson -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findByIds(ids: string[]): Promise<ResponseHandlerInterface> {
    try {
      const lessonsDetail = await this.lessonModel
        .find({ _id: { $in: ids } })
        .exec();
      return ResponseData.success(lessonsDetail);
    } catch (err) {
      this.logger.error(`findByIds -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findBySectonsIds(
    sectionsIds: string[],
  ): Promise<ResponseHandlerInterface> {
    try {
      const lessonsDetail = await this.lessonModel
        .find({ sectionIds: { $in: sectionsIds } })
        .exec();
      return ResponseData.success(lessonsDetail);
    } catch (err) {
      this.logger.error(`findByIds -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }
}
