import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { PrismaService } from "src/inlar/database/prisma/prisma.service";
import { PrismaModule } from "src/inlar/database/prisma/prisma.module";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";
import { CryptographyModule } from "src/inlar/cryptography/cryptography.module";
import { BcryptHasher } from "src/inlar/cryptography/bcrypt.hasher";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    CryptographyModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        const secret = process.env.JWT_SECRET

        return {
          secret
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,    
    BcryptHasher,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService,
  ],
})
export class AuthModule {}
