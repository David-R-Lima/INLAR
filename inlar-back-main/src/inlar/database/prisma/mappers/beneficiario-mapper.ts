import { Beneficiario } from 'src/inlar/entities/beneficiario';
import { Prisma, beneficiario as PrismaBeneficiario } from '@prisma/client';

export class BeneficiarioMapper {
  static toDatabase(
    beneficiario: Beneficiario,
  ): Prisma.beneficiarioUncheckedCreateInput {
    return {
      NOME: beneficiario.getNome(),
      DATANASC: beneficiario.getDataNascimento(),
      TIPOPESSOA: beneficiario.getTipoPessoa(),
      GENERO: beneficiario.getGenero(),
      RG: beneficiario.getRg(),
      CPF: beneficiario.getCpf(),
      CNPJ: beneficiario.getCnpj(),
      CONTATO1: beneficiario.getContato1(),
      CONTATO2: beneficiario.getContato2(),
      CEP: beneficiario.getCep(),
      LOGRADOUDO: beneficiario.getLogradouro(),
      NUMERO: beneficiario.getNumero(),
      COMPLEMENTO: beneficiario.getComplemento(),
      BAIRRO: beneficiario.getBairro(),
      CIDADE: beneficiario.getCidade(),
      SIGLAESTADO: beneficiario.getUf(),
      OBSERVACOES: beneficiario.getObservacoes(),
      DATACAD: beneficiario.getDataCadastro(),
      ATIVO: beneficiario.getAtivo(),
    };
  }

  static fromDatabase(raw: PrismaBeneficiario): Beneficiario {
    const beneficiario = new Beneficiario({
      nome: raw.NOME,
      dataNascimento: raw.DATANASC,
      tipoPessoa: raw.TIPOPESSOA,
      genero: raw.GENERO,
      rg: raw.RG,
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
      idBeneficiario: raw.IDBENEFICIARIO,
    });

    return beneficiario;
  }
}
