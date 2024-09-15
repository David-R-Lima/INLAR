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

  async update(id: number, doacao: Doacao): Promise<Doacao | null> {
    const data = DoacaoMapper.toDatabase(doacao);

    const res = await this.prisma.doacao.update({
      where: {
        IDDOACAO: id,
      },
      data,
    });

    if (res) {
      return DoacaoMapper.fromDatabase(res);
    }

    return null;
  }

  async findById(id: number): Promise<Doacao | null> {
    const prismaDoacao = await this.prisma.doacao.findUnique({
      where: {
        IDDOACAO: id,
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

  async Delete(id: number): Promise<boolean> {
    const res = await this.prisma.doacao.delete({
      where: {
        IDDOACAO:id
  }
    })
    if( res ){
      return true
    }
    
    return false
  }
}