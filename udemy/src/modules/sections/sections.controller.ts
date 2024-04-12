import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { SectionsService } from './sections.service';
import { CREATE_COURSE_SECTION } from 'src/constants/transportor-constant';

@Controller()
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @MessagePattern(CREATE_COURSE_SECTION, Transport.TCP)
  create(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.sectionsService.create(message);
  }
}
