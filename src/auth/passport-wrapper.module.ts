import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { BearerStrategy } from "./bearer.strategy";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "bearer" }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: "Secret",
        signOptions: {
          expiresIn: "24h",
        },
      }),
    }),
  ],
  providers: [BearerStrategy, UsersService, AuthService],
  exports: [PassportModule],
})
export class PassportWrapperModule {}
