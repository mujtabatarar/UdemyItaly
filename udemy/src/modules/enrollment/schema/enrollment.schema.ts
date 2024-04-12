// enrollments.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentStatusEnum, StatusEnum } from '../enum/enrollment.enum';

@Schema({ timestamps: true })
export class Enrollments extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Courses', required: true })
  courseId: string;

  @Prop({ required: true })
  expiryDate: Date;

  // we can have an object to store payment dettails like id, type, method.
  @Prop({ required: false, type: Object, default: {} })
  paymentDetails: any;

  @Prop({ default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @Prop({ default: PaymentStatusEnum.NOTAPPLIED })
  paymentStatus: PaymentStatusEnum;

  @Prop({ required: false })
  subscriptionId: string;

  @Prop({ required: false })
  couponCode: string;

  @Prop({ type: Object, default: {} })
  userProgress: any;
}

export const EnrollmentsSchema = SchemaFactory.createForClass(Enrollments);
