export interface GetDoacaoResponse {
    iddoacao: number;
    descricao: string;
    situacao: string;
    datacad: Date;
    iddoador?: number;
    idbeneficiario?: number;
    idusuario: number;
    itens: DoacaoItemResponse[];
  }
  
  export interface DoacaoItemResponse {
    iditemdoacao: number;
    descricao: string;
    qtde: number;
    valormonetario?: number;
  }
  