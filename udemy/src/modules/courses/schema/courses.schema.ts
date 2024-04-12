import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  teacherId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Object, default: {} })
  metaData: any;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
