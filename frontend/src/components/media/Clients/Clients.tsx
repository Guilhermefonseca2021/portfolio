import ClientsRow from "./ClientsRow";

export default function Clients() {
  return (
    <section className="relative overflow-hidden py-6">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-[170px]" />
      </div>

      <div className="mx-auto max-w-7xl px-8">
        {/* Badge */}
        <div className="mb-16 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary shadow-[0_0_12px_#c89bff]" />

            <span className="text-xs font-semibold uppercase tracking-[4px] text-primary">
              TRUSTED BY
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mx-auto max-w-5xl text-center text-3xl font-black leading-tight lg:text-5xl">
          <span className="text-secondaryText">Mais de </span>

          <span
            className="
              bg-gradient-to-r
              from-white
              via-primary
              to-[#8B5CF6]
              bg-clip-text
              text-transparent
            "
          >
            50 empresas
          </span>

          <br />

          <span className="text-secondaryText">
            confiaram no nosso trabalho.
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-secondaryText/70">
          Produzimos conteúdo estratégico para concessionárias, restaurantes,
          cafeterias, joalherias, clínicas, eventos, influenciadores e empresas
          que desejam vender mais através das redes sociais.
        </p>

        {/* Logos */}
        <div className="relative mt-20 overflow-hidden">
          {/* Fade esquerda */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-40 bg-gradient-to-r from-bg via-bg/80 to-transparent" />

          {/* Fade direita */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-40 bg-gradient-to-l from-bg via-bg/80 to-transparent" />

          <ClientsRow />
        </div>
      </div>
    </section>
  );
}
