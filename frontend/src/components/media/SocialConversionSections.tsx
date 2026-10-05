import { useState } from "react";
import {
  FiArrowUpRight,
  FiBarChart2,
  FiCheck,
  FiCompass,
  FiLayers,
  FiPenTool,
  FiShield,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import MotionReveal from "./MotionReveal";

const benefits = [
  [
    FiTarget,
    "Conteúdo com direção",
    "Cada peça nasce de um objetivo: posicionar, conectar ou gerar oportunidade.",
  ],
  [
    FiPenTool,
    "Identidade consistente",
    "Uma linguagem visual reconhecível em todos os pontos de contato da marca.",
  ],
  [
    FiBarChart2,
    "Decisões com dados",
    "Acompanhamento de métricas para ajustar a estratégia com clareza.",
  ],
  [
    FiTrendingUp,
    "Presença que cresce",
    "Mais organização, autoridade e consistência para sua marca aparecer melhor.",
  ],
] as const;

const steps = [
  "Diagnóstico",
  "Estratégia",
  "Planejamento",
  "Produção",
  "Publicação",
  "Análise",
];
const included = [
  "Planejamento editorial",
  "Calendário de conteúdo",
  "Criação de artes e vídeos",
  "Legendas e direcionamento",
  "Publicação organizada",
  "Relatórios e ajustes",
];
const faqs = [
  [
    "Vocês criam as artes e os vídeos?",
    "Sim. O escopo é definido no diagnóstico e pode incluir peças estáticas, vídeos e direcionamento visual.",
  ],
  [
    "Preciso fornecer as imagens?",
    "Você pode enviar materiais da marca, mas também orientamos a produção e organização dos recursos necessários.",
  ],
  [
    "Vocês publicam o conteúdo?",
    "Sim, quando essa etapa fizer parte do escopo contratado. Tudo é alinhado no planejamento.",
  ],
  [
    "Como começo?",
    "Preencha o formulário de contato ao final da página. A Fonseca entende o cenário e prepara uma proposta personalizada.",
  ],
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
      {children}
    </span>
  );
}

export default function SocialConversionSections() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      <section className="relative overflow-hidden border-y border-white/10 bg-[#0d1729] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-10 grid gap-5 md:grid-cols-2">
            <div className="relative min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#101d33]">
              <img
                src="/portfolio/media/fonseca-retrato.jpg"
                alt="Retrato do profissional da Fonseca Social Media"
                loading="lazy"
                className="parallax-media absolute inset-0 h-full w-full object-cover object-[center_28%]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[.22em] text-white/75">
                Estratégia com rosto e presença
              </span>
            </div>
            <div className="relative min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#101d33]">
              <img
                src="/portfolio/media/honda-social.jpg"
                alt="Profissional criando conteúdo em uma concessionária"
                loading="lazy"
                className="parallax-media absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[.22em] text-white/75">
                Conteúdo que acontece no mundo real
              </span>
            </div>
          </div>

          <MotionReveal className="max-w-3xl">
            <SectionLabel>Por que a Fonseca</SectionLabel>
            <h2 className="social-display mt-4 text-3xl font-bold text-white sm:text-5xl">
              Sua marca não precisa de mais posts.{" "}
              <span className="text-primary">Precisa de presença.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
              Unimos estratégia, design e acompanhamento para construir valor de
              forma consistente.
            </p>
          </MotionReveal>

          <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([Icon, title, description], index) => (
              <MotionReveal key={title} delay={index * 0.06}>
                <article className="h-full border-l border-primary/40 pl-4">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel>Como funciona</SectionLabel>
                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Do primeiro insight à análise.
                </h3>
              </div>
              <span className="text-sm text-white/50">
                Um processo, seis etapas.
              </span>
            </div>
            <ol className="mt-7 grid grid-cols-2 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-3 border-white/10 pr-3 lg:border-r"
                >
                  <span className="text-xs font-bold text-primary">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium text-white/85">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0d1729] py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <MotionReveal>
            <SectionLabel>O que está incluso</SectionLabel>
            <h2 className="social-display mt-4 text-3xl font-bold text-white sm:text-5xl">
              Tudo organizado para sua marca{" "}
              <span className="text-primary">comunicar melhor.</span>
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-white/60">
              Um serviço pensado para tirar o peso da operação e dar clareza
              para cada próximo passo.
            </p>
          </MotionReveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-white/10 py-3 text-sm text-white/80"
              >
                <FiCheck
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#0b1220] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <MotionReveal>
            <SectionLabel>Estratégia + design + dados</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-5xl">
              Mídias sociais pensadas como{" "}
              <span className="text-primary">produto de marca.</span>
            </h2>
          </MotionReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-primary/30 bg-primary/[.08] p-6">
              <FiCompass className="size-6 text-primary" />
              <h3 className="mt-8 text-xl font-semibold text-white">
                Posicionamento
              </h3>
              <p className="mt-3 leading-7 text-white/60">
                Clareza sobre o que sua marca representa e para quem ela fala.
              </p>
            </div>
            <div className="spotlight-card rounded-2xl border border-white/10 bg-white/[.035] p-6">
              <FiLayers className="size-6 text-primary" />
              <h3 className="mt-8 text-xl font-semibold text-white">
                Sistema visual
              </h3>
              <p className="mt-3 leading-7 text-white/60">
                Direção que mantém o conteúdo reconhecível, mesmo em diferentes
                formatos.
              </p>
            </div>
            <div className="spotlight-card rounded-2xl border border-white/10 bg-white/[.035] p-6">
              <FiShield className="size-6 text-primary" />
              <h3 className="mt-8 text-xl font-semibold text-white">
                Acompanhamento
              </h3>
              <p className="mt-3 leading-7 text-white/60">
                Um processo transparente para revisar, aprender e evoluir
                continuamente.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#0d1729] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <MotionReveal>
            <SectionLabel>Dúvidas frequentes</SectionLabel>
            <h2 className="social-display mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
              Antes de começar,{" "}
              <span className="text-primary">vamos deixar claro.</span>
            </h2>
          </MotionReveal>
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => (
              <div
                key={question}
                className="rounded-2xl border border-white/10 bg-white/[.035]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between gap-6 p-5 text-left font-semibold text-white"
                >
                  <span>{question}</span>
                  <span className="text-2xl font-light text-primary">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <p className="px-5 pb-5 leading-7 text-white/60">{answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-primary py-16 text-primaryText sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Pronto para avançar?</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Sua marca já está nas redes. Agora dê estratégia a ela.
            </h2>
          </div>
          <a
            href="#contact"
            className="brand-button inline-flex shrink-0 items-center justify-center gap-2 rounded-[18px] bg-[#0b1220] shadow-[0_0_0_rgba(11,18,32,0)] hover:shadow-[0_0_24px_rgba(11,18,32,0.4)] px-6 py-3 font-semibold text-white transition hover:bg-[#162541]"
          >
            Solicitar orçamento <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
