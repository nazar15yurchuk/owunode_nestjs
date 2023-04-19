import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUsersDto } from "./dto/users.dto";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "../core/file-upload/file.upload";
import { PetsService } from "../pets/pets.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { PetsDto } from "../pets/dto/pets.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly petsService: PetsService
  ) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.userService.getAllUsers());
  }

  @Get("/:userId")
  async getUsersById(
    @Req() req: any,
    @Res() res: any,
    @Param("userId") userId: string
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./public",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async createUser(
    @Req() req: any,
    @Body() body: CreateUsersDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @Delete("/:userId")
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param("userId") userId: string
  ) {
    return res.status(204).json(await this.userService.deleteUser(userId));
  }

  @Patch("/:userId")
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Param("userId") userId: string,
    @Body() userData: CreateUsersDto
  ) {
    return res
      .status(201)
      .json(await this.userService.updateUser(userData, userId));
  }

  @Post("/animals/:userId")
  async addNewPet(
    @Req() req: any,
    @Res() res: any,
    @Body() body: PetsDto,
    @Param("userId") userId: string
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(`User with ${userId} not found`);
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createAnimal(body, userId));
  }
}
