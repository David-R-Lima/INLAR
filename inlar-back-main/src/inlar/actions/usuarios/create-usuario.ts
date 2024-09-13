import { Injectable } from '@nestjs/common';
import { BcryptHasher } from 'src/inlar/cryptography/bcrypt.hasher';
import { UsuarioRepositorio } from 'src/inlar/database/prisma/repositories/usuario-repositorio';
import { Usuario } from 'src/inlar/entities/usuario';
import { AlreadyExistsError } from 'src/inlar/errors/already-exists-error';
import { InternalError } from 'src/inlar/errors/internal-error';

interface Request {
  usuario: string;
  email: string;
  senha: string;
}

@Injectable()
export class CreateUsuario {
  constructor(private usuarioRepositorio: UsuarioRepositorio,  private bcryptHasher: BcryptHasher,) {}

  async execute(data: Request): Promise<Usuario | AlreadyExistsError | InternalError> {
    const exists = await this.usuarioRepositorio.findByEmail(
      data.email,
    );

    if (exists) {
      return new AlreadyExistsError("Usuario already exists");
    }

    const hashedSenha = await this.bcryptHasher.hash(data.senha);
    
    const usuario = new Usuario({
      usuario: data.usuario,
      email: data.email,
      senha: hashedSenha,
      role: 'U',
      dataCadastro: new Date(),
      ativo: true,
    });

    try {
      const res = await this.usuarioRepositorio.create(usuario);

      return res;
    } catch (error) {
      console.log('error: ', error);
      return new InternalError(error?.message ?? "Internal Error");
    }
  }
}
