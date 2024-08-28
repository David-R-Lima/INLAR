import { Injectable } from '@nestjs/common';
import { TipoDoacaoRepositorio } from 'src/inlar/database/prisma/repositories/tipo-doacao-repositorio';
import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';

@Injectable()
export class GetAllTipoDoacao {
  constructor(private tipoDoacaoRepositorio: TipoDoacaoRepositorio) {}

  async execute(): Promise<TipoDoacao[]> {
    const res = await this.tipoDoacaoRepositorio.findAll();

    return res;
  }
}
