import { Usuario } from 'src/inlar/entities/usuario';
import { Prisma, usuario as PrismaUsuario } from '@prisma/client';

export class UsuarioMapper {
  static toDatabase(usuario: Usuario): Prisma.usuarioUncheckedCreateInput {
    return {
      USUARIO: usuario.getUsuario(),
      SENHA: usuario.getSenha(),
      EMAIL: usuario.getEmail(),
      ROLE: usuario.getRole(),
      DATACAD: usuario.getDataCadastro(),
      ATIVO: usuario.getAtivo(),
    };
  }
  static fromDatabase(raw: PrismaUsuario): Usuario {
    const usuario = new Usuario({
      idUsuario: raw.IDUSUARIO,
      usuario: raw.USUARIO,
      senha: raw.SENHA,
      email: raw.EMAIL,
      role: raw.ROLE,
      dataCadastro: raw.DATACAD,
      ativo: raw.ATIVO,
    });

    return usuario;
  }
}
