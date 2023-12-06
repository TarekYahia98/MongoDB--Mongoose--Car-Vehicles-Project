import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report, ReportSchema } from '../schemas/report.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }])],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
