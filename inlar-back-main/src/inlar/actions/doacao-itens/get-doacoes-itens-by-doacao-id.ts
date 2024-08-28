import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoacao: number;
}

@Injectable()
export class GetDoacoesItensByDoacaoId {
  constructor(
    private doacaoItensRepositorio: DoacaoItensRepositorio,
    private doacaoRepositorio: DoacaoRepositorio,
  ) {}

  async execute(data: Request): Promise<DoacaoItem[] | NotFoundError> {
    const doacao = await this.doacaoRepositorio.findById(data.idDoacao);

    if (!doacao) {
      return new NotFoundError("Doacao not found");
    }

    const res = await this.doacaoItensRepositorio.findManyByDoacaoId(data.idDoacao);

    return res
  }
}
