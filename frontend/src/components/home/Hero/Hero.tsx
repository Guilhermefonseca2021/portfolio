export default function Hero() {
  return (
    <section
      className="apple-gradient relative overflow-hidden pb-28 pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/apple-hero-texture.png')] bg-cover bg-center opacity-45 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#f5f5f7]" />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
        "
      >
        <div
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" /> Gestão de serviços digitais B2B
          </span>

          <h1
            className="display-type mt-8 text-5xl font-medium leading-[.98] tracking-tight text-secondaryText md:text-8xl"
          >
            Organize serviços,
            <br />
            <span className="text-primary">clientes e profissionais</span>
            <br />
            em um único lugar.
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-secondaryText/70
            "
          >
            A Fonseca conecta empresas e profissionais de serviços digitais
            através de uma plataforma para gerenciar contratos, solicitações,
            entregas, pagamentos e toda operação.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              justify-center
              gap-4
              sm:flex-row
            "
          >
            <button
              className="
                rounded-full
                bg-primary
                px-8
                py-3.5
                font-semibold
                text-primaryText
                transition
                hover:scale-105
              "
            >
              Conhecer a plataforma
            </button>

            <button
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-8
                py-3.5
                font-semibold
                text-secondaryText
                transition
                hover:border-primary/40
              "
            >
              Sou profissional
            </button>
          </div>
        </div>
          <div className="floating-card mx-auto mt-16 flex max-w-md items-center justify-between rounded-2xl px-5 py-4 text-left text-sm text-secondaryText/75">
            <span><strong className="block text-secondaryText">Operação mais simples.</strong> Tudo conectado em uma única plataforma.</span>
            <span className="ml-4 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primaryText">→</span>
          </div>
        </div>
    </section>
  );
}
