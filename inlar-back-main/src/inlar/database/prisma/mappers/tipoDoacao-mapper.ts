import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';
import { Prisma, tipodoacao as PrismaTipoDoacao } from '@prisma/client';

export class TipoDoacaoMapper {
  static toDatabase(
    tipoDoacao: TipoDoacao,
  ): Prisma.tipodoacaoUncheckedCreateInput {
    return {
      DESCRICAO: tipoDoacao.getdescricao(),
      DATACAD: tipoDoacao.getDataCadastro(),
      ATIVO: tipoDoacao.getAtivo(),
    };
  }
  static fromDatabase(raw: PrismaTipoDoacao): TipoDoacao {
    const tipoDoacao = new TipoDoacao({
      idTipoDoacao: raw.IDTIPODOACAO,
      descricao: raw.DESCRICAO,
      dataCadastro: raw.DATACAD,
      ativo: raw.ATIVO,
    });

    return tipoDoacao;
  }
}
