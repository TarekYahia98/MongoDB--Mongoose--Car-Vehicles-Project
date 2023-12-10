import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { ReportDto } from './dtos/report.dto';
import { serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateReportDto } from './dtos/create-report.dto';
import { UserDocument } from '../schemas/user.schema';
import { AdminGuard } from '../guards/admin.guard';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto){
   return this.reportsService.createEstimate(query);
 }


  @Post('/newReport')
  @UseGuards(AuthGuard)
  @serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserDocument) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id:string, @Body() body: ApproveReportDto){
    return this.reportsService.changeApproval(id,body.approved);

  }

  @Delete('/:id')
  removeReportById(@Param('id') id:string){
    return this.reportsService.remove(id);
  }


}
