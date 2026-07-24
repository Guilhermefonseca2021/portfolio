import { servicesItems } from "./servicesItems";

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="
        bg-bg
        py-20
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >
        <div className="max-w-3xl">
          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[5px]
              text-primary
            "
          >
            Serviços
          </span>

          <h2
            className="
              mt-4
              text-4xl
              font-bold
              tracking-tight
              text-secondaryText
              md:text-5xl
            "
          >
            Soluções digitais para
            <span className="text-primary"> empresas modernas.</span>
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-secondaryText/70
            "
          >
            Da criação ao crescimento, entregamos especialistas, tecnologia e
            estratégia para transformar ideias em resultados.
          </p>
        </div>

        <div
          className="
            mt-12
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {servicesItems.map((service) => (
            <article
              key={service.id}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-card
                p-6
                transition
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-xl
                "
              >
                {service.icon}
              </div>

              <h3
                className="
                  mt-5
                  text-xl
                  font-semibold
                  text-secondaryText
                "
              >
                {service.title}
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-secondaryText/70
                "
              >
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
