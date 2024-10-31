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
    dataCadastro: Date;
    doacaoItens: DoacaoItens[]
}

export interface DoacaoItens {
    idDoacaoitem: number
    idDoacao: number
    idTipoDoacao: number
    numItems: number
    descricao?: string
    quantidade?: number
    valorMonetario?: number
    dataCadastro?: Date
}