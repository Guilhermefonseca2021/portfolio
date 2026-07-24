const items = [
  {
    title: "Estratégia antes da execução",
    description:
      "Entendemos seus objetivos, identificamos oportunidades e construímos um caminho claro para sua marca crescer.",
    icon: "🎯",
  },
  {
    title: "Profissionais conectados",
    description:
      "Tenha acesso a especialistas preparados para transformar ideias em projetos reais com acompanhamento completo.",
    icon: "🤝",
  },
  {
    title: "Resultados acompanhados",
    description:
      "Acompanhe cada etapa do projeto, visualize entregas e tenha controle sobre tudo que está sendo desenvolvido.",
    icon: "📈",
  },
];

export default function Solution() {
  return (
    <section
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
              uppercase
              tracking-[5px]
              text-primary
            "
          >
            Como trabalhamos
          </span>

          <h2
            className="
              mt-4
              text-4xl
              font-bold
              leading-tight
              text-secondaryText
              md:text-5xl
            "
          >
            Transformamos ideias em
            <span className="text-primary">
              {" "}
              projetos que geram resultados.
            </span>
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-secondaryText/70
              leading-7
            "
          >
            A Fonseca une estratégia, especialistas e tecnologia para ajudar
            empresas a criarem uma presença digital forte e uma operação mais
            organizada.
          </p>
        </div>

        <div
          className="
            mt-12
            grid
            gap-5
            md:grid-cols-3
          "
        >
          {items.map((item) => (
            <article
              key={item.title}
              className="
                rounded-3xl
                border
                border-white/10
                bg-card
                p-6
                transition
                hover:border-primary/30
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
                {item.icon}
              </div>

              <h3
                className="
                  mt-5
                  text-xl
                  font-semibold
                  text-secondaryText
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-secondaryText/70
                "
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
