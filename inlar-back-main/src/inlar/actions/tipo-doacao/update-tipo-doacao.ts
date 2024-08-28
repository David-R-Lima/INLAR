import { Injectable } from '@nestjs/common';
import { TipoDoacaoRepositorio } from 'src/inlar/database/prisma/repositories/tipo-doacao-repositorio';
import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
    id: number
    descricao?: string
    ativo?: boolean
}

@Injectable()
export class UpdatetipoDoacao {
  constructor(private tipoDoacaoRepositorio: TipoDoacaoRepositorio) {}

  async execute(data: Request): Promise<TipoDoacao | NotFoundError | InternalError> {
    const res = await this.tipoDoacaoRepositorio.findById(data.id);

    if(!res) {
        return new NotFoundError("Tipo doacao not found")
    }

    res.setdescricao(data.descricao)
    res.setAtivo(data.ativo)

    try {
        await this.tipoDoacaoRepositorio.update(data.id, res)
    } catch (error) {
        return new InternalError(error?.message ?? "Internal Error")
    }
  }
}
