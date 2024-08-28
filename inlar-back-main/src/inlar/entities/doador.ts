interface Props {
  idDoador?: number;
  nome?: string;
  tipoPessoa?: string;
  cpf?: string;
  cnpj?: string | null;
  contato1?: string | null;
  contato2?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
  dataCadastro?: Date;
  ativo?: boolean;
}

export class Doador {
  private nome: string;
  private tipoPessoa: string;
  private cpf: string;
  private cnpj: string | null;
  private contato1: string | null;
  private contato2: string | null;
  private cep: string | null;
  private logradouro: string | null;
  private numero: string | null;
  private complemento: string | null;
  private bairro: string | null;
  private cidade: string | null;
  private uf: string | null;
  private observacoes: string | null;
  private dataCadastro: Date;
  private ativo: boolean;
  private idDoador: number;

  constructor(props: Props = {}) {
    this.nome = props.nome || '';
    this.tipoPessoa = props.tipoPessoa || '';
    this.cpf = props.cpf || '';
    this.cnpj = props.cnpj || null;
    this.contato1 = props.contato1 || null;
    this.contato2 = props.contato2 || null;
    this.cep = props.cep || null;
    this.logradouro = props.logradouro || null;
    this.numero = props.numero || null;
    this.complemento = props.complemento || null;
    this.bairro = props.bairro || null;
    this.cidade = props.cidade || null;
    this.uf = props.uf || null;
    this.observacoes = props.observacoes || null;
    this.dataCadastro = props.dataCadastro || new Date();
    this.ativo = props.ativo || false;
    this.idDoador = props.idDoador;
  }

  getIdDoador(): number {
    return this.idDoador;
  }
  getNome(): string {
    return this.nome;
  }
  setNome(nome: string) {
    this.nome = nome;
  }

  getTipoPessoa(): string {
    return this.tipoPessoa;
  }

  setTipoPessoa(tipoPessoa: string) {
    this.tipoPessoa = tipoPessoa;
  }

  getCpf(): string {
    return this.cpf;
  }
  setCpf(cpf: string | null) {
    this.cpf = cpf;
  }
  getCnpj(): string {
    return this.cnpj;
  }
  setCnpj(cnpj: string | null) {
    this.cnpj = cnpj;
  }
  getContato1(): string {
    return this.contato1;
  }
  setContato1(contato1: string | null) {
    this.contato1 = contato1;
  }
  getContato2(): string {
    return this.contato2;
  }
  setContato2(contato2: string | null) {
    this.contato2 = contato2;
  }
  getCep(): string {
    return this.cep;
  }
  setCep(cep: string | null) {
    this.cep = cep;
  }
  getLogradouro(): string {
    return this.logradouro;
  }
  setLogradouro(logradouro: string | null) {
    this.logradouro = logradouro;
  }
  getNumero(): string {
    return this.numero;
  }
  setNumero(numero: string | null) {
    this.numero = numero;
  }
  getComplemento(): string {
    return this.complemento;
  }
  setComplemento(complemento: string | null) {
    this.complemento = complemento;
  }
  getBairro(): string {
    return this.bairro;
  }
  setBairro(bairro: string | null) {
    this.bairro = bairro;
  }
  getCidade(): string {
    return this.cidade;
  }
  setCidade(cidade: string | null) {
    this.cidade = cidade;
  }
  getUf(): string {
    return this.uf;
  }
  setUf(uf?: string) {
    this.uf = uf;
  }
  getObservacoes(): string {
    return this.observacoes;
  }
  setObservacoes(observacoes: string | null) {
    this.observacoes = observacoes;
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
