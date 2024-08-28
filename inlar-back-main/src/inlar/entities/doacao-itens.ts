
import { Doacao } from "./doacao";
import { TipoDoacao } from "./tipoDoacao";

interface Props {
    idDoacaoItem?: number;
    idDoacao?: number;
    idTipoDoacao?: number;
    numItens?: number;
    descricao?: string;
    quantidade?: number;
    valor?: number;
    dataCadastro?: Date;
}

export class DoacaoItem {
    private idDoacaoItem?: number
    private idDoacao?: number
    private idTipoDoacao?: number
    private numItens?: number
    private descricao?: string
    private quantidade?: number
    private valor?: number
    private dataCadastro?: Date

    constructor(props: Props = {}) {
        this.idDoacaoItem = props.idDoacaoItem;
        this.idDoacao = props.idDoacao;
        this.idTipoDoacao = props.idTipoDoacao;
        this.numItens = props.numItens;
        this.descricao = props.descricao;
        this.quantidade = props.quantidade;
        this.valor = props.valor;
        this.dataCadastro = props.dataCadastro;
    }

    getIdDoacaoItem(): number {
        return this.idDoacaoItem;
    }

    getIdDoacao(): number {
        return this.idDoacao;
    }

    getIdTipoDoacao(): number {
        return this.idTipoDoacao;
    }

    getNumItens(): number {
        return this.numItens;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getQuantidade(): number {
        return this.quantidade;
    }

    getValor(): number {
        return this.valor;
    }

    getDataCadastro(): Date {
        return this.dataCadastro;
    }

    setIdDoacaoItem(idDoacaoItem: number) {
        this.idDoacaoItem = idDoacaoItem;
    }

    setIdDoacao(idDoacao: number) {
        this.idDoacao = idDoacao;
    }

    setIdTipoDoacao(idTipoDoacao: number) {
        this.idTipoDoacao = idTipoDoacao;
    }

    setNumItens(numItens: number) {
        this.numItens = numItens;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    setQuantidade(quantidade: number) {
        this.quantidade = quantidade;
    }

    setValor(valor: number) {
        this.valor = valor;
    }

    setDataCadastro(dataCadastro: Date) {
        this.dataCadastro = dataCadastro;
    }
}