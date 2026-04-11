import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos Personalizados | Artesanaio",
  description:
    "Crie produtos personalizados feitos à mão com seu nome, estilo e significado. Presentes únicos em macramê, miçangas e bordado artesanal.",
  keywords: [
    "produtos personalizados",
    "artesanato personalizado",
    "presentes personalizados",
    "feito à mão personalizado",
    "acessórios personalizados",
  ],
};

export default function Page() {
  return (
    <main className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Produtos Personalizados: Crie Algo Único, Feito Só Para Você
        </h1>

        <p className="text-slate-600 text-base sm:text-lg mb-6">
          Existe uma grande diferença entre comprar um produto… e{" "}
          <strong>criar algo que representa você</strong>. Os{" "}
          <strong>produtos personalizados</strong> da Artesanaio são feitos à mão
          com atenção aos detalhes, transformando ideias em peças únicas que
          carregam significado real.
        </p>

        {/* IMAGENS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Image
            src="/assets/tipos-de-artesanato/Toalha-personalizada-bordado-ponto-cruz-nome.jpg"
            alt="Toalha personalizada bordada com nome"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
            priority
          />
          <Image
            src="/assets/tipos-de-artesanato/Kit-pulseira-letra-inicial-do-nome-preto-e-branco-simples-unissex-ajustavel-regulavel-5.jpg"
            alt="Pulseiras personalizadas com letra inicial"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>

        {/* STORYTELLING */}
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          💭 Imagine isso por um segundo...
        </h2>

        <p className="text-slate-600 mb-6">
          Você entrega um presente. A pessoa abre… olha… e percebe que aquilo foi
          feito especialmente para ela. O nome, a cor, o detalhe — tudo pensado.
        </p>

        <p className="text-slate-600 mb-6">
          Esse é o poder de um <strong>produto personalizado</strong>: ele não é
          só um objeto. Ele cria uma conexão emocional imediata.
        </p>

        {/* BENEFÍCIOS */}
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          ✨ Por que escolher um produto personalizado?
        </h2>

        <ul className="space-y-2 text-slate-600 mb-8">
          <li>✔ Exclusividade total — ninguém terá igual</li>
          <li>✔ Carrega significado e emoção</li>
          <li>✔ Ideal para presentes especiais</li>
          <li>✔ Feito à mão com cuidado e atenção</li>
        </ul>

        {/* TIPOS */}
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          🧵 O que você pode personalizar?
        </h2>

        <p className="text-slate-600 mb-6">
          Trabalhamos com diversas técnicas artesanais para transformar sua ideia
          em realidade:
        </p>

        <ul className="space-y-2 text-slate-600 mb-8">
          <li>✔ Pulseiras com nome ou inicial</li>
          <li>✔ Toalhas bordadas personalizadas</li>
          <li>✔ Acessórios em macramê exclusivos</li>
          <li>✔ Peças em miçangas com cores escolhidas</li>
        </ul>

        {/* ESCASSEZ */}
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          ⚠️ Produção limitada
        </h2>

        <p className="text-slate-600 mb-6">
          Cada peça é feita manualmente. Isso significa que existe um limite de
          produção diária. Quando a agenda enche, novos pedidos podem levar mais
          tempo para serem aceitos.
        </p>

        <p className="text-slate-600 mb-6">
          Se você quer garantir algo exclusivo, o melhor momento é agora.
        </p>

        {/* CTA */}
        <div className="bg-[#2F8F5B] text-white rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold mb-3">
            🎯 Crie seu produto exclusivo agora
          </p>
          <p className="mb-4">
            Personalize do seu jeito e tenha uma peça única feita especialmente
            para você ou para alguém especial.
          </p>
          <a
            href="/produtos"
            className="inline-block bg-white text-[#2F8F5B] px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Personalizar agora
          </a>
        </div>
      </article>
    </main>
  );
}