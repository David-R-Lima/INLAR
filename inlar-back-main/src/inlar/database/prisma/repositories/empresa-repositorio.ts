import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Empresa } from '../../../entities/empresa'
import { EmpresaMapper } from '../mappers/empresa-mapper';

@Injectable()
export class EmpresaRepositorio {
  constructor(private prisma: PrismaService) {}

  async create(empresa: Empresa): Promise<Empresa> {
    const data = EmpresaMapper.toDatabase(empresa);

    const res = await this.prisma.empresa.create({
      data,
    });

    return EmpresaMapper.fromDatabase(res);
  }

  async update(idEmpresa: number, empresa: Empresa): Promise<Empresa | null> {
    const data = EmpresaMapper.toDatabase(empresa);

    const res = await this.prisma.empresa.update({
      where: {
        IDEMPRESA: idEmpresa,
      },
      data,
    });

    if (res) {
      return EmpresaMapper.fromDatabase(res);
    }

    return null;
  }

  async findById(idEmpresa: number): Promise<Empresa | null> {
    const prismaEmpresa = await this.prisma.empresa.findUnique({
      where: {
        IDEMPRESA: idEmpresa,
      },
    });

    if (prismaEmpresa) {
      return EmpresaMapper.fromDatabase(prismaEmpresa);
    }

    return null;
  }

  async findMany(page: number): Promise<Empresa[]> {
    const prismaEmpresa = await this.prisma.empresa.findMany({
      take: 10,
      skip: (page - 1) * 10,
    });

    return prismaEmpresa.map(EmpresaMapper.fromDatabase);
  }

  async delete(idEmpresa: number): Promise<boolean> {
    const res = await this.prisma.empresa.delete({
      where: {
        IDEMPRESA:idEmpresa
      }
    })
    if( res ){
      return true
    }
    
    return false
  }

  async findByCnpj(cnpj: string): Promise<Empresa | null> {
    const prismaEmpresa = await this.prisma.empresa.findMany({
      where: {
        CNPJ: cnpj,
      },
    });

    if (prismaEmpresa && prismaEmpresa[0]) {
      return EmpresaMapper.fromDatabase(prismaEmpresa[0]);
    }

    return null;
  }
}