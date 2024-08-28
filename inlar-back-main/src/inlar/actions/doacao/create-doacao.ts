import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { TipoDoacaoRepositorio } from 'src/inlar/database/prisma/repositories/tipo-doacao-repositorio';
import { Doacao } from 'src/inlar/entities/doacao';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id_usuario: number;
  id_doador?: number
  descricao: string;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
  itens: {
    tipo: number
    numItens?: number
    quantidade?: number
    valor?: number
    descricao?: string
  }[]
}

@Injectable()
export class CreateDoacao {
  constructor(
    private doacaoRepositorio: DoacaoRepositorio,
    private doacaoItemRepositorio: DoacaoItensRepositorio,
    private doadorRepositorio: DoadorRepositorio,
  ) {}

  async execute(data: Request): Promise<Doacao | NotFoundError | InternalError> {
    if(data.id_doador) {
      const doador = await this.doadorRepositorio.findById(data.id_doador)

      if(!doador) {
        return new NotFoundError("Doador not found")
      }
    }
    const doacao = new Doacao({
      idUsuario: data.id_usuario,
      idDoador: data.id_doador,
      descricao: data.descricao,
      cep: data.cep,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
      dataCadastro: new Date(),
      situacao: "S",
    });

    let doacaoItens: DoacaoItem[] = [] 
    let createdDoacao: Doacao

    try {
        createdDoacao = await this.doacaoRepositorio.create(doacao);
    } catch (error) {
        return new InternalError(error?.message ?? "Internal Error")
    }

    data.itens.map((item) => {
        doacaoItens.push(new DoacaoItem({
            idDoacao: createdDoacao.getIdDoacao(),
            idTipoDoacao: item.tipo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            valor: item.valor,
            numItens: item.numItens,
            dataCadastro: new Date(),
        }))
    })

    try {
        await this.doacaoItemRepositorio.createMany(doacaoItens);
    } catch (error) { 
        return new InternalError(error?.message ?? "Internal Error")
    }

    return createdDoacao
  }
}
