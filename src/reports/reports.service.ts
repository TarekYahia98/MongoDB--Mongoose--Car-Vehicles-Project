import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../schemas/report.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../schemas/user.schema';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>,
  ) {}

  createEstimate({ make, model, long, lat, year, mileage }: GetEstimateDto) {
    return this.reportModel.aggregate([
      {
        $match: {
          make: make,
          model: model,
          long: { $gt: long - 5, $lt: long + 5 },
          lat: { $gt: lat - 5, $lt: lat + 5 },
          year: { $gt: year - 3, $lt: year + 3 },
          mileage: { $gt: mileage - 5000, $lt: mileage + 5000 },
          approved: true,
        },
      },
      {
        $sort: { mileage: -1 },
      },
      { $limit: 3 },
      {
        $group: { _id: null, averagePrice: { $avg: '$price' } },
      },

      { $project: { _id: 0, YourCarPrice: '$averagePrice' } },
    ]);
  }

  async create(reportDto: CreateReportDto, user: User) {
    const report = await this.reportModel.create(reportDto);
    report.user = user;
    await report.save();
    return report;
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportModel.findOne({ _id: id });
    if (!report) {
      throw new NotFoundException('Report Not Found');
    }
    report.approved = approved;
    return report.save();
  }

  async remove(id: string) {
    const report = await this.reportModel.findOne({ _id: id });
    if (!report) {
      throw new NotFoundException('Report Not Found');
    }
    return this.reportModel.deleteOne({ _id: id });
  }
}
