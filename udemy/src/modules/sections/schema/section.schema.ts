import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Section extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courseIds: string[];

  @Prop({ type: Object, default: {} })
  metaData: any;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
