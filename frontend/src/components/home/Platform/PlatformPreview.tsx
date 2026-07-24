const features = [
  {
    title: "Clientes",
    description:
      "Organize clientes, histórico de serviços e informações importantes em um só lugar.",
    icon: "👥",
  },
  {
    title: "Contratos",
    description:
      "Gerencie contratos, planos e documentos dos serviços realizados.",
    icon: "📄",
  },
  {
    title: "Financeiro",
    description:
      "Controle pagamentos, gastos e acompanhe a saúde da sua operação.",
    icon: "💰",
  },
  {
    title: "Agenda",
    description: "Organize compromissos, entregas e atividades da sua equipe.",
    icon: "📅",
  },
];

export default function PlatformPreview() {
  return (
    <section
      id="platform"
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
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <span
            className="
              text-xs
              uppercase
              tracking-[5px]
              text-primary
            "
          >
            Plataforma Fonseca
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
            Controle sua operação de serviços em
            <span className="text-primary"> um único lugar.</span>
          </h2>

          <p
            className="
              mt-5
              text-secondaryText/70
            "
          >
            Clientes, contratos, financeiro, agenda e comunicação organizados
            para empresas e profissionais que precisam de mais controle no dia a
            dia.
          </p>
        </div>

        {/* Dashboard */}
        <div
          className="
            mt-14
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-card
            p-4
            shadow-2xl
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-bg
              p-6
            "
          >
            {/* Header dashboard */}
            <div
              className="
                mb-6
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    text-secondaryText/60
                  "
                >
                  Dashboard
                </p>

                <h3
                  className="
                    text-xl
                    font-semibold
                    text-secondaryText
                  "
                >
                  Minha operação
                </h3>
              </div>

              <div
                className="
                  rounded-full
                  bg-primary/10
                  px-4
                  py-2
                  text-xs
                  text-primary
                "
              >
                Sistema ativo
              </div>
            </div>

            {/* Cards */}
            <div
              className="
                grid
                gap-4
                md:grid-cols-4
              "
            >
              {features.map((item) => (
                <div
                  key={item.title}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-card
                    p-5
                  "
                >
                  <div
                    className="
                      text-2xl
                    "
                  >
                    {item.icon}
                  </div>

                  <h4
                    className="
                      mt-4
                      font-semibold
                      text-secondaryText
                    "
                  >
                    {item.title}
                  </h4>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-5
                      text-secondaryText/60
                    "
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Atividades */}
            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/10
                bg-card
                p-5
              "
            >
              <p
                className="
                  text-sm
                  text-secondaryText/60
                "
              >
                Atividades recentes
              </p>

              <div
                className="
                  mt-4
                  space-y-3
                "
              >
                {[
                  "Contrato atualizado",
                  "Novo chamado criado",
                  "Pagamento confirmado",
                  "Mensagem agendada para cliente",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-secondaryText
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-primary
                      "
                    />

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
