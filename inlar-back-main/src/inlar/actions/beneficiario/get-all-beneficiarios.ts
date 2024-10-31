import { Injectable } from '@nestjs/common';
import { BeneficiarioRepositorio } from 'src/inlar/database/prisma/repositories/beneficiario-repositorio';
import { Beneficiario } from 'src/inlar/entities/beneficiario';

@Injectable()
export class GetAllBeneficiarios {
  constructor(private beneficiarioRepositorio: BeneficiarioRepositorio) {}

  async execute(): Promise<Beneficiario[]> {
    const res = await this.beneficiarioRepositorio.findAll();

    return res
  }
}
