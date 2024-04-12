import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoggerHandler } from 'src/helpers/logger-handler';
import { ResponseHandler } from 'src/helpers/responseHandler';
import {
  CreateCourseDto,
  CreateEnrollmentDto,
  CreateLessonDto,
  CreateSectionDto,
  CreateTeacherDto,
  CreateUserDto,
  FindByIdDto,
  UpdateLessonDto,
} from './dto/udemy.dto';

@Controller('udemy')
export class AdminController {
  constructor(private adminService: AdminService) {}

  private readonly logger = new LoggerHandler(
    AdminController.name,
  ).getInstance();

  @Get('server')
  async checkServer() {
    return 'server good';
  }

  @Post('create/user')
  async createUser(@Body() params: CreateUserDto) {
    try {
      this.logger.log(`udemy/create/user -> body -> ${JSON.stringify(params)}`);
      const response = await this.adminService.createUser(params);
      return ResponseHandler(response);
    } catch (err) {
      return ResponseHandler(err);
    }
  }
  @Post('create/course')
  async createCourse(@Body() params: CreateCourseDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(params)}`);
    const response = await this.adminService.createCourse(params);
    return ResponseHandler(response);
  }
  @Post('create/section')
  async createSection(@Body() params: CreateSectionDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(params)}`);
    const response = await this.adminService.createSection(params);
    return ResponseHandler(response);
  }
  @Post('create/lesson')
  async createLesson(@Body() params: CreateLessonDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(params)}`);
    const response = await this.adminService.createLesson(params);
    return ResponseHandler(response);
  }

  @Patch('update/lesson')
  async updateLesson(
    @Body() params: UpdateLessonDto,
    @Query() idObj: { id: string },
  ) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(params)}`);
    console.log(idObj);
    const response = await this.adminService.updateLesson({
      ...params,
      id: idObj.id,
    });
    return ResponseHandler(response);
  }

  @Post('create/teacher')
  async createTeacher(@Body() params: CreateTeacherDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(params)}`);
    const response = await this.adminService.createTeacher(params);
    return ResponseHandler(response);
  }
  @Post('create/enrollment')
  async createEnrollment(@Body() params: CreateEnrollmentDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(params)}`);
    const response = await this.adminService.createEnrollment(params);
    return ResponseHandler(response);
  }

  @Get('course/full-detail/tcp')
  async getCourseAllDetailsTcp(@Query() id: FindByIdDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(id)}`);
    const response = await this.adminService.getCourseAllDetailsTcp(id);
    return ResponseHandler(response);
  }

  @Get('course/full-detail/kafka')
  async getCourseAllDetailsKAfka(@Query() id: FindByIdDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(id)}`);
    const response = await this.adminService.getCourseAllDetailsKafka(id);
    return ResponseHandler(response);
  }

  @Get('course/full-detail/redis')
  async getCourseAllDetailsRedis(@Query() id: FindByIdDto) {
    this.logger.log(`udemy/create/course -> body -> ${JSON.stringify(id)}`);
    const response = await this.adminService.getCourseAllDetailsRedis(id);
    return ResponseHandler(response);
  }
}
