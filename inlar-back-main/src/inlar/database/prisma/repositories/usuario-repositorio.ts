import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/inlar/entities/usuario';
import { PrismaService } from '../prisma.service';
import { UsuarioMapper } from '../mappers/usuario-mapper';

@Injectable()
export class UsuarioRepositorio {
  constructor(private prisma: PrismaService) {}

  async create(usuario: Usuario): Promise<Usuario> {
    const data = UsuarioMapper.toDatabase(usuario);

    const prismaUsuario = await this.prisma.usuario.create({
      data,
    });

    return UsuarioMapper.fromDatabase(prismaUsuario);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const prismaUsuario = await this.prisma.usuario.findMany({
      where: {
        EMAIL: email,
      },
    });

    if (prismaUsuario && prismaUsuario[0]) {
      return UsuarioMapper.fromDatabase(prismaUsuario[0]);
    }

    return null;
  }
  async findByEmailAndSenha(email: string, senha: string): Promise<Usuario | null> {
    const prismaUsuario = await this.prisma.usuario.findMany({
      where: {
        SENHA: senha,
        EMAIL: email,
      },
    });

    if (prismaUsuario[0]) {
      return UsuarioMapper.fromDatabase(prismaUsuario[0]);
    }

    return null;
  }

  async update(idUsuario: number, usuario: Usuario): Promise<Usuario | null> {
    const data = UsuarioMapper.toDatabase(usuario);

    const prismaUsuario = await this.prisma.usuario.update({
      where: {
        IDUSUARIO: idUsuario,
      },
      data,
    });

    if (prismaUsuario) {
      return UsuarioMapper.fromDatabase(prismaUsuario);
    }

    return null;
  }

  async getUserById(id: number): Promise<Usuario | null> {
    const prismaUsuario = await this.prisma.usuario.findUnique({
      where: {
        IDUSUARIO: id,
      },
    });

    if (prismaUsuario) {
      return UsuarioMapper.fromDatabase(prismaUsuario);
    }
    
    return null;
  }
}
