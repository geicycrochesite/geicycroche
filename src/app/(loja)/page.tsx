import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full bg-[#000000] text-[#EADCC6]">

      {/* HERO */}
      <section className="relative w-full min-h-[86vh] flex items-center py-8">

        {/* BACKGROUND */}
        <Image
          src="/bg-gc-croche-com-elegancia-e-estilo.png"
          alt="Crochê elegante feito à mão Geicy Crochê"
          fill
          priority
          className="object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <Image
              src="/logo-geicy-croche-vertical.png"
              alt="Geicy Crochê logo"
              width={220}
              height={120}
              className="mb-6"
            />

            <Image
              src="/txt-gc-croche-com-estilo-e-elegancia.png"
              alt="Crochê com estilo e elegância"
              width={500}
              height={200}
              className="mb-6"
            />

            <p className="text-sm md:text-base max-w-md mb-8 text-[#D6C7A8]">
              Peças exclusivas feitas à mão com amor e dedicação. Roupas,
              acessórios e itens para casa que transformam seu dia a dia
              com elegância.
            </p>

            <a
              href="https://wa.me/5521986369426"
              className="inline-block px-6 py-3 border border-[#C8A96A] text-[#C8A96A] hover:bg-[#C8A96A] hover:text-black transition rounded"
            >
              Conheça nossas peças
            </a>
          </div>

          {/* ESPAÇO DIREITA (imagem já está no bg) */}
          <div />
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold mb-10">
            Peças Artesanais em Crochê
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-[#111] p-6 rounded-xl border border-[#222] hover:border-[#C8A96A] transition">
              <h3 className="text-xl mb-2">Roupas em Crochê</h3>
              <p className="text-sm text-[#B8A98A]">
                Saídas de praia, blusas e peças exclusivas feitas sob medida.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-xl border border-[#222] hover:border-[#C8A96A] transition">
              <h3 className="text-xl mb-2">Acessórios</h3>
              <p className="text-sm text-[#B8A98A]">
                Bolsas, cintos, lenços e detalhes únicos para seu estilo.
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-xl border border-[#222] hover:border-[#C8A96A] transition">
              <h3 className="text-xl mb-2">Itens para Casa</h3>
              <p className="text-sm text-[#B8A98A]">
                Jogos de banheiro, cozinha, passadeiras e decoração artesanal.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-20 px-6 bg-[#0F0F0F] text-center">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl md:text-4xl mb-6">
            Crochê com Qualidade e Sofisticação
          </h2>

          <p className="text-[#CFC2A8] leading-relaxed">
            Cada peça é feita manualmente, com atenção aos mínimos detalhes.
            Trabalhamos com materiais selecionados para garantir beleza,
            durabilidade e exclusividade em cada criação.
            Ideal para presentear ou transformar seu ambiente.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl md:text-4xl mb-6">
            Faça sua encomenda personalizada
          </h2>

          <p className="mb-8 text-[#CFC2A8]">
            Fale direto no WhatsApp e peça sua peça sob medida.
          </p>

          <a
            href="https://wa.me/5521986369426"
            className="inline-block px-8 py-4 text-black bg-[#C8A96A] hover:bg-[#b8954f] transition rounded"
          >
            Pedir no WhatsApp
          </a>

        </div>
      </section>

    </main>
  );
}