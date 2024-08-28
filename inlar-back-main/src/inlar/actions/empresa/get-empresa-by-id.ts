import { Injectable } from '@nestjs/common';
import { EmpresaRepositorio } from 'src/inlar/database/prisma/repositories/empresa-repositorio';
import { Empresa } from 'src/inlar/entities/empresa';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idEmpresa: number
}

@Injectable()
export class GetEmpresaById {
  constructor(private empresaRepositorio: EmpresaRepositorio) {}

  async execute(data: Request): Promise<Empresa | NotFoundError> {
    const res = await this.empresaRepositorio.findById(data.idEmpresa)

    if(res) {
        return res
    }

    return new NotFoundError("Empresa not found")
  }
}
