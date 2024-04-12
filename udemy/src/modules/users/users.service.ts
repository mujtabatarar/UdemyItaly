import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { errorMessage } from 'src/constants/error-message-constant';
import { LoggerHandler } from 'src/helpers/logger-handler';
import { ResponseData } from 'src/helpers/responseHandler';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

import { Users } from './schemas/users.schema';

@Injectable()
export class UsersService {
  private readonly logger = new LoggerHandler(UsersService.name).getInstance();
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(data: CreateUserDto): Promise<ResponseData> {
    try {
      const createdUser = new this.usersModel(data);
      await createdUser.save();
      return ResponseData.success(createdUser);
    } catch (err) {
      this.logger.error(`create -> error: ${JSON.stringify(err)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<ResponseData> {
    try {
      const params: any = data;
      const existingUser = await this.usersModel
        .findByIdAndUpdate({ _id: id }, params)
        .exec();

      if (!existingUser) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(existingUser);
    } catch (err) {
      this.logger.error(`update -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findById(id: string) {
    try {
      const userDetail = await this.usersModel.findById({ _id: id }).exec();

      if (!userDetail) {
        return ResponseData.error(
          HttpStatus.NOT_FOUND,
          errorMessage.USER_NOT_FOUND,
        );
      }
      return ResponseData.success(userDetail);
    } catch (err) {
      this.logger.error(`findById -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }

  async findByIds(ids: string[]): Promise<ResponseData> {
    try {
      const userDetails = await this.usersModel
        .find({ _id: { $in: ids } })
        .select([
          'udemyUserName',
          'firstName',
          'lastName',
          'emailId',
          'mobileNo',
          'dateOfBirth',
          'dateOfBirth',
          'gender',
          'employementType',
          'profileImageUrl',
          'deviceId',
          'deviceName',
          'deviceName',
          'deviceToken',
          'clientOs',
          'prefferedLanguage',
          'isOnline',
          'lastLogin',
          'status',
        ])
        .exec();
      return ResponseData.success(userDetails);
    } catch (err) {
      this.logger.error(`findByIds -> error: ${JSON.stringify(err.message)}`);
      return ResponseData.error(
        HttpStatus.BAD_REQUEST,
        err?.message || errorMessage.SOMETHING_WENT_WRONG,
      );
    }
  }
}
