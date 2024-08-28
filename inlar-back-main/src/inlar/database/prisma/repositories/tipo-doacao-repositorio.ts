import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';
import { TipoDoacaoMapper } from '../mappers/tipoDoacao-mapper';
import { async } from 'rxjs';
import { number, boolean } from 'zod';

@Injectable()
export class TipoDoacaoRepositorio {
  constructor(private prisma: PrismaService) {}

  async create(doacao: TipoDoacao): Promise<TipoDoacao> {
    const data = TipoDoacaoMapper.toDatabase(doacao);

    const res = await this.prisma.tipodoacao.create({
      data,
    });

    return TipoDoacaoMapper.fromDatabase(res);
  }

  async update(id: number, tipoDoacao: TipoDoacao): Promise<TipoDoacao | null> {
    const data = TipoDoacaoMapper.toDatabase(tipoDoacao);

    const res = await this.prisma.tipodoacao.update({
      where: {
        IDTIPODOACAO: id,
      },
      data,
    });

    if (res) {
      return TipoDoacaoMapper.fromDatabase(res);
    }

    return null;
  }

  async findById(id: number): Promise<TipoDoacao | null> {
    const prismaTipoDoacao = await this.prisma.tipodoacao.findUnique({
      where: {
        IDTIPODOACAO: id,
      },
    });

    if (prismaTipoDoacao) {
      return TipoDoacaoMapper.fromDatabase(prismaTipoDoacao);
    }

    return null;
  }

  async findAll(): Promise<TipoDoacao[]> {
    const prismaTipoDoacao = await this.prisma.tipodoacao.findMany();

    return prismaTipoDoacao.map(TipoDoacaoMapper.fromDatabase);
  }


  async findMany(page: number): Promise<TipoDoacao[]> {
    const prismaTipoDoacao = await this.prisma.tipodoacao.findMany({
      take: 10,
      skip: (page - 1) * 10,
    });

    return prismaTipoDoacao.map(TipoDoacaoMapper.fromDatabase);
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.prisma.tipodoacao.delete({
      where: {
        IDTIPODOACAO: id
      }
    })
    if( res ){
      return true
    }
    
    return false
  }
}