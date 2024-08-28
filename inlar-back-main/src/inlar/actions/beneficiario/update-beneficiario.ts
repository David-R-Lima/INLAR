import { Injectable } from '@nestjs/common';
import { BeneficiarioRepositorio } from 'src/inlar/database/prisma/repositories/beneficiario-repositorio';
import { Beneficiario } from 'src/inlar/entities/beneficiario';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  id: number;
  nome?: string;
  dataNasc?: Date;
  tipoPessoa?: string;
  genero?: string;
  cpf?: string;
  cnpj?: string | null;
  rg?: string;
  contato1?: string | null;
  contato2?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
}

@Injectable()
export class UpdateBeneficiario {
  constructor(private beneficiarioRepositorio: BeneficiarioRepositorio) {}

  async execute(data: Request): Promise<Beneficiario | NotFoundError | InternalError> {
    const doacaoExists = await this.beneficiarioRepositorio.findById(data.id);
    
    if (!doacaoExists) {
      return new NotFoundError("Doacao not found");
    }

    doacaoExists.setNome(data.nome);
    doacaoExists.setDataNascimento(data.dataNasc);
    doacaoExists.setTipoPessoa(data.tipoPessoa);
    doacaoExists.setGenero(data.genero);
    doacaoExists.setCpf(data.cpf);
    doacaoExists.setCnpj(data.cnpj);
    doacaoExists.setRg(data.rg);
    doacaoExists.setContato1(data.contato1);
    doacaoExists.setContato2(data.contato2);
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
