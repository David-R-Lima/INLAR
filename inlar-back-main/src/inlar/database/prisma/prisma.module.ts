import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsuarioRepositorio } from './repositories/usuario-repositorio';
import { DoadorRepositorio } from './repositories/doador-repositorio';
import { EmpresaRepositorio } from "./repositories/empresa-repositorio";
import { DoacaoRepositorio } from './repositories/doacao-repositorio';
import { DoacaoItensRepositorio } from './repositories/doacao-itens-repositorio';
import { TipoDoacaoRepositorio } from './repositories/tipo-doacao-repositorio';
import { BeneficiarioRepositorio } from './repositories/beneficiario-repositorio';
@Module({
  providers: [PrismaService, UsuarioRepositorio, DoadorRepositorio, EmpresaRepositorio, DoacaoRepositorio, DoacaoItensRepositorio, TipoDoacaoRepositorio, BeneficiarioRepositorio],
  exports: [UsuarioRepositorio, DoadorRepositorio, EmpresaRepositorio, DoacaoRepositorio, DoacaoItensRepositorio, TipoDoacaoRepositorio, BeneficiarioRepositorio],
})
export class PrismaModule {}
