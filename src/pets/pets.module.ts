import { forwardRef, Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../core/orm/prisma.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [PetsController],
  providers: [PetsService, UsersService, PrismaService],
})
export class PetsModule {}
