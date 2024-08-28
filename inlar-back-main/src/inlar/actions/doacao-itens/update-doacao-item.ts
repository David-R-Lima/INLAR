import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id: number;
  tipo?: number
  numItens?: number
  quantidade?: number
  valor?: number
  descricao?: string
}

@Injectable()
export class UpdateDoacaoItem {
  constructor(
    private doacaoItensRepositorio: DoacaoItensRepositorio,
) {}

  async execute(data: Request): Promise<DoacaoItem | NotFoundError | InternalError> {
    const doacaoItemExists = await this.doacaoItensRepositorio.findById(data.id);

    if (!doacaoItemExists) {
      return new NotFoundError("DoacaoItem not found");
    }

    doacaoItemExists.setDescricao(data.descricao)
    doacaoItemExists.setQuantidade(data.quantidade)
    doacaoItemExists.setValor(data.valor)
    doacaoItemExists.setNumItens(data.numItens)

    try {
        const res = await this.doacaoItensRepositorio.update(data.id, doacaoItemExists)

        return res
    } catch (error) {
    
        return new InternalError(error?.message ?? "Internal Error");
    }
  }
}
