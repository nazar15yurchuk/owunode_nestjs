import { Injectable } from "@nestjs/common";
import { CreateUsersDto } from "./dto/users.dto";
import { PrismaService } from "../core/orm/prisma.service";
import { User } from "@prisma/client";


@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async getUserById(userId: string) {
    return await this.prismaService.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        age: true,
        email: true,
      },
    });
  }

  async createUser(userData: CreateUsersDto): Promise<User> {
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
}
