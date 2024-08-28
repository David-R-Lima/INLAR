import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doador } from 'src/inlar/entities/doador';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idDoador: number;
  nome: string;
  tipoPessoa: string;
  cpf?: string;
  cnpj?: string | null;
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
export class UpdateDoador {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<Doador | NotFoundError | InternalError> {
    const doadorExists = await this.doadorRepositorio.findById(data.idDoador);

    if (!doadorExists) {
      return new NotFoundError("Doador not found");
    }

    doadorExists.setNome(data.nome);
    doadorExists.setTipoPessoa(data.tipoPessoa);
    doadorExists.setCpf(data.cpf);
    doadorExists.setCnpj(data.cnpj);
    doadorExists.setContato1(data.contato1);
    doadorExists.setContato2(data.contato2);
    doadorExists.setCep(data.cep);
    doadorExists.setLogradouro(data.logradouro);
    doadorExists.setNumero(data.numero);
    doadorExists.setComplemento(data.complemento);
    doadorExists.setBairro(data.bairro);
    doadorExists.setCidade(data.cidade);
    doadorExists.setUf(data.uf);
    doadorExists.setObservacoes(data.observacoes);

    try {
      const res = await this.doadorRepositorio.update(
        data.idDoador,
        doadorExists,
      );

      return res;
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error");
    }
  }
}
