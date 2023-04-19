import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pets } from '@prisma/client';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';
import { PetsDto } from './dto/pets.dto';

@Injectable()
export class PetsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}
  async createAnimal(data: PetsDto, userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException('no user', HttpStatus.NOT_FOUND);
    }

    return this.prismaService.pets.create({
      data: {
        name: data.name,
        type: data.type,
        status: data.status,
        ownerId: user.id,
        // image: data.image,
        // logo: data.logo,
      },
    });
  }

  async createAnimalSecond(data: any): Promise<Pets> {
    return this.prismaService.pets.create({
      data: {
        name: data.name,
        type: data.type,
        status: data.status,
        ownerId: data.ownerId,
        // image: data.image,
        // logo: data.logo,
      },
    });
  }
}
