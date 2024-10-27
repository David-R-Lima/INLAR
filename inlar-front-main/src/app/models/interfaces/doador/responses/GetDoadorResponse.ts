export interface GetDoadorResponse {
  idDoador: number;
  nome: string;
  tipoPessoa?: string;
  cpf?: string;
  cnpj?: string;
  genero?: string;
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  siglaEstado?:string;
  uf?: string;
  observacoes?: string;
  datacad?: string;
  ativo: boolean;  
}
