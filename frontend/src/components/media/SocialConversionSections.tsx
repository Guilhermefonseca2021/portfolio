import { useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiCompass,
  FiLayers,
  FiShield,
} from "react-icons/fi";
import MotionReveal from "./MotionReveal";

const pillars = [
  [
    FiCompass,
    "Posicionamento",
    "Clareza sobre o que sua marca representa e para quem fala.",
  ],
  [
    FiLayers,
    "Sistema visual",
    "Direção que mantém o conteúdo reconhecível em diferentes formatos.",
  ],
  [
    FiShield,
    "Acompanhamento",
    "Um processo transparente para revisar, aprender e evoluir.",
  ],
] as const;

const steps = [
  "Diagnóstico",
  "Estratégia",
  "Design",
  "Planejamento",
  "Produção",
  "Publicação",
  "Dados e análise",
  "Evolução",
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

          <MotionReveal className="mt-12 max-w-3xl border-t border-white/10 pt-10">
            <SectionLabel>Estratégia + design + dados</SectionLabel>
            <h2 className="social-display mt-4 text-3xl font-bold text-white sm:text-5xl">
              Mídias sociais pensadas como{" "}
              <span className="text-primary">produto de marca.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
              Uma jornada contínua que conecta o posicionamento da marca à
              criação, publicação e evolução do conteúdo.
            </p>
          </MotionReveal>

          <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-3">
            {pillars.map(([Icon, title, description], index) => (
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

          <div className="mt-10 border-t border-white/10 pt-8">
            <ol className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-white/85">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 grid gap-x-6 gap-y-1 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-white/10 py-3 text-sm text-white/75"
              >
                <FiCheck
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
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
