import { motion } from "framer-motion";
import MotionReveal from "../MotionReveal";

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
      bg-[#0b1220]
      py-12
      md:py-16
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
        <MotionReveal
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
          text-3xl
            font-bold
            leading-tight
            tracking-tight
            text-white
            sm:text-4xl
            lg:text-5xl
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
            text-white/70
            "
          >
            Muitas marcas aparecem todos os dias, mas poucas criam uma
            comunicação capaz de gerar percepção, autoridade e valor.
          </p>
        </MotionReveal>

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
              <motion.article
                key={item.title}
                className="
                  group
                  relative
                  flex
                  gap-6
                  "
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
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
                    bg-[#0b1220]
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
                      text-white
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
                      text-white/60
                      "
                  >
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
