 import {
     Controller,
     Post,
     Body,
     HttpCode,
     BadRequestException,
   } from '@nestjs/common';
   import { z } from 'zod';
   import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
   import { CreateBeneficiario } from 'src/inlar/actions/beneficiario/create-beneficiario';

   const squema = z.object({
     nome: z.string({
       required_error: 'Field: {nome} is required',
     }),
     datanasc: z.date().optional(),
     tipo_pessoa: z.string({
       required_error: 'Field: {tipo_pessoa} is required',
     }),
     genero: z.string().optional(),
     cpf: z.string().max(11, { message: 'Cannot exceed 11 caracters' }).optional(),
     rg: z.string().max(30, { message: 'Cannot exceed 30 caracters'}).optional(),
     cnpj: z
       .string()
       .max(14, { message: 'Cannot exceed 14 caracters' })
       .optional(),
     contato1: z
       .string()
       .max(11, { message: 'Cannot exceed 11 caracters' })
       .optional(),
     contato2: z
       .string()
       .max(11, { message: 'Cannot exceed 11 caracters' })
       .optional(),
     cep: z.string().max(8, { message: 'Cannot exceed 8 caracters' }).optional(),
     logradouro: z
       .string()
       .max(255, { message: 'Cannot exceed 255 caracters' })
       .optional(),
     numero: z
       .string()
       .max(10, { message: 'Cannot exceed 10 caracters' })
       .optional(),
     complemento: z
       .string()
       .max(100, { message: 'Cannot exceed 100 caracters' })
       .optional(),
     bairro: z
       .string()
       .max(100, { message: 'Cannot exceed 100 caracters' })
       .optional(),
     cidade: z
       .string()
       .max(100, { message: 'Cannot exceed 100 caracters' })
       .optional(),
     uf: z.string().max(2, { message: 'Cannot exceed 2 caracters' }).optional(),
     observacoes: z.string().optional(),
   });

   type Schema = z.infer<typeof squema>;

   const validationPipe = new ZodValidationPipe(squema);
   @Controller('/beneficiario')
   export class CreateBeneficiarioController {
     constructor(private createBeneficiario: CreateBeneficiario) {}
     @Post()
     @HttpCode(201)
     async handle(
       @Body(validationPipe)
       body: Schema,
     ) {
       const beneficiario = await this.createBeneficiario.execute({
         nome: body.nome,
         dataNasc: body.datanasc,
         tipoPessoa: body.tipo_pessoa,
         genero: body.genero,
         cpf: body.cpf,
         rg: body.rg,
         cnpj: body.cnpj,
         contato1: body.contato1,
         contato2: body.contato2,
         cep: body.cep,
         logradouro: body.logradouro,
         numero: body.numero,
         complemento: body.complemento,
         bairro: body.bairro,
         cidade: body.cidade,
         uf: body.uf,
         observacoes: body.observacoes,
       });
       if (beneficiario) {
         return beneficiario;
       }
       throw new BadRequestException;
     }
   }
  