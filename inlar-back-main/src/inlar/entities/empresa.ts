interface Props {
  nomeFantasia?: string;
  razaoSocial?: string;
  cnpj?: string;
  contato1?: string | null;
  contato2?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  idEmpresa?: number;
}

export class Empresa {
  private idEmpresa: number;
  private nomeFantasia: string;
  private razaoSocial: string;
  private cnpj: string;
  private contato1: string | null;
  private contato2: string | null;
  private cep: string | null;
  private logradouro: string | null;
  private numero: string | null;
  private complemento: string | null;
  private bairro: string | null;
  private cidade: string | null;
  private uf: string | null;

  constructor(props: Props = {}) {
    this.nomeFantasia = props.nomeFantasia || '';
    this.razaoSocial = props.razaoSocial || '';
    this.cnpj = props.cnpj || '';
    this.contato1 = props.contato1 || null;
    this.contato2 = props.contato2 || null;
    this.cep = props.cep || null;
    this.logradouro = props.logradouro || null;
    this.numero = props.numero || null;
    this.complemento = props.complemento || null;
    this.bairro = props.bairro || null;
    this.cidade = props.cidade || null;
    this.uf = props.uf || null;
    this.idEmpresa = props.idEmpresa;
  }

  getIdEmpresa(): number {
    return this.idEmpresa;
  }

  getNomeFantasia(): string {
    return this.nomeFantasia;
  }

  setNomeFantasia(nomeFantasia: string) {
    this.nomeFantasia = nomeFantasia;
  }

  getRazaoSocial(): string {
    return this.razaoSocial;
  }
  setRazaoSocial(razaoSocial: string) {
    this.razaoSocial = razaoSocial;
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
}
