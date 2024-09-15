import { Injectable } from '@nestjs/common';
import { BeneficiarioRepositorio } from 'src/inlar/database/prisma/repositories/beneficiario-repositorio';
import { Beneficiario } from 'src/inlar/entities/beneficiario';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id: number;
  id_doador?: number;
  id_beneficiario?: number;
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
export class UpdateBeneficiario {
  constructor(private beneficiarioRepositorio: BeneficiarioRepositorio) {}

  async execute(data: Request): Promise<Beneficiario | NotFoundError | InternalError> {
    const doacaoExists = await this.doacaoRepositorio.findById(data.id);
    
    if (!doacaoExists) {
      return new NotFoundError("Doacao not found");
    }

    doacaoExists.setNome(data.id_doador);
    doacaoExists.setDataNascimento(data.id_beneficiario);
    doacaoExists.setTipoPessoa(data.situacao);
    doacaoExists.setGenero(data.itens);
    doacaoExists.setCpf(data.numItens);
    doacaoExists.setCnpj(data.quantidade);
    doacaoExists.setRg(data.id_usuario);
    doacaoExists.setCep(data.cep);
    doacaoExists.setLogradouro(data.logradouro);
    doacaoExists.setNumero(data.numero);
    doacaoExists.setComplemento(data.complemento);
    doacaoExists.setBairro(data.bairro);
    doacaoExists.setCidade(data.cidade);
    doacaoExists.setUf(data.uf);


    try {
        await this.beneficiarioRepositorio.update(data.id, doacaoExists);
    } catch (error) {
        return new InternalError(error?.message ?? "Internal Error")
    }

    return doacaoExists;
  }
}
