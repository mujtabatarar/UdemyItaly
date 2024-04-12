import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { EnrollmentService } from './enrollment.service';
import { ENROLL_USER } from 'src/constants/transportor-constant';

@Controller()
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @MessagePattern(ENROLL_USER, Transport.TCP)
  create(@Payload() payload) {
    const message = JSON.parse(payload);
    return this.enrollmentService.create(message);
  }
}
