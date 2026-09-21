export default function ProblemSection() {
  const problems = [
    {
      title: "Postar não é estratégia",
      description:
        "Publicar sem direção não constrói uma marca forte. Cada conteúdo precisa ter um objetivo claro.",
    },

    {
      title: "Seguidores não significam vendas",
      description:
        "Uma audiência sem posicionamento não gera conexão, confiança ou oportunidades reais.",
    },

    {
      title: "Sua marca precisa ser lembrada",
      description:
        "Marcas fortes não apenas aparecem. Elas criam presença, autoridade e reconhecimento.",
    },
  ];

  return (
    <section
      id="problem"
      className="
      relative
      overflow-hidden
      bg-bg
      py-16
      md:py-24
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
        pointer-events-none
        absolute
        -left-40
        top-20
        h-[500px]
        w-[500px]
        rounded-full
        bg-primary/10
        blur-[160px]
        "
      />

      <div
        className="
        pointer-events-none
        absolute
        right-[-150px]
        bottom-0
        h-[600px]
        w-[600px]
        rounded-full
        bg-primary/5
        blur-[180px]
        "
      />

      {/* GRID TEXTURE */}

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        opacity-[0.03]
        "
      >
        <div
          className="
          h-full
          w-full
          bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          bg-[size:80px_80px]
          "
        />
      </div>

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
            text-sm
            font-semibold
            uppercase
            tracking-[5px]
            text-primary
            "
          >
            Estratégia
          </span>

          <h2
            className="
          mt-4
          text-4xl
            font-bold
            leading-tight
            tracking-tight
            text-secondaryText
            md:text-6xl
            "
          >
            O problema não é falta
            <br />
            de conteúdo.
            <br />
            <span className="text-primary">É falta de estratégia.</span>
          </h2>

          <p
            className="
            mt-6
            max-w-xl
            text-lg
            leading-8
            text-secondaryText/70
            "
          >
            Muitas marcas aparecem todos os dias, mas poucas criam uma
            comunicação capaz de gerar percepção, autoridade e valor.
          </p>
        </div>

        <div
          className="
          relative
          mt-12
          max-w-2xl
          "
        >
          {/* LINHA */}

          <div
            className="
            absolute
            left-[11px]
            top-3
            h-[calc(100%-24px)]
            w-px
            bg-white/10
            "
          />

          <div
            className="
            space-y-10
            "
          >
            {problems.map((item) => (
              <article
                key={item.title}
                className="
                  group
                  relative
                  flex
                  gap-6
                  "
              >
                <div
                  className="
                    relative
                    z-10
                    mt-1
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-primary/40
                    bg-bg
                    "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-primary
                      transition
                      duration-300
                      group-hover:scale-150
                      "
                  />
                </div>

                <div>
                  <h3
                    className="
                      text-xl
                      font-semibold
                      text-secondaryText
                      transition
                      duration-300
                      group-hover:text-primary
                      "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-lg
                      leading-7
                      text-secondaryText/60
                      "
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
