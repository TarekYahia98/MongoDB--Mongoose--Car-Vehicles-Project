import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

// export type UserDocument = User & Document;
export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'UsersCollection' })
export class User {
  // @Prop()
  // _id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
