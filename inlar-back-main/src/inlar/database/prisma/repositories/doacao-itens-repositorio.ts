import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { DoacaoItensMapper } from '../mappers/doacao-itens-mapper';

@Injectable()
export class DoacaoItensRepositorio {
  constructor(private prisma: PrismaService) {}

  async create(doacaoItem: DoacaoItem): Promise<DoacaoItem> {
    const data = DoacaoItensMapper.toDatabase(doacaoItem);

    const res = await this.prisma.doacaoItens.create({
      data,
    });

    return DoacaoItensMapper.fromDatabase(res);
  }

  async createMany(doacaoItem: DoacaoItem[]): Promise<boolean> {
    const data = doacaoItem.map(DoacaoItensMapper.toDatabase)
    console.log('data: ', data);

    const res = await this.prisma.doacaoItens.createMany({
      data,
    });

    console.log(res)

    if(res) {
      return true
    }

    return false
  }

  async update(idDoacaoItem: number, doacaoItem: DoacaoItem): Promise<DoacaoItem | null> {
    const data = DoacaoItensMapper.toDatabase(doacaoItem);

    const res = await this.prisma.doacaoItens.update({
      where: {
        IDITEMDOACAO: idDoacaoItem,
      },
      data,
    });

    if (res) {
      return DoacaoItensMapper.fromDatabase(res);
    }

    return null;
  }

  async findById(idDoacaoItem: number): Promise<DoacaoItem | null> {
    const prismaDoacaoItens = await this.prisma.doacaoItens.findUnique({
      where: {
        IDITEMDOACAO: idDoacaoItem,
      },
    });

    if (prismaDoacaoItens) {
      return DoacaoItensMapper.fromDatabase(prismaDoacaoItens);
    }

    return null;
  }

  async findMany(page: number): Promise<DoacaoItem[]> {
    const prismaDoacaoItens = await this.prisma.doacaoItens.findMany({
      take: 10,
      skip: (page - 1) * 10,
    });

    return prismaDoacaoItens.map(DoacaoItensMapper.fromDatabase);
  }

  async findManyByDoacaoId(idDoacao): Promise<DoacaoItem[]> {
    const prismaDoacaoItens = await this.prisma.doacaoItens.findMany({
      where: {
        FK_DOACAOITENS_DOACAO: {
          IDDOACAO: idDoacao
        }
      }
    });

    return prismaDoacaoItens.map(DoacaoItensMapper.fromDatabase);
  }

  async Delete(idDoacaoItem: number): Promise<boolean> {
    const res = await this.prisma.doacaoItens.delete({
      where: {
        IDITEMDOACAO:idDoacaoItem
      }
    })
    if( res ){
      return true
    }
    
    return false
  }
}