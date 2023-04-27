import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { UsersModule } from "./users/users.module";
import { PetsModule } from "./pets/pets.module";
import { PrismaService } from "./core/orm/prisma.service";
import { PetsService } from "./pets/pets.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./core/orm/prisma.module";
import { PassportWrapperModule } from "./auth/passport-wrapper.module";

@Module({
  imports: [
    UsersModule,
    PetsModule,
    AuthModule,
    PrismaModule,
    PassportWrapperModule,
    // ServeStaticModule.forRoot({
    //   rootPath:join(__dirname, '..', 'public')
    // })
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService, PetsService],
})
export class AppModule {}
