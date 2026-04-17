import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  // SOBRE
  await prisma.customPage.upsert({
    where: {
      slug: "sobre"
    },
    update: {},
    create: {
      slug: "sobre",
      title: "Sobre nós",
      introText: "Conheça nossa história e como tudo começou.",
      section1Title: "Nossa história",
      section1Text: "Somos apaixonados por criar peças únicas feitas à mão.",
      coverImage: "https://via.placeholder.com/600x400"
    }
  })

  // PERSONALIZADOS
  await prisma.customPage.upsert({
    where: {
      slug: "personalizados"
    },
    update: {},
    create: {
      slug: "personalizados",
      title: "Pedidos Personalizados",
      introText: "Veja como funciona para pedir seu produto personalizado.",
      faq: [
        {
          question: "Como faço um pedido?",
          answer: "Entre em contato pelo WhatsApp e envie sua ideia."
        },
        {
          question: "Qual o prazo?",
          answer: "De 5 a 10 dias úteis."
        }
      ]
    }
  })

  console.log("Seed rodou com sucesso 🚀")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())