import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: any = [];

  async getAllUsers() {
    return this.users;
  }

  async createUser(userData: CreateUsersDto) {
    this.users.push(userData);
    return this.users;
  }

  async deleteUser(userId: string) {
    const user = await this.users.findIndex((item) => item.id === userId);
    this.users.splice(user, 1);
    return this.users;
  }

  async updateUser(userData: CreateUsersDto, userId: any,) {
    const user = await this.users.findIndex((item) => item.id === userId);

    this.users[user] = { ...userData };
    console.log(user);
    return this.users;
  }
}
