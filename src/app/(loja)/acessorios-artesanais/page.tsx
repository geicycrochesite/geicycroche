import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acessórios Artesanais Exclusivos | Estilo Feito à Mão",
  description:
    "Descubra acessórios artesanais únicos e feitos à mão. Pulseiras, colares e peças exclusivas que combinam estilo, autenticidade e personalidade.",
  keywords: [
    "acessórios artesanais",
    "acessórios feitos à mão",
    "pulseiras artesanais",
    "acessórios personalizados",
    "artesanato exclusivo",
  ],
};

export default function Page() {
  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Acessórios Artesanais: Estilo Único que Só o Feito à Mão Pode Oferecer
        </h1>

        <p className="text-slate-600 text-base sm:text-lg mb-6">
          Se você busca se destacar com autenticidade, os{" "}
          <strong>acessórios artesanais</strong> são a escolha perfeita. Cada
          peça é criada manualmente, carregando detalhes únicos que transformam
          qualquer look em algo especial.
        </p>

        <div className="w-full mb-6">
          <Image
            src="/assets/tipos-de-artesanato/Pulseira-de-borboleta-miçanga-colorida.jpg"
            alt="Pulseira artesanal de miçanga colorida feita à mão"
            width={800}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
            priority
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          ✨ Por que escolher acessórios feitos à mão?
        </h2>

        <p className="text-slate-600 mb-6">
          Em um mundo onde tudo parece igual, usar algo exclusivo faz toda a
          diferença. Os <strong>acessórios feitos à mão</strong> trazem
          personalidade e contam histórias através de cada detalhe.
        </p>

        <ul className="space-y-2 text-slate-600 mb-8">
          <li>✔ Exclusividade em cada peça</li>
          <li>✔ Produção artesanal com atenção aos detalhes</li>
          <li>✔ Estilo único e autêntico</li>
          <li>✔ Combina com diferentes ocasiões</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          💎 Acessórios que refletem sua personalidade
        </h2>

        <p className="text-slate-600 mb-6">
          Muito mais do que itens de moda, os{" "}
          <strong>acessórios artesanais</strong> são uma forma de expressão. Cada
          pulseira, colar ou detalhe revela um pouco de quem você é.
        </p>

        <p className="text-slate-600 mb-6">
          É por isso que eles estão cada vez mais presentes no dia a dia de quem
          valoriza originalidade e quer fugir do comum.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          🔥 Tendências em acessórios artesanais
        </h2>

        <p className="text-slate-600 mb-6">
          Alguns dos modelos mais desejados do momento incluem:
        </p>

        <ul className="space-y-2 text-slate-600 mb-8">
          <li>✔ Pulseiras de miçanga coloridas</li>
          <li>✔ Acessórios com detalhes personalizados</li>
          <li>✔ Peças delicadas e minimalistas</li>
          <li>✔ Combinações criativas e exclusivas</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          ⚡ Garanta o seu antes que acabe
        </h2>

        <p className="text-slate-600 mb-6">
          Como são feitos manualmente, muitos acessórios possuem{" "}
          <strong>estoque limitado</strong>. Isso significa que cada peça pode
          ser única — e quando acaba, dificilmente será exatamente igual.
        </p>

        <p className="text-slate-600 mb-6">
          Se você encontrou um acessório que combina com você, este é o momento
          ideal para garantir o seu.
        </p>

        <div className="bg-[#2F8F5B] text-white rounded-2xl p-6 text-center">
        <p className="text-lg font-semibold mb-3">
            💫 Destaque seu estilo com exclusividade
        </p>
        <p className="mb-4">
            Escolha agora acessórios artesanais únicos e transforme seu visual com personalidade.
        </p>
        <a
            href="/produtos"
            className="inline-block bg-white text-[#2F8F5B] px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
            Ver acessórios disponíveis
        </a>
        </div>
      </article>
    </main>
  );
}