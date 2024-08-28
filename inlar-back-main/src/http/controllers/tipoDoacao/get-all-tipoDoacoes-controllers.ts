import {
    Controller,
    HttpCode,
    BadRequestException,
    Get,
    Query,
  } from '@nestjs/common';
  import { GetAllTipoDoacao } from 'src/inlar/actions/tipo-doacao/get-all-tipo-doacao'; 
  
  @Controller("/tipoDoacao")
  export class GetAllTipoDoacoesController {
    constructor(private getAllTipoDoacao: GetAllTipoDoacao) {}   
    @Get()
    @HttpCode(200)
    async handle() {
      const tipoDoacao = await this.getAllTipoDoacao.execute();   

      return tipoDoacao
    }
  }
  