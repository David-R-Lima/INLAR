import { Prisma, doacaoItens as PrismaDoacaoItem } from "@prisma/client";
import { DoacaoItem } from "src/inlar/entities/doacao-itens";


export class DoacaoItensMapper {
    static toDatabase(doacaoItem: DoacaoItem): Prisma.doacaoItensUncheckedCreateInput {
        return {
            IDDOACAO: doacaoItem.getIdDoacao(),
            IDTIPODOACAO: doacaoItem.getIdTipoDoacao(),
            NUMITEM: doacaoItem.getNumItens(),
            VALORMONETARIO: doacaoItem.getValor(),
            DESCRICAO: doacaoItem.getDescricao(),
            QTDE: doacaoItem.getQuantidade(),
        }
    }

    static fromDatabase(raw: PrismaDoacaoItem): DoacaoItem {
        return new DoacaoItem({
            idDoacaoItem: raw.IDITEMDOACAO,
            idDoacao: raw.IDDOACAO,
            idTipoDoacao: raw.IDTIPODOACAO,
            numItens: raw.NUMITEM,
            descricao: raw.DESCRICAO,
            quantidade: raw.QTDE,
            valor: raw.VALORMONETARIO ? Number(raw.VALORMONETARIO) : undefined,
            dataCadastro: raw.DATACAD,
        })
    }
}