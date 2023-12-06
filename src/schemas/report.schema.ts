import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema({ collection: 'ReportsCollection' })
export class Report {
  
    @Prop()
    id: number;
  
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
}

export const ReportSchema = SchemaFactory.createForClass(Report);