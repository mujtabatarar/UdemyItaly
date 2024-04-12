import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Lesson extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  video_url: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Section' }] })
  sectionIds: string[];

  @Prop({ required: false, type: Object, default: {} })
  metaData: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
