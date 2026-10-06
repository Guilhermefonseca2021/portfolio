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
          px-6
        "
      >
        <MotionReveal>
          <div
            className="
            max-w-3xl
          "
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[5px]">
              O que fazemos
            </span>

            <h2
              className="
              mt-3
              text-[1.7rem]
              font-bold
              leading-[1.08]
              tracking-tight
              text-white
              sm:mt-5 sm:text-4xl
              lg:text-5xl
            "
            >
              Soluções completas para construir
              <span className="text-primary"> uma marca memorável.</span>
            </h2>

            <p
              className="
              mt-3
              max-w-2xl
              text-base
              leading-6
              text-white/70
            "
            >
              Estratégia e conteúdo para fortalecer sua marca e chegar às
              pessoas certas.
            </p>
          </div>
        </MotionReveal>

        <div
          className="
            mt-6
            grid
            grid-cols-2 gap-3 sm:grid-cols-1 md:grid-cols-2 md:gap-x-12 md:gap-y-4
          "
        >
          {services.map((service, index) => (
            <MotionReveal key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} />
            </MotionReveal>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
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
