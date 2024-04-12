import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { LessonsService } from './lessons.service';
import {
  CREATE_SECTION_LESSON,
  UPDATE_SECTION_LESSON,
} from 'src/constants/transportor-constant';
import { CreateLessonDto, UpdateLessonDto } from './dto/lessons.dto';

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @MessagePattern(CREATE_SECTION_LESSON, Transport.TCP)
  create(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.lessonsService.create(message);
  }

  @MessagePattern(UPDATE_SECTION_LESSON, Transport.TCP)
  update(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.lessonsService.updateLesson(message.id, message);
  }
}
