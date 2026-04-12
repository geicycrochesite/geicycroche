import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Macramê Artesanal | Peças Feitas à Mão com Estilo",
  description:
    "Descubra o macramê artesanal: peças únicas feitas à mão com estilo boho e personalidade. Acessórios e itens exclusivos para quem valoriza o artesanal.",
  keywords: [
    "macramê artesanal",
    "macrame feito à mão",
    "acessórios em macramê",
    "arte em macramê",
    "produtos artesanais",
  ],
};

export default function Page() {
  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Macramê Artesanal: Beleza, Técnica e Exclusividade em Cada Detalhe
        </h1>

        <p className="text-slate-600 text-base sm:text-lg mb-6">
          O <strong>macramê artesanal</strong> é mais do que uma técnica — é uma
          forma de expressão. Cada peça é cuidadosamente feita à mão, trazendo
          um estilo único que combina tradição, criatividade e autenticidade.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Image
            src="/assets/tipos-de-artesanato/Kit-pulseira-letra-inicial-do-nome-preto-e-branco-simples-unissex-ajustavel-regulavel-2.jpg"
            alt="Pulseira em macramê artesanal personalizada"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
            priority
          />
          <Image
            src="/assets/tipos-de-artesanato/Kit-pulseira-letra-inicial-do-nome-preto-e-branco-simples-unissex-ajustavel-regulavel-3.jpg"
            alt="Kit de pulseiras em macramê feitas à mão"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
          />
          <Image
            src="/assets/tipos-de-artesanato/Kit-pulseira-letra-inicial-do-nome-preto-e-branco-simples-unissex-ajustavel-regulavel-5.jpg"
            alt="Acessórios em macramê artesanal ajustáveis"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover sm:col-span-2"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          🧵 O que torna o macramê tão especial?
        </h2>

        <p className="text-slate-600 mb-6">
          O macramê é uma técnica manual baseada em nós, que transforma fios em
          verdadeiras obras de arte. Cada detalhe é feito com precisão, tornando
          cada peça única e impossível de reproduzir exatamente igual.
        </p>

        <ul className="space-y-2 text-slate-600 mb-8">
          <li>✔ Técnica artesanal tradicional</li>
          <li>✔ Peças únicas e feitas à mão</li>
          <li>✔ Estilo moderno com toque rústico</li>
          <li>✔ Alta durabilidade e acabamento</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          ✨ Estilo que combina com tudo
        </h2>

        <p className="text-slate-600 mb-6">
          Os acessórios em <strong>macramê artesanal</strong> são versáteis e
          combinam com diferentes estilos — do casual ao sofisticado. Eles são
          perfeitos para quem quer se destacar sem perder a elegância.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          ⚡ Peças limitadas — garanta a sua
        </h2>

        <p className="text-slate-600 mb-6">
          Por serem feitos manualmente, os produtos em macramê possuem{" "}
          <strong>produção limitada</strong>. Cada peça exige tempo e cuidado,
          o que torna sua disponibilidade ainda mais exclusiva.
        </p>

        <p className="text-slate-600 mb-6">
          Se você encontrou um modelo que combina com você, não deixe para
          depois — ele pode não estar disponível novamente.
        </p>

        <div className="bg-[var(--color-success)] text-[var(--color-text-primary)] rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold mb-3">
            🧶 Tenha uma peça única em macramê
          </p>
          <p className="mb-4">
            Escolha agora acessórios em macramê artesanal e leve exclusividade
            para o seu estilo.
          </p>
          <a
            href="/produtos"
            className="inline-block bg-white text-[#2F8F5B] px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Ver peças em macramê
          </a>
        </div>
      </article>
    </main>
  );
}