import { Doacao } from "src/inlar/entities/doacao";

export class DoadorPresenter {
    static toHttp(doacao: Doacao) {
        return {
            idDoacao: doacao.getIdDoacao(),
            idDoador: doacao.getIdDoador(),
            idBeneficiario: doacao.getIdBeneficiario(),
            idUsuario: doacao.getIdUsuario(),
            descricao: doacao.getDescricao(),
            dataCadastro: doacao.getDataCadastro(),
            cep: doacao.getCep(),
            logradouro: doacao.getLogradouro(),
            numero: doacao.getNumero(),
            complemento: doacao.getComplemento(),
            bairro: doacao.getBairro(),
            cidade: doacao.getCidade(),
            uf: doacao.getUf(),
            situacao: doacao.getSituacao(),
            doacaoItens: doacao.getDoacaoItens(),
        };
    }
}