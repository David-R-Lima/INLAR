export interface GetDoacaoResponse {
    idDoacao: number;
    idDoador?: number;
    idBeneficiario?: number;
    descricao: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    siglaestado?: string;
    situacao: string;
    ativo?: boolean;
    data: Date;
}