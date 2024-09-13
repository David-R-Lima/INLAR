import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptHasher } from 'src/inlar/cryptography/bcrypt.hasher';
import { JwtEncrypter } from 'src/inlar/cryptography/jwt-encrypter';
import { UsuarioRepositorio } from 'src/inlar/database/prisma/repositories/usuario-repositorio';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  email: string;
  senha: string;
}

@Injectable()
export class AuthenticateUser {
  constructor(
    private usuarioRepositorio: UsuarioRepositorio,     
    private bcryptHasher: BcryptHasher,
    private encrypter: JwtEncrypter,
  ) {}

  async execute(data: Request): Promise<string | NotFoundError | UnauthorizedException> {
    const user = await this.usuarioRepositorio.findByEmail(data.email)

    if(user) {
      const senha = user.getSenha()

      const isPasswordValid = await this.bcryptHasher.compare(
        data.senha,
        senha,
      );

      if(!isPasswordValid) {
        return new UnauthorizedException()
      }

      const accessToken = await this.encrypter.encrypt({
        sub: user.getIdUsuario(),
        role: user.getRole(),
      });

      return accessToken
    }

    return new NotFoundError("User not found")
  }
}
