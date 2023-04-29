import { Injectable } from "@nestjs/common";
import { CreateUsersDto } from "./dto/users.dto";
import { PrismaService } from "../core/orm/prisma.service";
import { User } from "@prisma/client";
import { RegisterDto } from "../auth/dto/auth.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async getUserById(userId: string) {
    return await this.prismaService.user.findFirst({
      where: { id: userId },
    });
  }

  async createUserByManager(userData: CreateUsersDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        name: userData.name,
        city: userData.city,
        status: userData.status,
        age: userData.age,
        email: userData.email,
        avatar: userData.avatar,
      },
    });
  }

  async createUser(userData: RegisterDto): Promise<User> {
    const passwordHash = await this.hashPassword(userData.password);

    return await this.prismaService.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: passwordHash.toString(),
      },
    });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(userData: CreateUsersDto, userId: string) {
    return await this.prismaService.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  async findUserByEmail(userEmail: string) {
    return await this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }
}
