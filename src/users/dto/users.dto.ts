import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({ required: true, example: "user@gmail.com" })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty()
  avatar: string;
}
