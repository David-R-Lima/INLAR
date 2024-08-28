export interface GetDoadorResponse {
  id: number;
  nome: string;
  tipopessoa?: string;
  cpf?: string;
  cnpj?: string;
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradoudo?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  siglaestado?: string;
  observacoes?: string;
  datacad?: string;
  ativo: boolean;  
}
