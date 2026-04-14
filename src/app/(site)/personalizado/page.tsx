import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type FAQItem = {
  question: string
  answer: string
}

async function getPage() {
  const storeId = "SEU_STORE_ID"

  return prisma.customPage.findUnique({
    where: {
      storeId_slug: {
        storeId,
        slug: "personalizados"
      }
    }
  })
}

export default async function PersonalizadosPage() {
  const page = await getPage()
  if (!page) return notFound()

  const faqs = (page.faq as FAQItem[]) || []

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">

      <h1 className="text-3xl font-bold">{page.title}</h1>

      {/* Intro */}
      <p className="text-gray-600">{page.introText}</p>

      {/* FAQ */}
      <div className="space-y-4">
        {faqs.map((item: any, i: number) => (
          <div key={i} className="border rounded-2xl p-4">
            <h2 className="font-semibold">{item.question}</h2>
            <p className="text-gray-600 mt-2">{item.answer}</p>
          </div>
        ))}
      </div>

    </div>
  )
}