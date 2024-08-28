import { Injectable } from '@nestjs/common';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { Doacao } from 'src/inlar/entities/doacao';

interface Request {
  page: number;
}

@Injectable()
export class GetDoacaoByPage {
  constructor(private doacaoRepositorio: DoacaoRepositorio) {}

  async execute(data: Request): Promise<Doacao[] | null> {
    const res = await this.doacaoRepositorio.findMany(data.page);

    if (res) {
      return res;
    }

    return null;
  }
}