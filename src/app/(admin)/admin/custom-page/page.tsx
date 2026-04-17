import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function PagesList() {

const pages = await prisma.customPage.findMany({
  orderBy: { createdAt: "desc" }
})

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">Páginas</h1>
        <p className="text-sm text-gray-500">
          Gerencie as páginas institucionais
        </p>
      </div>

      <div className="rounded-3xl border border-[var(--color-admin-border)] overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-[var(--color-bg-tertiary)]">
            <tr>
              <th className="text-left p-4">Título</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-right p-4">Ações</th>
            </tr>
          </thead>

          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-t">

                <td className="p-4">{page.title}</td>
                <td className="p-4">{page.slug}</td>

                <td className="p-4 text-right">
                  <Link
                    href={`/admin/custom-page/${page.id}`}
                    className="text-blue-600"
                  >
                    Editar
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}