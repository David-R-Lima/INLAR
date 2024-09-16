import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
    iditemdoacao: number;
}

@Injectable()
export class DeleteDoacaoItensById {
  constructor(private doacaoitensRepositorio: DoacaoItensRepositorio) {}

  async execute(data: Request): Promise<boolean | NotFoundError | InternalError> {
    const res = await this.doacaoitensRepositorio.findById(data.iditemdoacao);

    if (!res) {
      return new NotFoundError("Doacao not found");
    }

    try {
      const doacaoitens =  await this.doacaoitensRepositorio.Delete(data.iditemdoacao)

      return doacaoitens
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error")
    }

  }
}
