// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

function Hash(plain: string): Promise<string> {
  return hash(plain, 10) // Salt rounds = 10
}

async function main() {
  await prisma.tipodoacao.createMany({
    data: [
      {
        DESCRICAO: 'Comida',
        ATIVO: true,
      },
      {
        DESCRICAO: 'Dinehiro',
        ATIVO: true,
      },
    ],
  })

  const usuerPassword = await Hash('123456')

  await prisma.usuario.create({
    data: {
      ATIVO: true,
      SENHA: usuerPassword,
      EMAIL: 'admin@admin.com',
      USUARIO: 'Admin',
      DATACAD: new Date(),
      ROLE: 'A',
    },
  })
}

main()
  .catch((e) => console.error(e))
  .then(() => console.log('Seed done'))
  .finally(async () => {
    await prisma.$disconnect()
  })
