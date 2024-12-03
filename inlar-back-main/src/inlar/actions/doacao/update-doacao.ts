import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { Doacao } from 'src/inlar/entities/doacao';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id: number
  id_usuario: number;
  id_doador?: number
  id_beneficiario?: number
  descricao: string;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
  numItens?: number | null
  quantidade?: number | null
  valor?: number | null
  situacao?: string | null;
  itens?: {
    tipo?: number
    numItens?: number | null
    quantidade?: number | null
    valor?: number | null
    descricao?: string | null
  }[]
}

@Injectable()
export class UpdateDoacao {
  constructor(private doacaoRepositorio: DoacaoRepositorio, private doacaoItensRepositorio: DoacaoItensRepositorio) {}

  async execute(data: Request): Promise<Doacao | NotFoundError | InternalError> {
    const doacaoExists = await this.doacaoRepositorio.findById(data.id);
    
    if (!doacaoExists) {
      return new NotFoundError("Doacao not found");
    }
    
    doacaoExists.setDescricao(data.descricao)
    doacaoExists.setCep(data.cep);
    doacaoExists.setLogradouro(data.logradouro);
    doacaoExists.setNumero(data.numero);
    doacaoExists.setComplemento(data.complemento);
    doacaoExists.setBairro(data.bairro);
    doacaoExists.setCidade(data.cidade);
    doacaoExists.setUf(data.uf);

    const newItens: DoacaoItem[] = []

    data.itens.map((item) => {
      newItens.push(new DoacaoItem({
          idDoacao: doacaoExists.getIdDoacao(),
          idTipoDoacao: item.tipo,
          descricao: item.descricao,
          quantidade: item.quantidade,
          valor: item.valor,
          numItens: item.numItens,
          dataCadastro: new Date(),
      }))
  })

    try {
        await this.doacaoRepositorio.update(data.id, doacaoExists);
        await this.doacaoItensRepositorio.DeleteMany(doacaoExists.getIdDoacao());
        await this.doacaoItensRepositorio.createMany(newItens);
    } catch (error) {
        return new InternalError(error?.message ?? "Internal Error")
    }

    return doacaoExists;
  }
}
