import { Injectable } from '@nestjs/common';
import { EmpresaRepositorio } from 'src/inlar/database/prisma/repositories/empresa-repositorio';
import { Empresa } from 'src/inlar/entities/empresa';
import { AlreadyExistsError } from 'src/inlar/errors/already-exists-error';
import { InternalError } from 'src/inlar/errors/internal-error';

interface Request {
  nomefantasia: string;
  razaosocial?: string;
  cnpj?: string;
  cpf?: string
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

@Injectable()
export class CreateEmpresa {
  constructor(private empresaRepositorio: EmpresaRepositorio) {}

  async execute(data: Request): Promise<Empresa | AlreadyExistsError | InternalError> {
    const exists = await this.empresaRepositorio.findByCnpj(
      data.cnpj,
    );

    if(exists) {
      return new AlreadyExistsError("Empresa already exists");
    }

    const empresa = new Empresa({
      nomeFantasia: data.nomefantasia,
      razaoSocial: data.razaosocial,
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
    });

    try {
      const res = await this.empresaRepositorio.create(empresa);

      return res;
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error");
    }
  }
}
