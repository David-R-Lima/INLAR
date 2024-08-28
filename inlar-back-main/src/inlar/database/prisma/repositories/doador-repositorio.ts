import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Doador } from 'src/inlar/entities/doador';
import { DoadorMapper } from '../mappers/doador-mapper';

@Injectable()
export class DoadorRepositorio {
  constructor(private prisma: PrismaService) {}

  async create(doador: Doador): Promise<Doador> {
    const data = DoadorMapper.toDatabase(doador);

    const res = await this.prisma.doador.create({
      data,
    });

    return DoadorMapper.fromDatabase(res);
  }

  async update(idDoador: number, doador: Doador): Promise<Doador> {
    const data = DoadorMapper.toDatabase(doador);

    const res = await this.prisma.doador.update({
      where: {
        IDDOADOR: idDoador,
      },
      data,
    });

    if (res) {
      return DoadorMapper.fromDatabase(res);
    }

    return null;
  }

  async findById(idDoador: number): Promise<Doador | null> {
    const prismaDoador = await this.prisma.doador.findUnique({
      where: {
        IDDOADOR: idDoador,
      },
    });

    if (prismaDoador) {
      return DoadorMapper.fromDatabase(prismaDoador);
    }

    return null;
  }

  async findMany(page: number): Promise<Doador[]> {
    const prismaDoadores = await this.prisma.doador.findMany({
      take: 10,
      skip: (page - 1) * 10,
    });

    return prismaDoadores.map(DoadorMapper.fromDatabase);
  }

  async Delete(idDoador: number): Promise<boolean> {
    const res = await this.prisma.doador.delete({
      where: {
        IDDOADOR:idDoador
      }
    })
    if( res ){
      return true}
      
      return false
  }
}