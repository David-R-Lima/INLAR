import { Injectable } from '@nestjs/common';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { Doacao } from 'src/inlar/entities/doacao';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoacao: number;
}

@Injectable()
export class GetDoacaoById {
  constructor(private doacaoRepositorio: DoacaoRepositorio) {}

  async execute(data: Request): Promise<Doacao | NotFoundError> {
    const res = await this.doacaoRepositorio.findById(data.idDoacao);
    
    if (!res) {
      return new NotFoundError("Doacao not found");
    }

    return res;
  }
}
