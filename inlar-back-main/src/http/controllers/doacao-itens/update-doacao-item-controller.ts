import {
    Controller,
    Body,
    HttpCode,
    BadRequestException,
    Put,
    Param,
    NotFoundException,
  } from '@nestjs/common';
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { UpdateDoacaoItem } from 'src/inlar/actions/doacao-itens/update-doacao-item';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    tipo: z.coerce.number().optional(),
    numItens: z.number().optional(),
    quantidade: z.number().optional(),
    valor: z.number().optional(),
    descricao: z.string().optional(),
  })
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  const squemaParam = z.object({
    id_doacao_item: z.coerce.number(),
  });
  
  type SchemaParam = z.infer<typeof squemaParam>;
  const paramValidationPipe = new ZodValidationPipe(squemaParam);
  
  @Controller('/doacaoItem/:id_doacao_item')
  export class UpdateDoacaoItemController {
    constructor(private updateDoacaoItem: UpdateDoacaoItem) {}
  
    @Put()
    @HttpCode(200)
    async handle(
      @Param(paramValidationPipe)
      param: SchemaParam,
      @Body(validationPipe)
      body: Schema,
    ) {
      const res = await this.updateDoacaoItem.execute({
        id: param.id_doacao_item,
        descricao: body.descricao,
        numItens: body.numItens,
        quantidade: body.quantidade,
        valor: body.valor,
        tipo: body.tipo,
      });
  
      if (res instanceof DoacaoItem) {
        return res;
      }

      if(res instanceof NotFoundError) {
        throw new NotFoundException(res.message)
      }

      if(res instanceof InternalError) {
        throw new BadRequestException("Internal Error")
      }
  
      throw new BadRequestException();
    }
  }
  