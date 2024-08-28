import { Beneficiario } from "./beneficiario";
import { DoacaoItem } from "./doacao-itens";
import { Doador } from "./doador";
import { Usuario } from "./usuario";

interface Props {
    idDoacao?: number;
    idDoador?: number;
    idbeneficiario?: number;
    descricao?: string;
    dataCadastro?: Date;
    cep?: string | null;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    uf?: string | null;
    situacao?: string | null;
    idUsuario?: number
    doacaoItens?: DoacaoItem[] | null
}

export class Doacao {
    private descricao?: string;
    private dataCadastro?: Date;
    private cep?: string;
    private logradouro?: string;
    private numero?: string;
    private complemento?: string;
    private bairro?: string;
    private cidade?: string;
    private uf?: string;
    private situacao?: string;
    private idDoacao: number
    private idDoador: number
    private idUsuario: number
    private idbeneficiario: number
    private doacaoItens: DoacaoItem[] | null;

    constructor(props: Props = {}) {
        this.descricao = props.descricao || '';
        this.dataCadastro = props.dataCadastro || new Date();
        this.cep = props.cep || '';
        this.logradouro = props.logradouro || '';
        this.numero = props.numero || '';
        this.complemento = props.complemento || '';
        this.bairro = props.bairro || '';
        this.cidade = props.cidade || '';
        this.uf = props.uf || '';
        this.situacao = props.situacao || '';
        this.idDoacao = props.idDoacao;
        this.idDoador = props.idDoador;
        this.idbeneficiario = props.idbeneficiario;
        this.idUsuario = props.idUsuario;
        this.doacaoItens = props.doacaoItens || [];
    };

    public getIdDoacao(): number {
        return this.idDoacao;
    }

    public getIdDoador(): number {
        return this.idDoador;
    }

    public getIdBeneficiario(): number {
        return this.idbeneficiario;
    }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public getCep(): string {
        return this.cep;
    }

    public getLogradouro(): string {
        return this.logradouro;
    }

    public getNumero(): string {
        return this.numero;
    }

    public getComplemento(): string {
        return this.complemento;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public getCidade(): string {
        return this.cidade;
    }

    public getUf(): string {
        return this.uf;
    }

    public getSituacao(): string {
        return this.situacao;
    }

    public getDoacaoItens(): DoacaoItem[] | null {
        return this.doacaoItens;
    }

    public setIdDoacao(idDoacao: number) {
        this.idDoacao = idDoacao;
    }

    public setIdDoador(idDoador: number) {
        this.idDoador = idDoador;
    }

    public setIdBeneficiario(idbeneficiario: number) {
        this.idbeneficiario = idbeneficiario;
    }

    public setIdUsuario(idUsuario: number) {
        this.idUsuario = idUsuario;
    }

    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    public setDataCadastro(dataCadastro: Date) {
        this.dataCadastro = dataCadastro;
    }

    public setCep(cep: string) {
        this.cep = cep;
    }

    public setLogradouro(logradouro: string) {
        this.logradouro = logradouro;
    }

    public setNumero(numero: string) {
        this.numero = numero;
    }

    public setComplemento(complemento: string) {
        this.complemento = complemento;
    }

    public setBairro(bairro: string) {
        this.bairro = bairro;
    }

    public setCidade(cidade: string) {
        this.cidade = cidade;
    }

    public setUf(uf: string) {
        this.uf = uf;
    }

    public setSituacao(situacao: string) {
        this.situacao = situacao;
    }

    public setDoacaoItens(doacaoItens: DoacaoItem[] | null) {
        this.doacaoItens = doacaoItens;
    }
}