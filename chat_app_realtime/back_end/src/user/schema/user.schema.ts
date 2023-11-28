import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type USerDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: null })
  refreshToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
