import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'UsersCollection' })
export class User {
  
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({default: true})
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
