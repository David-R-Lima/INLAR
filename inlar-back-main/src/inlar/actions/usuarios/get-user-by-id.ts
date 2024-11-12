import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepositorio } from 'src/inlar/database/prisma/repositories/usuario-repositorio';
import { Usuario } from 'src/inlar/entities/usuario';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
    id: number
}

@Injectable()
export class GetUserById {
  constructor(
    private usuarioRepositorio: UsuarioRepositorio,     
  ) {}

  async execute(data: Request): Promise<Usuario | NotFoundError | UnauthorizedException> {
    const user = await this.usuarioRepositorio.getUserById(data.id)

    if(user) {
        return user

    }

    return new NotFoundError("User not found")
  }
}
