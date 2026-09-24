import MotionReveal from "../MotionReveal";
import ClientsRow from "./ClientsRow";

export default function Clients() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1220] pb-12 pt-14 text-white sm:pb-16 sm:pt-16">
      <div className="mx-auto max-w-7xl px-8">
        {/* Badge */}
        <div className="mb-10 flex justify-center sm:mb-16">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary shadow-[0_0_12px_#c89bff]" />

            <span className="text-xs font-semibold uppercase tracking-[4px] text-white/80">
              TRUSTED BY
            </span>
          </div>
        </div>

        {/* Title */}
        <MotionReveal>
          <h2 className="mx-auto max-w-5xl text-center text-3xl font-black leading-tight lg:text-5xl">
            <span className="text-white">Mais de </span>

            <span
              className="
              bg-gradient-to-r
              from-white
              via-sky-200
              to-blue-400
              bg-clip-text
              text-transparent
            "
            >
              +200 empresas
            </span>

            <br />

            <span className="text-white">confiaram no nosso trabalho.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-white/75">
            Produzimos conteúdo estratégico para concessionárias, restaurantes,
            cafeterias, joalherias, clínicas, eventos, influenciadores e
            empresas que desejam vender mais através das redes sociais.
          </p>
        </MotionReveal>

        {/* Logos */}
        <div className="relative mt-8 overflow-hidden sm:mt-10">
          {/* Fade esquerda */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/85 to-transparent sm:w-28" />

          {/* Fade direita */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l sm:w-28 from-[#0b1220] via-[#0b1220]/85 to-transparent" />

          <ClientsRow />
        </div>
      </div>
    </section>
  );
}
