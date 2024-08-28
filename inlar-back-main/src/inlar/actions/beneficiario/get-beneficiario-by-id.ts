import { Injectable } from '@nestjs/common';
import { BeneficiarioRepositorio } from 'src/inlar/database/prisma/repositories/beneficiario-repositorio';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { Beneficiario } from 'src/inlar/entities/beneficiario';
import { Doacao } from 'src/inlar/entities/doacao';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id: number;
}

@Injectable()
export class GetBeneficiarioById {
  constructor(private beneficiarioRepositorio: BeneficiarioRepositorio) {}

  async execute(data: Request): Promise<Beneficiario | NotFoundError> {
    const res = await this.beneficiarioRepositorio.findById(data.id);
    
    if (!res) {
      return new NotFoundError("Doacao not found");
    }

    return res;
  }
}
