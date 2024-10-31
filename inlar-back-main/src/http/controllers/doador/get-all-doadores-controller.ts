import {
    Controller,
    HttpCode,
    Get,
    Query,
  } from '@nestjs/common';
import { GetAllDoadores } from 'src/inlar/actions/doador/get-all-doadores';
  
  import { GetDoadoresByPage } from 'src/inlar/actions/doador/get-doadores-by-page';
  
  
  @Controller('/doador-all')
  export class GetAllDoadoresController {
    constructor(private getAllDoadores: GetAllDoadores) {}
  
    @Get()
    @HttpCode(200)
    async handle(
    ) {
      const doador = await this.getAllDoadores.execute();
  
      return doador
    }
  }
  