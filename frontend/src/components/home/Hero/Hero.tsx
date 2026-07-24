export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-bg
        pt-40
        pb-24
      "
    >
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-primary/20
          blur-[160px]
        "
      />

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
          <span
            className="
              inline-flex
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-4
              py-1.5
              text-xs
              font-medium
              text-primary
            "
          >
            Gestão de serviços digitais B2B
          </span>

          <h1
            className="
              mt-8
              text-5xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-secondaryText
              md:text-7xl
            "
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
      </div>
    </section>
  );
}
