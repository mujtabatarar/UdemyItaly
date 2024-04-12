import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/courses.dto';
import {
  CREATE_COURSE,
  GET_ALL_COURSE_ONLY,
  GET_COURSE_ALL_DETAILS_KAFKA,
  GET_COURSE_ALL_DETAILS_REDIS,
  GET_COURSE_ALL_DETAILS_TCP,
  GET_ONE_COURSE_ONLY,
} from 'src/constants/transportor-constant';
import { transcode } from 'buffer';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern(CREATE_COURSE, Transport.TCP)
  create(@Payload() payload) {
    const message: CreateCourseDto = JSON.parse(payload);
    return this.coursesService.create(message);
  }

  @MessagePattern(GET_ALL_COURSE_ONLY, Transport.TCP)
  findAll() {
    return this.coursesService.findAll();
  }

  @MessagePattern(GET_ONE_COURSE_ONLY, Transport.TCP)
  findOne(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.coursesService.findOne(message.id);
  }

  @MessagePattern(GET_COURSE_ALL_DETAILS_TCP, Transport.TCP)
  getCourseDetailsTcp(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.coursesService.getCourseDetails(message.id);
  }

  @MessagePattern(GET_COURSE_ALL_DETAILS_KAFKA, Transport.KAFKA)
  getCourseDetailsKafka(@Payload() payload) {
    const message = JSON.parse(payload).value;
    return this.coursesService.getCourseDetails(message.id);
  }

  @MessagePattern(GET_COURSE_ALL_DETAILS_REDIS, Transport.REDIS)
  getCourseDetailsRedis(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.coursesService.getCourseDetails(message.id);
  }
}
