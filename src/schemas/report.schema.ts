import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ collection: 'ReportsCollection' })
export class Report {
  @Prop({ default: false })
  approved: boolean;

  @Prop()
  price: number;

  @Prop()
  make: string;

  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  long: number; //longitude

  @Prop()
  lat: number; //latitude

  @Prop()
  mileage: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}
export const ReportSchema = SchemaFactory.createForClass(Report);
