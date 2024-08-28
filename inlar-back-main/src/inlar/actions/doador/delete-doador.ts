import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoador: number;
}

@Injectable()
export class DeleteDoadorById {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<boolean | NotFoundError | InternalError> {
    const res = await this.doadorRepositorio.findById(data.idDoador);

    if (!res) {
      return new NotFoundError("Doador not found");
    }

    try {
      const doador =  await this.doadorRepositorio.Delete(data.idDoador)

      return doador
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error")
    }

  }
}
