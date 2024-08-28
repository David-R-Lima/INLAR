import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';

interface Request {
  page: number;
}

@Injectable()
export class GetDoacoesItensByPage {
  constructor(private doacaoItensRepositorio: DoacaoItensRepositorio) {}

  async execute(data: Request): Promise<DoacaoItem[]> {
    const res = await this.doacaoItensRepositorio.findMany(data.page);

    return res;
  }
}
