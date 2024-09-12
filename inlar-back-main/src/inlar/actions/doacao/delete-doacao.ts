import { Injectable } from '@nestjs/common';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoacao: number;
}

@Injectable()
export class DeleteDoacaoById {
  constructor(private doacaoRepositorio: DoacaoRepositorio) {}

  async execute(data: Request): Promise<boolean | NotFoundError | InternalError> {
    const res = await this.doacaoRepositorio.findById(data.idDoacao);

    if (!res) {
      return new NotFoundError("Doacao not found");
    }

    try {
      const doacao =  await this.doacaoRepositorio.Delete(data.idDoacao)

      return doacao
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error")
    }

  }
}
