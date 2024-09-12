import { Injectable } from '@nestjs/common';
import { BeneficiarioRepositorio } from 'src/inlar/database/prisma/repositories/beneficiario-repositorio';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoacao: number;
}

@Injectable()
export class DeletebeneficiarioById {
  constructor(private beneficiarioRepositorio: BeneficiarioRepositorio) {}

  async execute(data: Request): Promise<boolean | NotFoundError | InternalError> {
    const res = await this.beneficiarioRepositorio.findById(data.idBeneficiario);

    if (!res) {
      return new NotFoundError("Beneficiario não encontrado");
    }

    try {
      const beneficiario =  await this.beneficiarioRepositorio.Delete(data.idBeneficiario)

      return beneficiario
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error")
    }

  }
}
