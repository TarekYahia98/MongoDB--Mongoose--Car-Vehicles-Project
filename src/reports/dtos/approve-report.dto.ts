import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";


export class ApproveReportDto {
    
    @IsBoolean()
    @ApiProperty({ type: Boolean, description: "approved"})
    approved: boolean;
}