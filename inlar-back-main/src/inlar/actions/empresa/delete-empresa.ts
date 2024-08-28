import { Injectable } from '@nestjs/common';
import { EmpresaRepositorio } from 'src/inlar/database/prisma/repositories/empresa-repositorio';
import { InternalError } from 'src/inlar/errors/internal-error';
import { NotFoundError } from 'src/inlar/errors/not-found-error';

interface Request {
  idEmpresa: number;
}

@Injectable()
export class DeleteEmpresa {
  constructor(private empresaRepositorio: EmpresaRepositorio) {}

  async execute(data: Request): Promise<boolean | NotFoundError | InternalError> {

    const empresaExists = await this.empresaRepositorio.findById(data.idEmpresa)

    if(!empresaExists) {
      return new NotFoundError("Empresa not found")
    }
  
    try {
      const res = await this.empresaRepositorio.delete(data.idEmpresa);

      return res;
    } catch (error) {
      return new InternalError(error?.message ?? "Internal Error");
    }
  }
}
