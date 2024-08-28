import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doador } from 'src/inlar/entities/doador';

interface Request {
  page: number;
}

@Injectable()
export class GetDoadoresByPage {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<Doador[]> {
    const res = await this.doadorRepositorio.findMany(data.page);

    return res
  }
}
