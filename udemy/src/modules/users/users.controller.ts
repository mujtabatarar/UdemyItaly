import { Controller, HttpStatus, Logger } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';

import { UPDATE_USER, CREATE_USER } from 'src/constants/transportor-constant';
import { LoggerHandler } from 'src/helpers/logger-handler';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new LoggerHandler(
    UsersController.name,
  ).getInstance();

  constructor(private usersService: UsersService) {}

  @MessagePattern(CREATE_USER, Transport.TCP)
  async create(@Payload() payload) {
    const message: CreateUserDto = JSON.parse(payload);
    this.logger.log(`TCP::Udemy::${CREATE_USER}::recv -> ${message}`);
    return await this.usersService.create(message);
  }

  @MessagePattern(UPDATE_USER, Transport.TCP)
  async update(@Payload() payload) {
    const message = JSON.parse(payload);
    this.logger.log(`TCP::Udemy::${UPDATE_USER}::recv -> ${message}`);
    const id: string = message?.id;
    const data: UpdateUserDto = message?.data;
    return await this.usersService.update(id, data);
  }
}
