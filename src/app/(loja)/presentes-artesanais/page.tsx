import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presentes Artesanais Exclusivos | Surpreenda com Originalidade",
  description:
    "Descubra presentes artesanais únicos e personalizados. Encante com peças feitas à mão que emocionam e criam memórias inesquecíveis.",
  keywords: [
    "presentes artesanais",
    "presentes personalizados",
    "presentes criativos",
    "artesanato feito à mão",
    "ideias de presentes",
  ],
};

export default function Page() {
  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Presentes Artesanais: Surpreenda com Algo Único e Inesquecível
        </h1>

        <p className="text-slate-600 text-base sm:text-lg mb-6">
          Quantas vezes você já deu um presente que parecia… comum demais? Agora
          imagine entregar algo <strong>feito à mão</strong>, pensado nos mínimos
          detalhes e que realmente emociona quem recebe. É exatamente isso que os{" "}
          <strong>presentes artesanais</strong> proporcionam.
        </p>

        <div className="w-full mb-6">
          <Image
            src="/assets/tipos-de-artesanato/Toalha-personalizada-bordado-ponto-cruz-nome.jpg"
            alt="Presente artesanal personalizado feito à mão"
            width={800}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
            priority
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          🎁 Por que presentes artesanais encantam tanto?
        </h2>

        <p className="text-slate-600 mb-6">
          Existe um motivo simples: eles carregam <strong>significado</strong>.
          Em um mundo cheio de produtos iguais, dar algo exclusivo mostra cuidado
          e atenção — e isso cria uma conexão emocional imediata.
        </p>

        <ul className="space-y-2 text-slate-600 mb-8">
          <li>✔ Exclusividade: nenhuma peça é igual à outra</li>
          <li>✔ Emoção: transmite carinho e intenção real</li>
          <li>✔ Personalização: feito especialmente para alguém</li>
          <li>✔ Valor percebido muito maior que o preço</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          💡 A diferença entre um presente comum e um inesquecível
        </h2>

        <p className="text-slate-600 mb-6">
          Um presente comum pode ser esquecido em dias. Já um{" "}
          <strong>presente artesanal personalizado</strong> é guardado por anos.
          Ele marca momentos, celebra histórias e se transforma em memória.
        </p>

        <p className="text-slate-600 mb-6">
          É por isso que cada vez mais pessoas estão escolhendo{" "}
          <strong>artesanato feito à mão</strong> para presentear — seja em
          aniversários, datas especiais ou até sem motivo, apenas para
          surpreender.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          ⚡ Ideias de presentes artesanais que fazem sucesso
        </h2>

        <p className="text-slate-600 mb-6">
          Se você quer acertar na escolha, aqui estão algumas opções que estão em
          alta:
        </p>

        <ul className="space-y-2 text-slate-600 mb-8">
          <li>✔ Toalhas bordadas com nome</li>
          <li>✔ Pulseiras artesanais de miçanga</li>
          <li>✔ Chaveiros personalizados</li>
          <li>✔ Acessórios feitos à mão exclusivos</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
          🚀 Garanta um presente único antes que acabe
        </h2>

        <p className="text-slate-600 mb-6">
          Diferente de produtos industriais, peças artesanais têm{" "}
          <strong>produção limitada</strong>. Isso significa que quando acabam…
          podem não voltar iguais.
        </p>

        <p className="text-slate-600 mb-6">
          Se você encontrou algo que combina com a pessoa que quer presentear,
          não deixe para depois. Escolher agora garante que você leve algo
          realmente especial.
        </p>

        <div className="bg-[#2F8F5B] text-white rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold mb-3">
            🎯 Pronto para surpreender de verdade?
          </p>
          <p className="mb-4">
            Escolha agora um presente artesanal exclusivo e transforme um simples
            momento em algo inesquecível.
          </p>
          <a
            href="/produtos"
            className="inline-block bg-white text-[#2F8F5B] px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Ver produtos artesanais
          </a>
        </div>
      </article>
    </main>
  );
}