import { FiCheck, FiMessageCircle } from "react-icons/fi";
import MotionReveal from "./MotionReveal";

const plans = [
  { name: "Eventos", price: "A partir de R$ 400", description: "Cobertura para transformar seu evento em conteúdo que continua circulando.", featured: false, features: ["Captação no evento", "Stories e bastidores", "Fotos e vídeos verticais", "Entrega organizada" ] },
  { name: "Base", price: "A partir de R$ 800/mês", description: "O essencial para manter seu perfil ativo, claro e profissional.", featured: false, features: ["Planejamento mensal", "Calendário editorial", "Artes e vídeos", "Legendas e direcionamento" ] },
  { name: "Completo", price: "A partir de R$ 1.200/mês", description: "Gestão estratégica para marcas que querem crescer com consistência.", features: ["Gestão de perfil", "Conteúdo e publicação", "Captação periódica", "Relatórios e ajustes" ], featured: true },
  { name: "Tráfego pago", price: "Sob medida", description: "Campanhas pensadas para ampliar alcance, gerar demanda e acelerar resultados.", featured: false, features: ["Estratégia de campanhas", "Criação e testes de anúncios", "Otimização contínua", "Leitura de resultados" ] },
] as const;

export default function SocialPlans() {
  return (
    <section id="planos" className="border-y border-white/10 bg-[#0d1729] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <MotionReveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Planos e soluções</span>
          <h2 className="social-display mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">Escolha o ponto de partida. <span className="text-primary">A estratégia acompanha.</span></h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">Valores iniciais para orientar sua decisão. Montamos o escopo final de acordo com o momento e os objetivos da sua marca.</p>
        </MotionReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <MotionReveal key={plan.name} delay={index * 0.05}>
              <article className={`flex h-full flex-col spotlight-card rounded-2xl border p-6 ${plan.featured ? "border-primary/60 bg-primary/[.1] shadow-[0_0_32px_rgba(0,113,227,.15)]" : "border-white/10 bg-white/[.035]"}`}>
                <div className="flex-1"><h3 className="text-xl font-semibold text-white">{plan.name}</h3><p className="mt-4 text-2xl font-bold text-primary">{plan.price}</p><p className="mt-4 text-sm leading-6 text-white/60">{plan.description}</p><ul className="mt-6 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-sm text-white/80"><FiCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{feature}</li>)}</ul></div>
                <a href="#contact" className="mt-8 inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/15 shadow-[0_0_0_rgba(0,113,227,0)] hover:shadow-[0_0_24px_rgba(0,113,227,0.32)] px-4 py-2.5 text-sm font-extrabold tracking-[-0.01em] text-white transition hover:border-primary hover:bg-primary">Conversar sobre este plano <FiMessageCircle aria-hidden="true" /></a>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
