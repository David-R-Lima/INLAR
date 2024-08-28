import { Injectable } from '@nestjs/common';
import { EmpresaRepositorio } from 'src/inlar/database/prisma/repositories/empresa-repositorio';
import { Empresa } from 'src/inlar/entities/empresa';

interface Request {
  page: number
}

@Injectable()
export class GetEmpresaByPage {
  constructor(private empresaRepositorio: EmpresaRepositorio) {}

  async execute(data: Request): Promise<Empresa[]> {
    const res = await this.empresaRepositorio.findMany(data.page)

    return res
  }
}
