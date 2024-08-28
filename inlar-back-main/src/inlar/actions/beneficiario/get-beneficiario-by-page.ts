import { Injectable } from '@nestjs/common';
import { BeneficiarioRepositorio } from 'src/inlar/database/prisma/repositories/beneficiario-repositorio';
import { Beneficiario } from 'src/inlar/entities/beneficiario';

interface Request {
  page: number;
}

@Injectable()
export class GetBeneficiariosByPage {
  constructor(private beneficiarioRepositorio: BeneficiarioRepositorio) {}

  async execute(data: Request): Promise<Beneficiario[]> {
    const res = await this.beneficiarioRepositorio.findMany(data.page);

    return res;
  }
}
