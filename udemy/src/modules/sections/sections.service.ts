import { HttpStatus, Injectable } from '@nestjs/common';
import { LoggerHandler } from 'src/helpers/logger-handler';
import { InjectModel } from '@nestjs/mongoose';
import { Section } from './schema/section.schema';
import { Model } from 'mongoose';
import {
  ResponseData,
  ResponseHandlerInterface,
} from 'src/helpers/responseHandler';
import { errorMessage } from 'src/constants/error-message-constant';
import { CreateSectionDto, UpdateSectionDto } from './dto/sections.dto';

@Injectable()
export class SectionsService {
  private readonly logger = new LoggerHandler(
    SectionsService.name,
  ).getInstance();

  constructor(
    @InjectModel(Section.name) private sectionModel: Model<Section>,
  ) {}

  async create(
    createSectionDto: CreateSectionDto,
  ): Promise<ResponseHandlerInterface> {
    try {
      const createdSection = new this.sectionModel(createSectionDto);
      const savedData = await createdSection.save();
      return ResponseData.success(savedData);
    } catch (err) {
      this.logger.error(
        `createSection -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findAllSections(): Promise<ResponseHandlerInterface> {
    try {
      const sections = await this.sectionModel.find().exec();
      return ResponseData.success(sections);
    } catch (err) {
      this.logger.error(
        `findAllSections -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findSectionById(id: string): Promise<ResponseHandlerInterface> {
    try {
      const section = await this.sectionModel.findById(id).exec();
      if (!section) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(section);
    } catch (err) {
      this.logger.error(
        `findSectionById -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async updateSection(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<ResponseHandlerInterface> {
    try {
      const { courseIds } = updateSectionDto;

      // Using $addToSet to add new courseIds without duplicating
      const updatedSection = await this.sectionModel
        .findByIdAndUpdate(id, { $addToSet: { courseIds } }, { new: true })
        .exec();

      if (!updatedSection) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }

      return ResponseData.success(updatedSection);
    } catch (err) {
      this.logger.error(
        `updateSection -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async removeSection(id: string): Promise<ResponseHandlerInterface> {
    try {
      const removedSection = await this.sectionModel
        .findByIdAndRemove(id)
        .exec();
      if (!removedSection) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(removedSection);
    } catch (err) {
      this.logger.error(
        `removeSection -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findByIds(ids: string[]): Promise<ResponseHandlerInterface> {
    try {
      const sectionsDetail = await this.sectionModel
        .find({ _id: { $in: ids } })
        .exec();
      return ResponseData.success(sectionsDetail);
    } catch (err) {
      this.logger.error(`findByIds -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findSectionByCourseId(
    courseId: string,
  ): Promise<ResponseHandlerInterface> {
    try {
      const section = await this.sectionModel
        .find({ courseIds: courseId })
        .exec();
      if (!section) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(section);
    } catch (err) {
      this.logger.error(
        `findSectionById -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }
}
