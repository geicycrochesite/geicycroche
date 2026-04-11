import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('👤 Criando usuário administrador...')

  const passwordHash = await bcrypt.hash('@167392Geic', 10)

  await prisma.adminUser.create({
    data: {
      email: 'admin@geicycroche.com',
      passwordHash,
      role: 'admin',
    },
  })

  console.log('✅ Admin criado com sucesso!')
  console.log('📧 Email: admin@geicycroche.com')
  console.log(`🔑 Senha: xxxxxxxxxx`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })