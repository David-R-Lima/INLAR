import { Injectable } from '@nestjs/common';
import { TipoDoacaoRepositorio } from 'src/inlar/database/prisma/repositories/tipo-doacao-repositorio';
import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
    id: number
}

@Injectable()
export class GetTipoDoacaoById {
  constructor(private tipoDoacaoRepositorio: TipoDoacaoRepositorio) {}

  async execute(data: Request): Promise<TipoDoacao | NotFoundError> {
    const res = await this.tipoDoacaoRepositorio.findById(data.id);

    if(res) {
        return res;
    }

    return new NotFoundError("Tipo doacao not found")
  }
}
