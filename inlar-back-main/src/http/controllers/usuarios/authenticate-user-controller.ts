import {
    Controller,
    Body,
    HttpCode,
    NotFoundException,
    Post,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { AuthenticateUser } from 'src/inlar/actions/usuarios/authenticate-user';
import { NotFoundError } from 'src/inlar/errors/not-found-error';
import { Public } from 'src/http/auth/public';
  
  const squema = z.object({
    email: z.string().email(),
    senha: z.string(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Public()
  @Controller('/authenticate')
  export class AuthenticateUserController {
    constructor(private authenticateUser: AuthenticateUser) {}
  
    @Post()
    @HttpCode(200)
    async handle(
      @Body(validationPipe)
      body: Schema,
    ) {

      const res = await this.authenticateUser.execute({
        email: body.email,
        senha: body.senha,
      });
  
      if (typeof res === 'string') {
        return {
          access_token: res
        };
      }
  
      if (res instanceof NotFoundError) {
        throw new NotFoundException("Usuario not found");
      }

      if (res instanceof UnauthorizedException) {
        throw new UnauthorizedException("Senha incorreta");
      }
  
      throw new NotFoundException();
    }
  }
  