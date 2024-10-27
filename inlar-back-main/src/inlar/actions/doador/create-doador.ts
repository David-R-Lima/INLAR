import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doador } from 'src/inlar/entities/doador';
import { InternalError } from 'src/inlar/errors/internal-error';

interface Request {
  nome: string;
  tipoPessoa: string;
  genero?: string;
  cpf?: string;
  cnpj?: string | null;
  contato1?: string | null;
  contato2?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
}

@Injectable()
export class CreateDoador {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<Doador | InternalError> {
    const doador = new Doador({
      nome: data.nome,
      tipoPessoa: data.tipoPessoa,
      genero: data.genero,
      cpf: data.cpf,
      cnpj: data.cnpj,
      contato1: data.contato1,
      contato2: data.contato2,
      cep: data.cep,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
      observacoes: data.observacoes,
      dataCadastro: new Date(),
      ativo: true,
    });

    try {
      const res = await this.doadorRepositorio.create(doador);

      return res;
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error");
    }
  }
}
