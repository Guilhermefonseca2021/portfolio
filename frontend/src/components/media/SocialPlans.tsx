import { FiCheck, FiMessageCircle } from "react-icons/fi";
import MotionReveal from "./MotionReveal";

const plans = [
  {
    name: "Eventos",
    description: "Conteúdo em movimento para eventos que merecem ser lembrados.",
    featured: false,
    features: [
      "Captação no evento",
      "Stories e bastidores",
    ],
  },
  {
    name: "Base",
    description: "Presença consistente para marcas em crescimento.",
    featured: false,
    features: [
      "Presença mensal",
      "Direção visual",
    ],
  },
  {
    name: "Completo",
    description: "Gestão e criação alinhadas aos objetivos da marca.",
    features: [
      "Gestão de perfil",
      "Conteúdo proprietário",
    ],
    featured: true,
  },
  {
    name: "Tráfego pago",
    description: "Campanhas para ampliar alcance e gerar demanda.",
    featured: false,
    features: [
      "Campanhas digitais",
      "Otimização contínua",
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
      className="border-y border-white/10 bg-[#0d1729] py-12 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <MotionReveal className="max-w-3xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[0.28em]">
            A estratégia em prática
          </span>
          <h2 className="social-display mt-3 text-[1.7rem] font-bold leading-[1.1] tracking-[-0.045em] text-white sm:mt-5 sm:text-5xl">
            Social Media como uma{" "}
            <span className="impact-gradient">estratégia integrada.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-6 text-white/65 sm:mt-5 sm:text-lg sm:leading-8">
            Conteúdo e gestão conectados aos objetivos da marca.
          </p>
        </MotionReveal>
        <div className="mt-7 grid grid-cols-2 gap-2.5 md:mt-12 md:gap-4 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <MotionReveal key={plan.name} delay={index * 0.05}>
              <article
                className={`relative flex h-full flex-col rounded-xl border p-4 sm:rounded-2xl sm:p-6 ${plan.featured ? "featured-plan border-primary/70 bg-primary/[.08]" : "border-white/10 bg-white/[.035]"}`}
              >
                <div className="flex-1">
                  <h3 className="text-base font-semibold leading-tight text-white sm:text-xl">
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-4 text-white/60 sm:mt-3 sm:text-sm sm:leading-6">
                    {plan.description}
                  </p>
                  <ul className="mt-2.5 space-y-1.5 sm:mt-6 sm:space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-1.5 text-[11px] leading-4 text-white/80 sm:gap-2 sm:text-sm"
                      >
                        <FiCheck
                          className="mt-0.5 size-3.5 shrink-0 text-primary sm:size-4"
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
                  className={`mt-3 inline-flex items-center justify-center gap-1.5 rounded-[14px] px-2 py-2 text-[10px] font-extrabold tracking-[-0.01em] transition sm:mt-8 sm:gap-2 sm:rounded-[18px] sm:px-4 sm:py-2.5 sm:text-sm ${plan.featured ? "border border-sky-300/60 bg-gradient-to-r from-primary via-sky-500 to-cyan-400 text-white shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:shadow-[0_0_28px_rgba(14,165,233,0.6)]" : "border border-white/15 bg-white/[0.02] text-white hover:border-primary hover:bg-primary hover:shadow-[0_0_24px_rgba(0,113,227,0.32)]"}`}
                >
                  <span className="sm:hidden">Incluir plano</span>
                  <span className="hidden sm:inline">Incluir no orçamento</span>
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
