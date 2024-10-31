import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Beneficiario } from 'src/inlar/entities/beneficiario';
import { BeneficiarioMapper } from '../mappers/beneficiario-mapper';

@Injectable()
export class BeneficiarioRepositorio {
  constructor(private prisma: PrismaService) {}

  async create(beneficiario: Beneficiario): Promise<Beneficiario> {
    const data = BeneficiarioMapper.toDatabase(beneficiario);

    const res = await this.prisma.beneficiario.create({
      data,
    });

    return BeneficiarioMapper.fromDatabase(res);
  }

  async update(id: number, beneficiario: Beneficiario): Promise<Beneficiario | null> {
    const data = BeneficiarioMapper.toDatabase(beneficiario);

    const res = await this.prisma.beneficiario.update({
      where: {
        IDBENEFICIARIO: id,
      },
      data,
    });

    if (res) {
      return BeneficiarioMapper.fromDatabase(res);
    }

    return null;
  }

  async findById(id: number): Promise<Beneficiario | null> {
    const prismaBeneficiario = await this.prisma.beneficiario.findUnique({
      where: {
        IDBENEFICIARIO: id,
      },

    });

    if (prismaBeneficiario) {
      return BeneficiarioMapper.fromDatabase(prismaBeneficiario);
    }

    return null;
  }

  async findMany(page: number): Promise<Beneficiario[]> {
    const prismaBeneficiario = await this.prisma.beneficiario.findMany({
      take: 10,
      skip: (page - 1) * 10,

    });

    return prismaBeneficiario.map(BeneficiarioMapper.fromDatabase);
  }

  async Delete(idBeneficiario: number): Promise<boolean> {
    const res = await this.prisma.beneficiario.delete({
      where: {
        IDBENEFICIARIO:idBeneficiario
      }
    })
    if( res ){
      return true
    }
    
    return false
  }

  async findAll() {
    const prismaBeneficiario = await this.prisma.beneficiario.findMany();
    return prismaBeneficiario.map(BeneficiarioMapper.fromDatabase);
  }
}