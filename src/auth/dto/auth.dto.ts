import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
}
