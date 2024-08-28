interface Props {
  descricao?: string;
  dataCadastro?: Date;
  ativo?: boolean;
  idTipoDoacao?: number;
}

export class TipoDoacao {
  private idTipoDoacao: number;
  private descricao: string;
  private dataCadastro: Date;
  private ativo: boolean;

  constructor(props: Props = {}) {
    this.descricao = props.descricao || '';
    this.dataCadastro = props.dataCadastro || new Date();
    this.ativo = props.ativo || false;
    this.idTipoDoacao = props.idTipoDoacao;
  }

  getidTipoDoacao(): number {
    return this.idTipoDoacao;
  }

  getdescricao(): string {
    return this.descricao;
  }

  setdescricao(descricao: string) {
    this.descricao = descricao;
  }

  getDataCadastro(): Date {
    return this.dataCadastro;
  }
  setDataCadastro(dataCadastro: Date) {
    this.dataCadastro = dataCadastro;
  }
  getAtivo(): boolean {
    return this.ativo;
  }
  setAtivo(ativo: boolean) {
    this.ativo = ativo;
  }
}
