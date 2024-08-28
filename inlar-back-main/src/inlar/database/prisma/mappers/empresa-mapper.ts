import { Empresa } from 'src/inlar/entities/empresa';
import { Prisma, empresa as PrismaEmpresa } from '@prisma/client';

export class EmpresaMapper {
  static toDatabase(empresa: Empresa): Prisma.empresaUncheckedCreateInput {
    return {
      NOMEFANTASIA: empresa.getNomeFantasia(),
      RAZAOSOCIAL: empresa.getRazaoSocial(),
      CNPJ: empresa.getCnpj(),
      CONTATO1: empresa.getContato1(),
      CONTATO2: empresa.getContato2(),
      CEP: empresa.getCep(),
      LOGRADOURO: empresa.getLogradouro(),
      NUMERO: empresa.getNumero(),
      COMPLEMENTO: empresa.getComplemento(),
      BAIRRO: empresa.getBairro(),
      CIDADE: empresa.getCidade(),
      SIGLAESTADO: empresa.getUf(),
    };
  }

  static fromDatabase(raw: PrismaEmpresa): Empresa {
    const empresa = new Empresa({
      idEmpresa: raw.IDEMPRESA,
      nomeFantasia: raw.NOMEFANTASIA,
      razaoSocial: raw.RAZAOSOCIAL,
      cnpj: raw.CNPJ,
      contato1: raw.CONTATO1,
      contato2: raw.CONTATO2,
      cep: raw.CEP,
      logradouro: raw.LOGRADOURO,
      numero: raw.NUMERO,
      complemento: raw.COMPLEMENTO,
      bairro: raw.BAIRRO,
      cidade: raw.CIDADE,
      uf: raw.SIGLAESTADO,
    });

    return empresa;
  }
}
