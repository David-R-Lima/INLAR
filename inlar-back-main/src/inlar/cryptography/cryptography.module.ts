import { Module } from "@nestjs/common";
import { BcryptHasher } from "./bcrypt.hasher";
import { JwtEncrypter } from "./jwt-encrypter";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [
    JwtService,
    BcryptHasher,
    JwtEncrypter
  ],
  exports: [BcryptHasher, JwtEncrypter],
})
export class CryptographyModule {}
