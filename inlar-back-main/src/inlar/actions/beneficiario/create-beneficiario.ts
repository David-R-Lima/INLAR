import { Injectable } from '@nestjs/common';
import { BeneficiarioRepositorio } from 'src/inlar/database/prisma/repositories/beneficiario-repositorio';
import { Beneficiario } from 'src/inlar/entities/beneficiario';
import { InternalError } from 'src/inlar/errors/internal-error';

interface Request {
  nome: string;
  dataNasc: Date;
  tipoPessoa: string;
  genero?: string;
  cpf?: string;
  cnpj?: string | null;
  rg?: string;
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
export class CreateBeneficiario {
  constructor(private beneficiarioRepositorio: BeneficiarioRepositorio) {}

  async execute(data: Request): Promise<Beneficiario | InternalError> {
    const beneficiario = new Beneficiario({
     nome: data.nome,
     dataNascimento: data.dataNasc,
     tipoPessoa: data.tipoPessoa,
     genero: data.genero,
     cpf: data.cpf,
     cnpj: data.cnpj,
     rg: data.rg,
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
    });

    try {
      const res = await this.beneficiarioRepositorio.create(beneficiario);

      return res;
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error");
    }
  }
}
