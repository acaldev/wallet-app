import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { transformSchema } from 'src/core/utils';

export type UserDocument = User & Document;

const reqStr = { required: true, type: String };

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;
  @Prop(reqStr)
  username: string;
  @Prop(reqStr)
  firstName: string;
  @Prop(reqStr)
  lastName: string;
  @Prop(reqStr)
  email: string;
  @Prop(reqStr)
  password: string;
}

export const UserSchema = transformSchema(SchemaFactory.createForClass(User));
