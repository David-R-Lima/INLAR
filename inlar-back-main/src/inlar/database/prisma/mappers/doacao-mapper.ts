import { Prisma, doacao as PrismaDoacao, doacaoItens as PrismaDoacaoitens } from "@prisma/client";
import { Doacao } from "src/inlar/entities/doacao";
import { DoacaoItensMapper } from "./doacao-itens-mapper";


export class DoacaoMapper {
    static toDatabase(doacao: Doacao): Prisma.doacaoUncheckedCreateInput {
        return {
            IDDOADOR: doacao.getIdDoador(),
            DESCRICAO: doacao.getDescricao(),
            DATACAD: doacao.getDataCadastro(),
            CEP: doacao.getCep(),
            LOGRADOURO: doacao.getLogradouro(),
            NUMERO: doacao.getNumero(),
            COMPLEMENTO: doacao.getComplemento(),
            BAIRRO: doacao.getBairro(),
            CIDADE: doacao.getCidade(),
            SIGLAESTADO: doacao.getUf(),
            SITUACAO: doacao.getSituacao(),            
            IDUSUARIO: doacao.getIdUsuario(),
            IDBENEFICIARIO: doacao.getIdBeneficiario(), 
        }
    }

    static fromDatabase(raw: PrismaDoacao & {
        doacaoItens?: PrismaDoacaoitens[]
    }): Doacao {
        const doacao =  new Doacao({
            idDoacao: raw.IDDOACAO,
            idDoador: raw.IDDOADOR,
            descricao: raw.DESCRICAO,
            dataCadastro: raw.DATACAD,
            cep: raw.CEP,
            logradouro: raw.LOGRADOURO,
            numero: raw.NUMERO,
            complemento: raw.COMPLEMENTO,
            bairro: raw.BAIRRO,
            cidade: raw.CIDADE,
            uf: raw.SIGLAESTADO,
            situacao: raw.SITUACAO,
            idbeneficiario: raw.IDBENEFICIARIO,
            idUsuario: raw.IDUSUARIO,
            doacaoItens: raw.doacaoItens? raw.doacaoItens.map(DoacaoItensMapper.fromDatabase) : null,
        })

        return doacao
    }
}