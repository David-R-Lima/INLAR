import { Doador } from 'src/inlar/entities/doador';
import { Prisma, doador as PrismaDoador } from '@prisma/client';

export class DoadorMapper {
  static toDatabase(doador: Doador): Prisma.doadorUncheckedCreateInput {
    return {
      NOME: doador.getNome(),
      TIPOPESSOA: doador.getTipoPessoa(),
      CPF: doador.getCpf(),
      CNPJ: doador.getCnpj(),
      CONTATO1: doador.getContato1(),
      CONTATO2: doador.getContato2(),
      CEP: doador.getCep(),
      LOGRADOUDO: doador.getLogradouro(),
      NUMERO: doador.getNumero(),
      COMPLEMENTO: doador.getComplemento(),
      BAIRRO: doador.getBairro(),
      CIDADE: doador.getCidade(),
      SIGLAESTADO: doador.getUf(),
      OBSERVACOES: doador.getObservacoes(),
      DATACAD: doador.getDataCadastro(),
      ATIVO: doador.getAtivo(),
    };
  }
  static fromDatabase(raw: PrismaDoador): Doador {
    const doador = new Doador({
      nome: raw.NOME,
      tipoPessoa: raw.TIPOPESSOA,
      cpf: raw.CPF,
      cnpj: raw.CNPJ,
      contato1: raw.CONTATO1,
      contato2: raw.CONTATO2,
      cep: raw.CEP,
      logradouro: raw.LOGRADOUDO,
      numero: raw.NUMERO,
      complemento: raw.COMPLEMENTO,
      bairro: raw.BAIRRO,
      cidade: raw.CIDADE,
      uf: raw.SIGLAESTADO,
      observacoes: raw.OBSERVACOES,
      dataCadastro: raw.DATACAD,
      ativo: raw.ATIVO,
      idDoador: raw.IDDOADOR,
    });

    return doador;
  }
}
