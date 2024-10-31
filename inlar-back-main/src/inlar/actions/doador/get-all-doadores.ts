import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doador } from 'src/inlar/entities/doador';

@Injectable()
export class GetAllDoadores {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(): Promise<Doador[]> {
    const res = await this.doadorRepositorio.findAll();

    return res
  }
}
