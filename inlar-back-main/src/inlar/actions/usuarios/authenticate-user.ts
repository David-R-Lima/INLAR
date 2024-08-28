import { Injectable } from '@nestjs/common';
import { UsuarioRepositorio } from 'src/inlar/database/prisma/repositories/usuario-repositorio';
import { Usuario } from 'src/inlar/entities/usuario';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  email: string;
  senha: string;
}

@Injectable()
export class AuthenticateUser {
  constructor(private usuarioRepositorio: UsuarioRepositorio) {}

  async execute(data: Request): Promise<Usuario | NotFoundError> {
    const user = await this.usuarioRepositorio.findByEmailAndSenha(data.email, data.senha)

    if(user) {
        return user
    }

    return new NotFoundError("User not found")
  }
}
