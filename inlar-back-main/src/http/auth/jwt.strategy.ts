import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";
import { PrismaService } from "src/inlar/database/prisma/prisma.service";

const tokenPayload = z.object({
  sub: z.coerce.number({ required_error: "Sub is required"}),
  role: z.enum(["A", "S", "U"]).optional().nullable(),
});

export type UserPayload = z.infer<typeof tokenPayload>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    const secret = process.env.JWT_SECRET;
    
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });      
  }

  async validate(payload: UserPayload) {        
    
    const user = await  this.prisma.usuario.findUnique({
      where: {
        IDUSUARIO: payload.sub
      }
    })

    if (!user) {
      return false;
    }
  
    return tokenPayload.parse(payload);
  }
}
