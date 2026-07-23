import ServiceCard from "./ServiceCard";
import services from "./servicesItems";

export default function Services() {
  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-bg
        py-6
        md:py-6
      "
    >
      {/* transição suave */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-32
          bg-gradient-to-b
          from-background/0
          to-bg/40
        "
      />

      {/* glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-40
          h-[450px]
          w-[450px]
          -translate-x-1/2
          rounded-full
          bg-primary/5
          blur-[160px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-8
        "
      >
        <div
          className="
            max-w-3xl
          "
        >
          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[6px]
              text-primary
            "
          >
            Serviços
          </span>

          <h2
            className="
              mt-5
              text-4xl
              font-bold
              leading-[1.1]
              tracking-tight
              text-secondaryText
              md:text-6xl
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
              text-secondaryText/70
            "
          >
            Não produzimos apenas conteúdo. Desenvolvemos estratégias que
            fortalecem sua presença, aumentam autoridade e aproximam sua marca
            das pessoas certas.
          </p>
        </div>

        <div
          className="
            mt-14
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
