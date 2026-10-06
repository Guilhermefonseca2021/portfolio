import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import MotionReveal from "./MotionReveal";

const faqs = [
  [
    "Que tipo de marca vocês atendem?",
    "Trabalhamos com marcas que querem construir uma presença digital reconhecível e própria.",
  ],
  [
    "Como funciona o primeiro contato?",
    "Conte um pouco sobre sua marca e o momento do negócio. A conversa inicial ajuda a entender se faz sentido trabalharmos juntos.",
  ],
  [
    "Como começamos?",
    "Envie uma mensagem pelo formulário ao final da página para iniciar a conversa.",
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
  const shouldReduceMotion = useReducedMotion();
  const parallaxSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxSectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0.28, 0.72],
    [0, shouldReduceMotion ? 0 : -760],
  );
  const graphicOpacity = useTransform(
    scrollYProgress,
    shouldReduceMotion ? [0, 1] : [0.25, 0.36, 0.7, 0.82],
    shouldReduceMotion ? [1, 1] : [0, 1, 1, 0],
  );
  const foregroundOpacity = useTransform(
    scrollYProgress,
    shouldReduceMotion ? [0, 1] : [0.25, 0.36, 0.7, 0.82],
    shouldReduceMotion ? [1, 1] : [0, 1, 1, 0],
  );
  const foregroundY = useTransform(
    scrollYProgress,
    [0.25, 0.42, 0.68, 0.8],
    [
      shouldReduceMotion ? 0 : 35,
      shouldReduceMotion ? 0 : -105,
      shouldReduceMotion ? 0 : -105,
      shouldReduceMotion ? 0 : -150,
    ],
  );
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -125],
  );

  return (
    <>
      <section
        ref={parallaxSectionRef}
        aria-label="Social media"
        className="relative isolate min-h-[540px] overflow-hidden border-y border-white/10 bg-[#0b1220] sm:min-h-[760px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="pointer-events-none absolute left-[8%] top-[28%] size-1 rounded-full bg-primary/80" />
        <div className="pointer-events-none absolute left-[8%] top-[28%] h-20 w-px bg-gradient-to-b from-primary/50 to-transparent" />

        <motion.div
          style={{ y: backgroundY, opacity: graphicOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[73%] z-10 whitespace-nowrap"
          aria-hidden="true"
        >
          <h2 className="social-parallax-word ml-[-7vw] text-[clamp(5rem,21vw,20rem)] text-white/[0.12]">
            socialmedia
          </h2>
        </motion.div>

        <motion.div
          style={{ y: portraitY }}
          className="pointer-events-none absolute inset-x-0 top-[27%] z-20 flex h-[76%] w-full items-end justify-center sm:inset-x-auto sm:right-[2%] sm:top-[2%] sm:h-[105%] sm:w-[64%] lg:right-[4%] lg:w-[54%]"
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, clipPath: "inset(8% 0 0 0)" }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, clipPath: "inset(0% 0 0 0)" }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex h-full w-full items-end justify-center"
          >
            <img
              src="/portfolio/media/socialmedia-portrait.png"
              alt="Profissional da Fonseca com câmera e estabilizador"
              loading="lazy"
              className="h-full max-w-full object-contain object-bottom"
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: foregroundY, opacity: foregroundOpacity }}
          className="relative z-30 mx-auto flex min-h-[540px] max-w-[1600px] items-center px-6 sm:min-h-[760px] sm:px-10 lg:px-16"
        >
          <div className="relative z-10 w-full pb-48 pt-20 sm:pb-72 sm:pt-28 lg:pb-0">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55">
              <span className="text-primary">01</span>
              <span className="h-px w-10 bg-white/25" />
              <span>Fonseca · Social media</span>
            </div>

            <MotionReveal className="max-w-[22rem] sm:max-w-xl" delay={0.16}>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55 sm:mb-4 sm:text-xs">
                Presença sem intenção passa despercebida.
              </p>
              <h3 className="max-w-lg text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
                Faça sua marca{" "}
                <span className="text-primary">ser lembrada.</span>
              </h3>
            </MotionReveal>
          </div>
        </motion.div>
      </section>
      <section className="border-t border-white/10 bg-[#0d1729] py-12 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:gap-12 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <MotionReveal>
            <SectionLabel>Dúvidas frequentes</SectionLabel>
            <h2 className="social-display mt-3 text-[1.7rem] font-bold leading-[1.1] tracking-[-0.045em] text-white sm:mt-5 sm:text-5xl">
              Antes de começar,{" "}
              <span className="text-primary">vamos deixar claro.</span>
            </h2>
          </MotionReveal>
          <div className="space-y-2 sm:space-y-3">
            {faqs.map(([question, answer], index) => (
              <div
                key={question}
                className="rounded-xl border border-white/10 bg-white/[.035] sm:rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-white sm:gap-6 sm:p-5 sm:text-base"
                >
                  <span>{question}</span>
                  <span className="text-2xl font-light text-primary">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <p className="px-4 pb-4 text-sm leading-6 text-white/60 sm:px-5 sm:pb-5 sm:text-base sm:leading-7">{answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-primary py-10 text-primaryText sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 sm:gap-8 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Pronto para avançar?</SectionLabel>
            <h2 className="mt-3 max-w-2xl text-[1.7rem] font-bold leading-[1.1] tracking-[-0.04em] sm:mt-4 sm:text-5xl">
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
