import { FiCheck, FiMessageCircle } from "react-icons/fi";
import MotionReveal from "./MotionReveal";

const plans = [
  {
    name: "Eventos",
    price: "A partir de R$ 400",
    description:
      "Cobertura para transformar seu evento em conteúdo que continua circulando.",
    featured: false,
    features: [
      "Captação no evento",
      "Stories e bastidores",
      "Fotos e vídeos verticais",
      "Entrega organizada",
    ],
  },
  {
    name: "Base",
    price: "A partir de R$ 800/mês",
    description:
      "O essencial para manter seu perfil ativo, claro e profissional.",
    featured: false,
    features: [
      "Planejamento mensal",
      "Calendário editorial",
      "Artes e vídeos",
      "Legendas e direcionamento",
    ],
  },
  {
    name: "Completo",
    price: "A partir de R$ 1.200/mês",
    description:
      "Gestão estratégica para marcas que querem crescer com consistência.",
    features: [
      "Gestão de perfil",
      "Conteúdo e publicação",
      "Captação periódica",
      "Relatórios e ajustes",
    ],
    featured: true,
  },
  {
    name: "Tráfego pago",
    price: "Sob medida",
    description:
      "Campanhas pensadas para ampliar alcance, gerar demanda e acelerar resultados.",
    featured: false,
    features: [
      "Estratégia de campanhas",
      "Criação e testes de anúncios",
      "Otimização contínua",
      "Leitura de resultados",
    ],
  },
] as const;

export default function SocialPlans() {
  function handlePlanClick(planName: string) {
    const event = new CustomEvent("social-plan:selected", {
      detail: { plan: planName },
    });

    window.dispatchEvent(event);
  }

  return (
    <section
      id="planos"
      className="border-y border-white/10 bg-[#0d1729] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <MotionReveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Planos e soluções
          </span>
          <h2 className="social-display mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
            Escolha o ponto de partida.{" "}
            <span className="impact-gradient">A estratégia acompanha.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Valores iniciais para orientar sua decisão. Montamos o escopo final
            de acordo com o momento e os objetivos da sua marca.
          </p>
        </MotionReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <MotionReveal key={plan.name} delay={index * 0.05}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-6 ${plan.featured ? "featured-plan border-primary/70 bg-primary/[.08]" : "border-white/10 bg-white/[.035]"}`}
              >
                {plan.featured && (
                  <span className="featured-badge absolute right-4 top-4 rounded-full border border-sky-300/60 bg-sky-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200">
                    Mais forte
                  </span>
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-4 text-2xl font-black ${plan.featured ? "bg-gradient-to-r from-sky-200 via-white to-cyan-300 bg-clip-text text-transparent" : "text-primary"}`}
                  >
                    {plan.price}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/60">
                    {plan.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2 text-sm text-white/80"
                      >
                        <FiCheck
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handlePlanClick(plan.name)}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-[18px] px-4 py-2.5 text-sm font-extrabold tracking-[-0.01em] transition ${plan.featured ? "border border-sky-300/60 bg-gradient-to-r from-primary via-sky-500 to-cyan-400 text-white shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:shadow-[0_0_28px_rgba(14,165,233,0.6)]" : "border border-white/15 bg-white/[0.02] text-white hover:border-primary hover:bg-primary hover:shadow-[0_0_24px_rgba(0,113,227,0.32)]"}`}
                >
                  Conversar sobre este plano{" "}
                  <FiMessageCircle aria-hidden="true" />
                </button>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
