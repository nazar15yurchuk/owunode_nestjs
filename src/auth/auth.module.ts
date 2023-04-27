import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { PrismaService } from "../core/orm/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { BearerStrategy } from "./bearer.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "bearer" }),
    JwtModule.register({
      secret: "Secret",
      signOptions: { expiresIn: "60000s" },
    }),
  ],
  providers: [AuthService, UsersService, PrismaService, BearerStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
