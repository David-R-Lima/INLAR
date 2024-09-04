export interface GetBeneficiarioResponse {
  idBeneficiario: number;
  nome: string;
  tipoPessoa: string;
  cpf?: string;
  rg?: string;
  genero?: string;
  dataNascimento?: string;
  cnpj?: string;
  razaoSocial?: string;
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  siglaEstado?: string;
  uf?: string;
  observacoes?: string;
  ativo: boolean;
}
