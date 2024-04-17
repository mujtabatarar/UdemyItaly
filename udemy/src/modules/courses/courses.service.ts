import { HttpStatus, Injectable } from '@nestjs/common';
import { LoggerHandler } from 'src/helpers/logger-handler';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/courses.schema';
import { Model } from 'mongoose';
import {
  ResponseData,
  ResponseHandlerInterface,
} from 'src/helpers/responseHandler';
import { errorMessage } from 'src/constants/error-message-constant';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { TeachersService } from '../teachers/teachers.service';
import { SectionsService } from '../sections/sections.service';
import { UsersService } from '../users/users.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { LessonsService } from '../lessons/lessons.service';

@Injectable()
export class CoursesService {
  private readonly logger = new LoggerHandler(
    CoursesService.name,
  ).getInstance();

  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,

    private enrollmentService: EnrollmentService,
    private lessonService: LessonsService,
    private sectionService: SectionsService,
    private teacherService: TeachersService,
    private userService: UsersService,
  ) {}

  async create(param: CreateCourseDto): Promise<ResponseHandlerInterface> {
    try {
      const createdCourse = new this.courseModel(param);
      const savedData = await createdCourse.save();
      return ResponseData.success(savedData);
    } catch (err) {
      this.logger.error(`create -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findAll(): Promise<ResponseHandlerInterface> {
    try {
      const courses = await this.courseModel.find().exec();
      return ResponseData.success(courses);
    } catch (err) {
      this.logger.error(`findAll -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findOne(id: string): Promise<ResponseHandlerInterface> {
    try {
      const course = await this.courseModel.findById(id).exec();
      if (!course) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.COURSE_NOT_FOUND,
        );
      }
      return ResponseData.success(course);
    } catch (err) {
      this.logger.error(`findById -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<ResponseHandlerInterface> {
    try {
      const updatedCourse = await this.courseModel
        .findByIdAndUpdate(id, updateCourseDto, { new: true })
        .exec();
      if (!updatedCourse) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.COURSE_NOT_FOUND,
        );
      }
      return ResponseData.success(updatedCourse);
    } catch (err) {
      this.logger.error(`update -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async remove(id: string): Promise<ResponseHandlerInterface> {
    try {
      const removedCourse = await this.courseModel.findByIdAndRemove(id).exec();
      if (!removedCourse) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.COURSE_NOT_FOUND,
        );
      }
      return ResponseData.success(removedCourse);
    } catch (err) {
      this.logger.error(`remove -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async getCourseDetails(courseId: string): Promise<ResponseHandlerInterface> {
    try {
      const course = await this.courseModel.findById(courseId).exec();

      if (!course) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.COURSE_NOT_FOUND,
        );
      }
      const teacher = await this.teacherService.findById({
        id: course.teacherId,
      });
      let sections = await this.sectionService.findSectionByCourseId(
        course?._id,
      );

      let courseSectionsIds =
        sections?.data?.map((section) => section._id) || [];

      const lessons = await this.lessonService.findBySectonsIds(
        courseSectionsIds,
      );

      const enrollment = await this.enrollmentService.findByCourseId(
        course?.id,
      );

      let userIds = enrollment?.data?.flatMap((row) => row.userId) || [];

      const users = await this.userService.findByIds(userIds);
      // let newArray = sections?.data?.forEach((section) => {
      //   section.pppp = '121';
      // });

      let newSections: any = [];
      sections?.data?.map((section: any) => {
        let sectionLessons = lessons?.data?.filter((lesson: any) => {
          if (lesson.sectionIds.includes(section._id)) {
            delete lesson.sectionIds;
            return lesson;
          }
        });
        delete section.courseIds;
        newSections.push({ ...section.toObject(), lessons: sectionLessons });
      });

      const responseObject = {
        ...course.toObject(),
        teacher: teacher?.data,
        sections: newSections,
        users: users,
      };
      return ResponseData.success(responseObject);
    } catch (err) {
      this.logger.error(
        `getCourseDetails -> error: ${JSON.stringify(err.message)}`,
      );
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }
}
