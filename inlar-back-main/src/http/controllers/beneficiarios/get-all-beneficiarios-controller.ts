import {
    Controller,
    HttpCode,
    Get,
    Query,
  } from '@nestjs/common';
import { GetAllBeneficiarios } from 'src/inlar/actions/beneficiario/get-all-beneficiarios';
  
  @Controller('/beneficiario-all')
  export class GetAllBeneficiariosController {
    constructor(private getAllBeneficiarios: GetAllBeneficiarios) {}
  
    @Get()
    @HttpCode(200)
    async handle(
    ) {
      const doador = await this.getAllBeneficiarios.execute();
  
      return doador
    }
  }
  