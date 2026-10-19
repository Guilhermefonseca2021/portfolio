import { FiArrowUpRight } from "react-icons/fi";
import MotionReveal from "../MotionReveal";
import ClientsRow from "./ClientsRow";

export default function Clients() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1220] pb-8 pt-8 text-white sm:pb-16 sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Badge */}
        <div className="mb-6 flex justify-center sm:mb-16">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary shadow-[0_0_12px_#c89bff]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xs sm:tracking-[4px]">
              EMPRESAS QUE CONFIARAM
            </span>
          </div>
        </div>

        {/* Title */}
        <MotionReveal>
          <h2 className="mx-auto max-w-5xl text-center text-[1.7rem] font-black leading-[1.08] tracking-[-0.04em] sm:text-3xl lg:text-5xl">

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

            <span className="text-white"> confiam no nosso trabalho.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-6 text-white/75 sm:mt-8 sm:text-lg sm:leading-8">
            Conteúdo estratégico para marcas que querem vender mais.
          </p>
        </MotionReveal>

        {/* Logos */}
        <div className="relative mt-6 overflow-hidden sm:mt-10">
          {/* Fade esquerda */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/85 to-transparent sm:w-28" />

          {/* Fade direita */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l sm:w-28 from-[#0b1220] via-[#0b1220]/85 to-transparent" />

          <ClientsRow />
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <a
            href="#contact"
            className="brand-button inline-flex items-center gap-2 rounded-[18px] bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
          >
            Quero fortalecer minha marca
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
