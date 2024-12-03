import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoacao: number;
}

@Injectable()
export class DeleteDoacaoById {
  constructor(private doacaoRepositorio: DoacaoRepositorio, private doacaoItensRepositorio: DoacaoItensRepositorio) {}

  async execute(data: Request): Promise<boolean | NotFoundError | InternalError> {
    const res = await this.doacaoRepositorio.findById(data.idDoacao);


    if (!res) {
      return new NotFoundError("Doacao not found");
    }

    try {

      await this.doacaoItensRepositorio.DeleteMany(data.idDoacao)
      
      const doacao =  await this.doacaoRepositorio.Delete(data.idDoacao)

      return doacao
    } catch (error) {
      console.log(error)
      return new InternalError(error?.message ?? "Internal Error")
    }

  }
}
