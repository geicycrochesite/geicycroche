import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a Artesanaio | Artesanato Feito à Mão com Propósito",
  description:
    "Conheça a história da Artesanaio: artesanato feito à mão com amor, autenticidade e propósito. Peças únicas que carregam significado e valorizam o trabalho artesanal.",
  keywords: [
    "sobre artesanato",
    "artesanato feito à mão",
    "história da artesanaio",
    "produtos artesanais",
    "feito à mão com amor",
  ],
};

export default function Page() {
  return (
    <main className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Sobre a Artesanaio
        </h1>

        <p className="text-[var(--color-text-secondary)] text-base sm:text-lg mb-6">
          A <strong>Artesanaio</strong> nasceu da paixão pelo{" "}
          <strong>artesanato feito à mão</strong> e do desejo de criar peças que
          vão além do comum. Aqui, cada produto carrega história, significado e
          um cuidado especial em cada detalhe.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Image
            src="/assets/tipos-de-artesanato/Pulseira-de-borboleta-miçanga-colorida.jpg"
            alt="Pulseira artesanal feita à mão"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
            priority
          />
          <Image
            src="/assets/tipos-de-artesanato/Toalha-personalizada-bordado-ponto-cruz-nome.jpg"
            alt="Toalha personalizada artesanal"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          💛 Nossa essência
        </h2>

        <p className="text-[var(--color-text-secondary)] mb-6">
          Acreditamos que o verdadeiro valor está nos detalhes. Em um mundo cada
          vez mais automatizado, escolhemos o caminho do manual, do único, do
          exclusivo.
        </p>

        <p className="text-[var(--color-text-secondary)] mb-6">
          Cada peça criada representa tempo, dedicação e carinho. Não produzimos
          em massa — criamos com propósito.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          🧵 O que você encontra aqui
        </h2>

        <p className="text-[var(--color-text-secondary)] mb-6">
          Trabalhamos com diferentes tipos de{" "}
          <strong>artesanato personalizado</strong>, sempre priorizando qualidade
          e autenticidade:
        </p>

        <ul className="space-y-2 text-[var(--color-text-secondary)] mb-8">
          <li>✔ Pulseiras artesanais de miçanga</li>
          <li>✔ Acessórios exclusivos feitos à mão</li>
          <li>✔ Peças em macramê artesanal</li>
          <li>✔ Presentes personalizados e criativos</li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Image
            src="/assets/tipos-de-artesanato/Kit-pulseira-letra-inicial-do-nome-preto-e-branco-simples-unissex-ajustavel-regulavel-5.jpg"
            alt="Pulseiras em macramê artesanal"
            width={400}
            height={400}
            className="w-full h-auto rounded-2xl object-cover"
          />
          <Image
            src="/assets/tipos-de-artesanato/Kit-pulseira-letra-inicial-do-nome-preto-e-branco-simples-unissex-ajustavel-regulavel-2.jpg"
            alt="Kit pulseiras artesanais"
            width={400}
            height={400}
            className="w-full h-auto rounded-2xl object-cover"
          />
          <Image
            src="/assets/tipos-de-artesanato/Kit-pulseira-letra-inicial-do-nome-preto-e-branco-simples-unissex-ajustavel-regulavel-3.jpg"
            alt="Pulseiras feitas à mão personalizadas"
            width={400}
            height={400}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          🌱 Nosso propósito
        </h2>

        <p className="text-[var(--color-text-secondary)] mb-6">
          Queremos levar até você mais do que um produto — queremos entregar uma
          experiência. Cada item da Artesanaio é pensado para emocionar, marcar
          momentos e criar memórias.
        </p>

        <p className="text-[var(--color-text-secondary)] mb-6">
          Valorizamos o consumo consciente, o trabalho manual e a beleza do que
          é feito com tempo e dedicação.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          🚀 Por que escolher a Artesanaio?
        </h2>

        <ul className="space-y-2 text-[var(--color-text-secondary)] mb-8">
          <li>✔ Produtos exclusivos e feitos à mão</li>
          <li>✔ Alta qualidade e atenção aos detalhes</li>
          <li>✔ Atendimento próximo e humanizado</li>
          <li>✔ Peças com significado e personalidade</li>
        </ul>

        <div className="bg-[var(--color-success)] text-[var(--color-text-primary)] rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold mb-3">
            💚 Faça parte dessa história
          </p>
          <p className="mb-4">
            Escolha produtos artesanais únicos e leve mais significado para o
            seu dia a dia.
          </p>
          <a
            href="/produtos"
            className="inline-block bg-[var(--color-text-primary)] text-[var(--color-success)] px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Ver produtos artesanais
          </a>
        </div>
      </article>
    </main>
  );
}