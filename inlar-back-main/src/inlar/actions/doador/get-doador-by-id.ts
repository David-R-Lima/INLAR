import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doador } from 'src/inlar/entities/doador';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoador: number;
}

@Injectable()
export class GetDoadorById {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<Doador | NotFoundError> {
    const res = await this.doadorRepositorio.findById(data.idDoador);

    if (res) {
      return res;
    }

    return new NotFoundError("Doador not found");
  }
}
