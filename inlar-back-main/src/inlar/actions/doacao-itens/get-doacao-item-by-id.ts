import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id: number;
}

@Injectable()
export class GetDoacaoItemById {
  constructor(private doacaoItensRepositorio: DoacaoItensRepositorio) {}

  async execute(data: Request): Promise<DoacaoItem | NotFoundError> {
    const res = await this.doacaoItensRepositorio.findById(data.id);

    if (res) {
      return res;
    }

    return new NotFoundError("DoacaoItem not found");
  }
}
