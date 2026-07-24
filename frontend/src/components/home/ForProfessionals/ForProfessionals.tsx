const benefits = [
  {
    title: "Centralize seus clientes",
    description:
      "Organize dados, histórico, serviços contratados, documentos e informações importantes de cada cliente.",
    icon: "👥",
  },
  {
    title: "Controle contratos e financeiro",
    description:
      "Gerencie contratos ativos, planos, pagamentos recebidos, valores pendentes e gastos da operação.",
    icon: "💰",
  },
  {
    title: "Organize agenda e comunicação",
    description:
      "Controle reuniões, entregas, prazos e automatize mensagens e lembretes para seus clientes.",
    icon: "📅",
  },
];

export default function ForProfessionals() {
  return (
    <section
      id="professionals"
      className="
        bg-bg
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
          {/* Dashboard */}
          <div
            className="
              order-2
              rounded-3xl
              border
              border-white/10
              bg-card
              p-6
              lg:order-1
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-bg
                p-5
              "
            >
              <p
                className="
                  text-sm
                  text-secondaryText/60
                "
              >
                Painel profissional
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-secondaryText
                "
              >
                Minha operação
              </h3>

              <div
                className="
                  mt-6
                  grid
                  gap-3
                "
              >
                {[
                  ["Clientes ativos", "28"],
                  ["Contratos", "12"],
                  ["Pagamentos pendentes", "04"],
                  ["Mensagens agendadas", "36"],
                ].map(([title, value]) => (
                  <div
                    key={title}
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-card
                      p-4
                    "
                  >
                    <p
                      className="
                        text-xs
                        text-secondaryText/60
                      "
                    >
                      {title}
                    </p>

                    <strong
                      className="
                        mt-1
                        block
                        text-2xl
                        text-primary
                      "
                    >
                      {value}
                    </strong>
                  </div>
                ))}
              </div>

              <div
                className="
                  mt-5
                  rounded-xl
                  border
                  border-white/10
                  bg-card
                  p-4
                "
              >
                <p
                  className="
                    text-xs
                    text-secondaryText/60
                  "
                >
                  Atividades recentes
                </p>

                <div
                  className="
                    mt-3
                    space-y-2
                    text-sm
                    text-secondaryText
                  "
                >
                  <p>✓ Contrato renovado com cliente</p>
                  <p>✓ Pagamento registrado</p>
                  <p>✓ Mensagem enviada automaticamente</p>
                </div>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div
            className="
              order-1
              lg:order-2
            "
          >
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[5px]
                text-primary
              "
            >
              Para profissionais
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
              Pare de perder tempo organizando tudo em vários lugares.
              <span className="text-primary">
                {" "}
                Tenha sua operação centralizada.
              </span>
            </h2>

            <p
              className="
                mt-5
                leading-7
                text-secondaryText/70
              "
            >
              A Fonseca foi criada para profissionais que já possuem clientes e
              precisam de mais controle sobre contratos, financeiro, agenda,
              arquivos e comunicação.
            </p>

            <div
              className="
                mt-8
                space-y-4
              "
            >
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="
                    flex
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
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
                        mt-1
                        text-sm
                        text-secondaryText/70
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

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
              Organizar minha operação
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
