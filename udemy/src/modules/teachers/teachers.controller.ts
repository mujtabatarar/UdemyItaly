import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { TeachersService } from './teachers.service';
import { CREATE_TEACHER } from 'src/constants/transportor-constant';

@Controller()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @MessagePattern(CREATE_TEACHER, Transport.TCP)
  create(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.teachersService.create(message);
  }
}
