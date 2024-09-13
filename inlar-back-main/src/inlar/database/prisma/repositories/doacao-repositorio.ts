import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Doacao } from 'src/inlar/entities/doacao';
import { DoacaoMapper } from '../mappers/doacao-mapper';

@Injectable()
export class DoacaoRepositorio {
  constructor(private prisma: PrismaService) {}

  async create(doacao: Doacao): Promise<Doacao> {
    const data = DoacaoMapper.toDatabase(doacao);

    const res = await this.prisma.doacao.create({
      data,
    });

    return DoacaoMapper.fromDatabase(res);
  }

  async update(idDoacao: number, doacao: Doacao): Promise<Doacao | null> {
    const data = DoacaoMapper.toDatabase(doacao);

    const res = await this.prisma.doacao.update({
      where: {
        IDDOACAO: idDoacao,
      },
      data,
    });

    if (res) {
      return DoacaoMapper.fromDatabase(res);
    }

    return null;
  }

  async findById(idDoacao: number): Promise<Doacao | null> {
    const prismaDoacao = await this.prisma.doacao.findUnique({
      where: {
        IDDOACAO: idDoacao,
      },
      include: {
        doacaoItens: true
      }
    });

    if (prismaDoacao) {
      return DoacaoMapper.fromDatabase(prismaDoacao);
    }

    return null;
  }

  async findMany(page: number): Promise<Doacao[]> {
    const prismaDoacao = await this.prisma.doacao.findMany({
      take: 10,
      skip: (page - 1) * 10,
      include: {
        doacaoItens: true
      }
    });

    return prismaDoacao.map(DoacaoMapper.fromDatabase);
  }

  async Delete(idDoacao: number): Promise<boolean> {
    const res = await this.prisma.doacao.delete({
      where: {
        IDDOACAO:idDoacao
      }
    })
    if( res ){
      return true
    }
    
    return false
  }
}