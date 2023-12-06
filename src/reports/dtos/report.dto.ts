import { Expose, Transform} from "class-transformer";

export class ReportDto {
    @Expose()
    id:string;
    @Expose()
    approved:boolean;
    @Expose()
    price:number;
    @Expose()
    make:string;
    @Expose()
    model:string;
    @Expose()
    year:number;
    @Expose()
    long:number;
    @Expose()
    lat:number;
    @Expose()
    mileage:number;

    @Transform(({ obj }) => obj.user._id)
    @Expose()
    userId:string;
}