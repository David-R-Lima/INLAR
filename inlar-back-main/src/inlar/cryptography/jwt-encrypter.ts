import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtEncrypter{
  constructor(private readonly jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '2h', // 2 horas
      secret: process.env.JWT_SECRET,
    });
  }
}
