import { Injectable } from '@nestjs/common';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { Doacao } from 'src/inlar/entities/doacao';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id: number;
  id_doador?: number;
  id_beneficiario?: number;
  id_usuario: number;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
  situacao: string;
}

@Injectable()
export class UpdateDoacao {
  constructor(private doacaoRepositorio: DoacaoRepositorio) {}

  async execute(data: Request): Promise<Doacao | NotFoundError | InternalError> {
    const doacaoExists = await this.doacaoRepositorio.findById(data.id);
    
    if (!doacaoExists) {
      return new NotFoundError("Doacao not found");
    }

    doacaoExists.setId_doador(data.id_doador);
    doacaoExists.setId_beneficiario(data.id_beneficiario);
    doacaoExists.setSituacao(data.situacao);
    doacaoExists.setItens(data.itens);
    doacaoExists.setNumItens(data.numItens);
    doacaoExists.setQuantidade(data.quantidade);
    doacaoExists.setId_usuario(data.id_usuario);
    doacaoExists.setCep(data.cep);
    doacaoExists.setLogradouro(data.logradouro);
    doacaoExists.setNumero(data.numero);
    doacaoExists.setComplemento(data.complemento);
    doacaoExists.setBairro(data.bairro);
    doacaoExists.setCidade(data.cidade);
    doacaoExists.setUf(data.uf);


    try {
        await this.doacaoRepositorio.update(data.id, doacaoExists);
    } catch (error) {
        return new InternalError(error?.message ?? "Internal Error")
    }

    return doacaoExists;
  }
}
