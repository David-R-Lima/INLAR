// prisma/seed.ts
import {

    PrismaClient,
  } from '@prisma/client'

  
  const prisma = new PrismaClient()
  
  async function main() {
    
    await prisma.tipodoacao.createMany({
        data: [
            {
                DESCRICAO: "Comida",
                ATIVO: true
            },
            {
                DESCRICAO: "Dinehiro",
                ATIVO: true
            }
        ]
    })

    await prisma.usuario.create({
        data: {
            ATIVO: true,
            SENHA: "123456",
            EMAIL: "admin@example.com",
            USUARIO: "david",
            DATACAD: new Date(),
        }
    })
  }
  
  main()
    .catch((e) => console.error(e))
    .then(() => console.log('Seed done'))
    .finally(async () => {
      await prisma.$disconnect()
    })
  