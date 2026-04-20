// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Limpando pedidos...');

  // 1. apagar itens do pedido
  await prisma.orderItem.deleteMany();

  // 2. apagar pedidos
  await prisma.order.deleteMany();

  console.log('✅ Pedidos apagados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });