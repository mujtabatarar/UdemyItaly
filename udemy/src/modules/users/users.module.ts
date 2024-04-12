import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from './schemas/users.schema';
import { RedisHandler } from '../../helpers/redis-handler-with-pool';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, RedisHandler],
  exports: [UsersService],
})
export class UsersModule {}
