import { PartialType } from "@nestjs/mapped-types";
import { createUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType (createUserDto){
    @ApiProperty({ type: String, description: "updateEmail"})
    email: string;
    
    @ApiProperty({ type: String, description: "updatePassword"})
  password: string;
}