import {
    Controller,
    Post,
    Body,
    HttpCode,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { CreateDoacao } from 'src/inlar/actions/doacao/create-doacao';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { Doacao } from 'src/inlar/entities/doacao';
import { InternalError } from 'src/inlar/errors/internal-error';
  
  const squema = z.object({
    id_usuario: z.coerce.number(),
    id_doador: z.coerce.number().optional().nullable(),
    descricao: z.string({
      required_error: 'Field: {nome} is required',
    }),
    cep: z.string().max(8, { message: 'Cannot exceed 8 caracters' }).optional().nullable(),
    logradouro: z
      .string()
      .max(255, { message: 'Cannot exceed 255 caracters' })
      .optional().nullable(),
    numero: z
      .string()
      .max(10, { message: 'Cannot exceed 10 caracters' })
      .optional().nullable(),
    complemento: z
      .string()
      .max(100, { message: 'Cannot exceed 100 caracters' })
      .optional().nullable(),
    bairro: z
      .string()
      .max(100, { message: 'Cannot exceed 100 caracters' })
      .optional().nullable(),
    cidade: z
      .string()
      .max(100, { message: 'Cannot exceed 100 caracters' })
      .optional().nullable(),
    uf: z.string().max(2, { message: 'Cannot exceed 2 caracters' }).optional().nullable(),
    observacoes: z.string().optional().nullable(),
    itens: z.array(
        z.object({
          tipo: z.coerce.number({
            required_error: 'Field: {tipo} is required',
          }),
          numItens: z.coerce.number().optional(),
          quantidade: z.coerce.number().optional(),
          valor: z.coerce.number().optional(),
          descricao: z.string().optional(),
        })
      ).min(1, {
        message: 'At least one item is required',
      }),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacao')
  export class CreateDoacaoController {
    constructor(private createDoacao: CreateDoacao) {}
  
    @Post()
    @HttpCode(201)
    async handle(
      @Body(validationPipe)
      body: Schema,
    ) {

      const temp: {
        tipo: number
        numItens?: number
        quantidade?: number
        valor?: number
        descricao?: string
      }[] = []

      body.itens.map((iten) => {
        temp.push({
          tipo: iten.tipo,
          numItens: iten.numItens,
          quantidade: iten.quantidade,
          valor: iten.valor,
          descricao: iten.descricao,
        })
      })

      const res = await this.createDoacao.execute({
        id_usuario: body.id_usuario,
        id_doador: body.id_doador,
        descricao: body.descricao,
        cep: body.cep,
        logradouro: body.logradouro,
        numero: body.numero,
        complemento: body.complemento,
        bairro: body.bairro,
        cidade: body.cidade,
        uf: body.uf,
        observacoes: body.observacoes,
        itens: temp,
      });
  
        
      if (res instanceof Doacao) {
        return res;
      }

      if(res instanceof NotFoundError) {
        throw new NotFoundException(res.message)
      }

      if (res instanceof InternalError) {
        throw new BadRequestException("Internal error");
      }
  
      throw new BadRequestException();
    }
  }
  