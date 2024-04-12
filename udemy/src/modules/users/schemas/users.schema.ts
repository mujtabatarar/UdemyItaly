import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_STATUS, EMPLOYMENT_TYPES_ENUM } from '../enum/users.enum';
@Schema({ timestamps: true })
export class Users extends Document {
  @Prop({ required: true })
  udemyUserName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  emailId: string;

  @Prop({ required: false })
  mobileNo: string;

  @Prop({ required: false })
  dateOfBirth: Date;

  @Prop({ required: false })
  gender: string;

  @Prop({ default: EMPLOYMENT_TYPES_ENUM.OTHER })
  employementType: EMPLOYMENT_TYPES_ENUM;

  @Prop({ required: false })
  profileImageUrl: string;

  @Prop({ required: false })
  deviceId: string;

  @Prop()
  deviceName: string;

  @Prop({ required: false })
  deviceToken: string;

  @Prop()
  clientOs: string;

  @Prop()
  prefferedLanguage: string;

  @Prop()
  appVersion: string;

  @Prop()
  isOnline: boolean;

  @Prop()
  lastLogin: Date;

  @Prop({ default: USER_STATUS.ACTIVE })
  status: USER_STATUS;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
