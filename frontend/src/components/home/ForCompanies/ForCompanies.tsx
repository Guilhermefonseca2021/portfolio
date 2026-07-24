const benefits = [
  {
    title: "Acompanhe profissionais e entregas",
    description:
      "Visualize serviços contratados, etapas dos projetos, entregas realizadas e todo histórico da sua empresa.",
    icon: "📊",
  },
  {
    title: "Solicite novos serviços",
    description:
      "Abra demandas, envie informações e acompanhe pedidos como fotos, vídeos, eventos e projetos digitais.",
    icon: "📌",
  },
  {
    title: "Centralize sua operação",
    description:
      "Consulte contratos, planos, pagamentos e documentos sem depender de várias conversas espalhadas.",
    icon: "🏢",
  },
];

export default function ForCompanies() {
  return (
    <section
      id="companies"
      className="
        bg-background
        py-24
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-2
          "
        >
          {/* Texto */}
          <div>
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[5px]
                text-primary
              "
            >
              Para empresas
            </span>

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                leading-tight
                text-secondaryText
                md:text-5xl
              "
            >
              Gerencie seus serviços contratados em
              <span className="text-primary"> um único lugar.</span>
            </h2>

            <p
              className="
                mt-5
                max-w-xl
                leading-7
                text-secondaryText/70
              "
            >
              A Fonseca organiza a relação entre sua empresa e os profissionais
              responsáveis pelos seus projetos. Acompanhe contratos,
              solicitações, entregas e pagamentos através de uma plataforma
              simples e centralizada.
            </p>

            <button
              className="
                mt-8
                rounded-full
                bg-primary
                px-7
                py-3
                font-semibold
                text-primaryText
                transition
                hover:scale-105
              "
            >
              Gerenciar minha empresa
            </button>
          </div>

          {/* Cards */}
          <div
            className="
              grid
              gap-4
            "
          >
            {benefits.map((item) => (
              <article
                key={item.title}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-card
                  p-5
                  transition
                  hover:border-primary/40
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                      text-xl
                    "
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-secondaryText
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-secondaryText/70
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
