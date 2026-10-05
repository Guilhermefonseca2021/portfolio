import { FiArrowUpRight } from "react-icons/fi";
import MotionReveal from "../MotionReveal";
import ServiceCard from "./ServiceCard";
import services from "./servicesItems";

export default function Services() {
  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#0b1220]
        py-6
        md:py-6
      "
    >
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-8
        "
      >
        <MotionReveal>
          <div
            className="
            max-w-3xl
          "
          >
            <span className="text-xs font-semibold uppercase tracking-[5px] text-primary">
              O que fazemos
            </span>

            <h2
              className="
              mt-5
              text-3xl
              font-bold
              leading-[1.1]
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
            >
              Soluções completas para construir
              <span className="text-primary"> uma marca memorável.</span>
            </h2>

            <p
              className="
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-white/70
            "
            >
              Não produzimos apenas conteúdo. Desenvolvemos estratégias que
              fortalecem sua presença, aumentam autoridade e aproximam sua marca
              das pessoas certas.
            </p>
          </div>
        </MotionReveal>

        <div
          className="
            mt-10
            grid
            gap-6
            md:grid-cols-2 md:gap-x-12
          "
        >
          {services.map((service, index) => (
            <MotionReveal key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} />
            </MotionReveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/60">
            Já sabe o que precisa? Vamos definir o melhor escopo.
          </p>
          <a
            href="#contact"
            className="brand-button inline-flex items-center justify-center gap-2 self-start rounded-[18px] bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90 sm:self-auto"
          >
            Pedir orçamento <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
