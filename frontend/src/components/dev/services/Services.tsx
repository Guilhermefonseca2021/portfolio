import { services } from "../../data/services";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section
      id="services"
      className="py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">

          <span className="font-semibold uppercase tracking-[4px] text-primary">
            Serviços
          </span>

          <h2 className="mt-4 text-5xl font-bold text-secondaryText">
            Soluções para Empresas
          </h2>

          <p className="mt-6 text-secondaryText/70">
            Desenvolvimento de software sob medida para acelerar
            negócios, reduzir custos e automatizar processos.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}

        </div>

      </div>
    </section>
  );
}