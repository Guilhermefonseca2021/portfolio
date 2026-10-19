import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type CSSProperties } from "react";
import {
  FiArrowDown,
  FiArrowDownRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiMove,
  FiPlay,
} from "react-icons/fi";
import PageSeo from "../components/seo/PageSeo";
import "./Modelos.css";

const steps = [
  {
    number: "01",
    title: "Você pergunta",
    description:
      "Peça uma imagem, uma edição ou uma direção visual usando linguagem natural ou um comando.",
  },
  {
    number: "02",
    title: "A IA consulta",
    description:
      "O RAG procura nos seus PDFs, presets e referências os trechos que combinam com o pedido.",
  },
  {
    number: "03",
    title: "O contexto é aplicado",
    description:
      "As regras encontradas entram no prompt junto com a sua imagem e as instruções da conversa.",
  },
  {
    number: "04",
    title: "Seu estilo ganha forma",
    description:
      "ChatGPT ou Claude responde com uma direção coerente com o material e os critérios da sua marca.",
  },
];

const onboardingSteps = [
  {
    number: "01",
    title: "ASSISTA",
    description: "Entenda o método em uma aula rápida.",
  },
  {
    number: "02",
    title: "INSTALE",
    description: "Adicione o Estúdio Invisível à tela do seu celular.",
  },
  {
    number: "03",
    title: "CRIE",
    description: "Abra o app, escolha uma foto, copie e use.",
  },
];

const photoFeatures = [
  "Método completo",
  "Biblioteca",
  "Prompts",
  "Referência → Produto",
  "Preservação",
  "Kit Anti-Cara-de-IA",
];

const videoFeatures = [
  "Tudo do plano Fotos",
  "Foto → Vídeo",
  "Prompts de vídeo",
  "Movimentos naturais",
  "Preservação no vídeo",
  "Reels e anúncios",
];

const aiImageExamples = [
  {
    src: "/images/estudio-invisivel/parmegiana.jpeg",
    alt: "Imagem de uma parmegiana com espaguete criada com inteligência artificial",
    category: "PRATO PRINCIPAL",
    title: "Parmegiana",
  },
  {
    src: "/images/estudio-invisivel/brownie.png",
    alt: "Imagem de brownie com sorvete de baunilha criada com inteligência artificial",
    category: "SOBREMESA",
    title: "Brownie com sorvete",
  },
  {
    src: "/images/estudio-invisivel/caesar.png",
    alt: "Imagem de salada Caesar criada com inteligência artificial",
    category: "FRESCO & LEVE",
    title: "Salada Caesar",
  },
  {
    src: "/images/estudio-invisivel/pudim.png",
    alt: "Imagem de pudim com calda de caramelo criada com inteligência artificial",
    category: "CLÁSSICO",
    title: "Pudim de caramelo",
  },
  {
    src: "/images/estudio-invisivel/salmao.jpeg",
    alt: "Imagem de salmão com acompanhamentos criada com inteligência artificial",
    category: "PRATO ASSINATURA",
    title: "Salmão",
  },
];

const showcaseCards = [
  {
    image: "/portfolio/media/fonseca-retrato.jpg",
    alt: "Retrato editorial do fotógrafo",
    label: "DEPOIS DO PROMPT",
    title: "Retrato editorial",
    className: "model-showcase-card-portrait",
  },
  {
    image: "/portfolio/media/fonseca-camera.jpeg",
    alt: "Fotógrafo trabalhando com a câmera",
    label: "ANTES / DEPOIS 02",
    title: "Produção em movimento",
    className: "model-showcase-card-motion",
  },
  {
    image: "/portfolio/media/fonseca-trabalho.jpeg",
    alt: "Bastidores de uma produção criativa",
    label: "ANTES / DEPOIS 03",
    title: "Bastidores que contam",
    className: "model-showcase-card-behind",
  },
];

const colorGradeExamples = [
  {
    src: "/images/estudio-invisivel/parmegiana.jpeg",
    alt: "Prato de parmegiana antes e depois de receber color grade",
    title: "Luz quente, textura viva",
    category: "FOOD / COLOR GRADE",
    gradient: "linear-gradient(135deg, #ec693b, #f5b544 48%, #8b322b)",
  },
  {
    src: "/images/estudio-invisivel/brownie.png",
    alt: "Brownie antes e depois de receber color grade",
    title: "Editorial de sobremesa",
    category: "FOOD / EDITORIAL",
    gradient: "linear-gradient(135deg, #79412f, #d38454 52%, #f0bd78)",
  },
  {
    src: "/images/estudio-invisivel/caesar.png",
    alt: "Salada Caesar antes e depois de receber color grade",
    title: "Frescor em primeiro plano",
    category: "FOOD / NATURAL",
    gradient: "linear-gradient(135deg, #386f55, #aec76d 52%, #e7cf82)",
  },
  {
    src: "/images/estudio-invisivel/pudim.png",
    alt: "Pudim antes e depois de receber color grade",
    title: "Clássico com assinatura",
    category: "FOOD / ASSINATURA",
    gradient: "linear-gradient(135deg, #682e24, #ce7740 50%, #f2c56f)",
  },
];

const traditionalProduction = [
  "Fotógrafo",
  "Captação",
  "Iluminação",
  "Produção",
  "Tratamento",
  "Vídeo",
  "Edição",
  "Tempo",
];

export default function Modelos() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const comparisonCarouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const moveComparisonCarousel = (direction: -1 | 1) => {
    comparisonCarouselRef.current?.scrollBy({
      left: direction * comparisonCarouselRef.current.clientWidth * 0.78,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };
  const revealProps = {
    initial: prefersReducedMotion ? false : { opacity: 0 },
    whileInView: prefersReducedMotion ? undefined : { opacity: 1 },
    viewport: { once: true, amount: 0.18 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
  const heroRevealProps = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <main className="model-page">
      <PageSeo
        title="Fábrica de Modelos | Presets visuais com IA"
        description="Presets visuais, comandos treinados e RAG para aplicar uma direção criativa consistente às suas imagens com ChatGPT ou Claude."
        path="/fabrica-de-modelos"
        keywords="presets de imagem, RAG, inteligência artificial, edição de imagem, prompts, ChatGPT, Claude"
      />

      <header className="model-nav">
        <a className="model-brand" href="/" aria-label="Fonseca — início">
          <span className="model-brand-mark">M</span>
          <span>
            Método <span className="model-brand-muted">/ AI Studio</span>
          </span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#comparacao">Demonstração</a>
          <a href="#metodo">Como funciona</a>
          <a href="#imagens-ia">Fotos IA</a>
          <a href="#videos">Vídeo</a>
          <a href="#planos">Estúdios</a>
        </nav>
        <a className="model-nav-cta" href="/#contact">
          Vamos conversar <FiArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section className="model-hero" aria-labelledby="model-hero-title">
        <motion.div className="model-hero-copy" {...heroRevealProps}>
          <p className="model-kicker">
            <span className="model-live-dot" />
            Método AI Estúdio + INTELIGÊNCIA ARTIFICIAL
          </p>
          <h1 id="model-hero-title" className="model-display">
            Essa sessão de fotos
            <br />
            <span>nunca aconteceu</span>
            <br />
          </h1>
          <p className="model-hero-description">
            Presets, comandos e referências para transformar a sua identidade
            visual em imagens com intenção <br />✓ Sem fotógrafo <br />✓ Sem
            horas perdidas <br />✓ Sem *cara* de IA
          </p>
          <div className="model-hero-actions">
            <a className="model-button model-button-primary" href="#comparacao">
              Ver a transformação <FiArrowDownRight aria-hidden="true" />
            </a>
            <span className="model-hero-note">
              Feito para ChatGPT ou Claude
            </span>
          </div>
          <a className="model-hero-scroll" href="#metodo">
            <span>VEJA COMO FUNCIONA</span>
            <FiArrowDown aria-hidden="true" />
          </a>
        </motion.div>

        <div className="model-hero-visual">
          <div
            className="model-hero-image-carousel"
            role="region"
            aria-label="Galeria de imagens da Fábrica de Modelos"
            aria-roledescription="carrossel"
          >
            <div className="model-hero-image-strip">
              {[0, 1, 2].map((offset) => {
                const image =
                  aiImageExamples[
                    (activeHeroSlide + offset) % aiImageExamples.length
                  ];

                return (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    loading={offset === 0 ? "eager" : "lazy"}
                  />
                );
              })}
            </div>
            <div className="model-hero-image-controls">
              <button
                type="button"
                aria-label="Imagens anteriores"
                onClick={() =>
                  setActiveHeroSlide(
                    (activeHeroSlide - 1 + aiImageExamples.length) %
                      aiImageExamples.length,
                  )
                }
              >
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Próximas imagens"
                onClick={() =>
                  setActiveHeroSlide(
                    (activeHeroSlide + 1) % aiImageExamples.length,
                  )
                }
              >
                <FiChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="model-showcase-section"
        aria-labelledby="showcase-title"
      >
        <div className="model-showcase-heading">
          <p className="model-kicker">
            Uma foto simples. Uma nova apresentação.
          </p>
          <h2 id="showcase-title">
            <br />
            Essas sessões também não aconteceram. Aprenda uma vez. Use sempre.
          </h2>
        </div>
        <div className="model-showcase-grid">
          {showcaseCards.map((card, index) => (
            <article
              className={`model-showcase-card ${card.className}`}
              key={card.image}
            >
              <img src={card.image} alt={card.alt} loading="lazy" />
              <div className="model-showcase-card-copy">
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <span className="model-showcase-card-index">
                  0{index + 1} <FiArrowUpRight aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="model-showcase-note">
          Você não precisa fazer um curso longo.
        </p>
      </section>

      <div className="model-marquee" aria-label="Imagem. Referência. Intenção.">
        <div className="model-marquee-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>
              IMAGEM <i>✳</i> REFERÊNCIA <i>✳</i> INTENÇÃO <i>✳</i> REPETIÇÃO
              COM IDENTIDADE <i>✳</i>
            </span>
          ))}
        </div>
      </div>

      <section
        id="comparacao"
        className="model-section model-comparison-section"
        aria-labelledby="comparison-title"
      >
        <motion.div className="model-section-heading" {...revealProps}>
          <p className="model-kicker">01 / ANTES E DEPOIS</p>
          <h2 id="comparison-title" className="model-display">
            Aprenda uma vez.
            <br />
            <span>Use sempre que precisar.</span>
          </h2>
          <p>
            Depois disso, quando precisar criar uma nova foto, é só abrir o
            aplicativo, escolher o estilo que quer, copiar o prompt e usar com a
            foto do seu produto.
          </p>
        </motion.div>

        <div className="model-compare-wrap">
          <div className="model-compare-toolbar">
            <div className="model-compare-label">
              <span>ANTES / DEPOIS · COLOR GRADE EM GRADIENTE</span>
              <FiMove aria-hidden="true" />
            </div>
            <div className="model-compare-controls">
              <button
                type="button"
                aria-label="Exemplos anteriores"
                onClick={() => moveComparisonCarousel(-1)}
              >
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Próximos exemplos"
                onClick={() => moveComparisonCarousel(1)}
              >
                <FiChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="model-compare-carousel"
            ref={comparisonCarouselRef}
            tabIndex={0}
            aria-label="Carrossel de exemplos antes e depois"
          >
            {colorGradeExamples.map((example) => (
              <article className="model-grade-card" key={example.src}>
                <div className="model-grade-card-heading">
                  <span>{example.category}</span>
                  <h3>{example.title}</h3>
                </div>
                <div
                  className="model-grade-pair"
                  style={
                    { "--grade-gradient": example.gradient } as CSSProperties
                  }
                >
                  <figure className="model-grade-frame model-grade-before">
                    <figcaption>ANTES</figcaption>
                    <img src={example.src} alt={example.alt} loading="lazy" />
                  </figure>
                  <figure className="model-grade-frame model-grade-after">
                    <figcaption>DEPOIS</figcaption>
                    <img
                      src={example.src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </figure>
                </div>
                <p>
                  MESMA REFERÊNCIA <span>·</span> NOVA DIREÇÃO DE COR
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="metodo"
        className="model-section model-method-section"
        aria-labelledby="method-title"
      >
        <motion.div className="model-method-intro" {...revealProps}>
          <p className="model-kicker">02 / POR QUE FUNCIONA</p>
          <h2 id="method-title" className="model-display">
            Não é mágica.
            <br />
            <span>É contexto.</span>
          </h2>
          <p>
            RAG é a ponte entre o que você pede e o que a IA precisa saber. Em
            vez de depender só de uma instrução genérica, ela consulta nossa
            base, treinamos ela para ficar preparada para o melhor jeito de
            criar.
          </p>
          <div className="model-rag-note">
            <span className="model-rag-note-symbol">RAG</span>
            <span>
              <strong>Geração aumentada por recuperação.</strong>A IA busca
              nossas referências antes de responder.
            </span>
          </div>
        </motion.div>

        <div className="model-steps">
          {steps.map((step) => (
            <motion.article
              className="model-step"
              key={step.number}
              {...revealProps}
              transition={{
                ...revealProps.transition,
                delay: Number(step.number) * 0.06,
              }}
            >
              <span className="model-step-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <FiArrowUpRight aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        className="model-prompt-gallery-section"
        aria-label="Possibilidades para criar imagens com direção"
        {...revealProps}
      >
        <div className="model-prompt-gallery">
          <div className="model-prompt-gallery-copy">
            <span className="model-film-label">
              UMA FOTO, OUTRAS POSSIBILIDADES
            </span>
            <h3>Primeiro, a imagem ganha direção.</h3>
            <p>
              Experimente cenas, luzes e enquadramentos sem perder de vista o
              produto que torna a sua marca única.
            </p>
            <a href="#imagens-ia">
              Ver exemplos <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div
            className="model-prompt-mosaic"
            aria-label="Exemplos de imagens de produto"
          >
            <img
              src="/images/estudio-invisivel/brownie.png"
              alt="Brownie com sorvete em uma composição de produto"
            />
            <img
              src="/images/estudio-invisivel/caesar.png"
              alt="Salada Caesar em uma composição editorial"
            />
            <img
              src="/images/estudio-invisivel/parmegiana.jpeg"
              alt="Parmegiana preparada para apresentação de restaurante"
            />
            <img
              src="/images/estudio-invisivel/salmao.jpeg"
              alt="Prato de salmão com acompanhamentos"
            />
          </div>
        </div>
      </motion.section>

      <section
        id="primeiros-passos"
        className="model-section model-onboarding-section"
        aria-labelledby="onboarding-title"
      >
        <motion.div className="model-onboarding-copy" {...revealProps}>
          <p className="model-kicker">03 / APRENDA UMA VEZ. USE SEMPRE.</p>
          <h2 id="onboarding-title" className="model-display">
            Você não precisa fazer um curso longo.
          </h2>
          <p className="model-onboarding-description">
            Assista a uma aula rápida, entenda como funciona e instale o Estúdio
            Invisível no seu celular.
          </p>
          <p className="model-onboarding-description">
            Depois, quando quiser criar uma nova foto, abra o aplicativo,
            escolha o estilo, copie o prompt e use com a foto do seu produto.
          </p>
          <p className="model-onboarding-mantra">
            Aprenda uma vez.
            <br />
            <span>Use sempre que precisar.</span>
          </p>
        </motion.div>

        <div className="model-onboarding-steps">
          {onboardingSteps.map((step, index) => (
            <motion.article
              className="model-onboarding-step"
              key={step.number}
              {...revealProps}
              transition={{ ...revealProps.transition, delay: index * 0.08 }}
            >
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <FiArrowUpRight aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        <motion.aside className="model-onboarding-community" {...revealProps}>
          <div className="model-onboarding-collage">
            <img
              src="/images/estudio-invisivel/parmegiana.jpeg"
              alt="Exemplo de criação de conteúdo para restaurante"
            />
            <img
              src="/images/estudio-invisivel/brownie.png"
              alt="Exemplo de fotografia de sobremesa"
            />
            <img
              src="/images/estudio-invisivel/salmao.jpeg"
              alt="Exemplo de fotografia de prato principal"
            />
          </div>
          <div className="model-onboarding-community-copy">
            <span>O PRÓXIMO PASSO VOCÊ NÃO PRECISA DESCOBRIR SOZINHO</span>
            <strong>
              Novidades, troca entre clientes e novos testes para acompanhar.
            </strong>
          </div>
        </motion.aside>
      </section>

      <section
        id="imagens-ia"
        className="model-section model-ai-gallery-section"
        aria-labelledby="ai-gallery-title"
      >
        <motion.div className="model-ai-gallery-heading" {...revealProps}>
          <div>
            <h2 id="ai-gallery-title" className="model-display">
              Ideias que
              <br />
              <span>ganham forma.</span>
            </h2>
          </div>
          <p>
            Imagens de pratos criadas com inteligência artificial para mostrar
            como um conceito pode virar conteúdo visual.
          </p>
        </motion.div>
        <div className="model-ai-gallery">
          {aiImageExamples.map((image, index) => (
            <figure
              className={`model-ai-image-card model-ai-image-card-${index + 1}`}
              key={image.src}
            >
              <div className="model-ai-image-frame">
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span className="model-ai-image-mark">CRIADO COM IA</span>
              </div>
              <figcaption>
                <span>{image.category}</span>
                <strong>{image.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        id="videos"
        className="model-section model-studio-section"
        aria-labelledby="studio-title"
      >
        <motion.div className="model-studio-heading" {...revealProps}>
          <p className="model-kicker">05 / ESTÚDIO INVISÍVEL</p>
          <h2 id="studio-title" className="model-display">
            Primeiro, você cria a foto.
            <br />
            <span>Depois, ela ganha movimento.</span>
          </h2>
          <p>
            Fotos criadas com o Estúdio Invisível. Um produto que continua
            evoluindo — e agora também transforma imagens em vídeos.
          </p>
        </motion.div>

        <div className="model-studio-showcase">
          <article className="model-film-card model-film-card-featured">
            <div className="model-film-frame">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label="Demonstração em vídeo do Estúdio Invisível"
              >
                <source
                  src="/videos/estudio-invisivel-projetos.mp4"
                  type="video/mp4"
                />
                Seu navegador não suporta vídeo incorporado.
              </video>
              <span className="model-film-duration">
                <FiPlay aria-hidden="true" /> DEMONSTRAÇÃO · 00:20
              </span>
              <div className="model-film-copy">
                <span className="model-film-label">
                  DO CONCEITO AO RESULTADO
                </span>
                <h3>Uma imagem. Novas possibilidades.</h3>
                <p>
                  Crie a foto com direção visual e dê o próximo passo com
                  movimento.
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="model-evolution">
          <motion.div className="model-evolution-copy" {...revealProps}>
            <span className="model-evolution-mark" aria-hidden="true">
              +
            </span>
            <div>
              <span className="model-film-label">
                FEITO PARA CONTINUAR CRESCENDO
              </span>
              <h3>Você não recebe apenas o que existe hoje.</h3>
              <p>O Estúdio Invisível continua evoluindo junto com quem usa.</p>
            </div>
          </motion.div>
          <ul className="model-evolution-list">
            <li>
              <FiCheck aria-hidden="true" /> Atualizações e novidades
            </li>
            <li>
              <FiCheck aria-hidden="true" /> Troca entre clientes
            </li>
            <li>
              <FiCheck aria-hidden="true" /> Novos testes e prompts
            </li>
          </ul>
        </div>
      </section>

      <section
        className="model-section model-cost-section"
        aria-labelledby="cost-title"
      >
        <motion.div className="model-cost-copy" {...revealProps}>
          <p className="model-kicker">06 / O VALOR DA PRODUÇÃO</p>
          <h2 id="cost-title" className="model-display">
            Quanto custaria produzir tudo isso do jeito tradicional?
          </h2>
          <p>
            Fotógrafo, captação, iluminação, produção, tratamento, vídeo, edição
            e tempo. Uma produção mais completa pode representar centenas ou até
            milhares de reais.*
          </p>
          <ul
            className="model-cost-list"
            aria-label="Etapas de uma produção tradicional"
          >
            {traditionalProduction.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <span className="model-cost-footnote">
            *Estimativa de referência. O custo varia de acordo com o escopo e a
            produção.
          </span>
        </motion.div>
        <motion.div
          className="model-cost-number"
          aria-label="Dois mil reais"
          {...revealProps}
        >
          <span>UMA PRODUÇÃO COMPLETA PODE CHEGAR A</span>
          <strong>
            R$ 1.500<sup>*</sup>
          </strong>
          <i aria-hidden="true" />
          <span>FOTOGRAFIA · VÍDEO · PÓS-PRODUÇÃO</span>
        </motion.div>
      </section>

      <section
        id="planos"
        className="model-section model-pricing-section"
        aria-labelledby="pricing-title"
      >
        <motion.div className="model-pricing-heading" {...revealProps}>
          <p className="model-kicker">07 / ESCOLHA O SEU ESTÚDIO</p>
          <h2 id="pricing-title" className="model-display">
            Fotos ou <span>Fotos + Vídeos.</span>
          </h2>
          <p>Um pagamento único. Seu próximo passo criativo começa aqui.</p>
        </motion.div>

        <div className="model-pricing-grid">
          <motion.article className="model-price-card" {...revealProps}>
            <div className="model-price-card-heading">
              <span className="model-film-label">ESTÚDIO INVISÍVEL</span>
              <h3>Fotos</h3>
              <p>Crie fotos com direção, método e identidade visual.</p>
            </div>
            <ul>
              {photoFeatures.map((feature) => (
                <li key={feature}>
                  <FiCheck aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="model-price">
              <strong>R$ 47</strong>
              <span>Pagamento único</span>
            </div>
            <a className="model-button model-button-secondary" href="/#contact">
              Quero o Estúdio Fotos <FiArrowUpRight aria-hidden="true" />
            </a>
          </motion.article>

          <motion.article
            className="model-price-card model-price-card-featured"
            {...revealProps}
            transition={{ ...revealProps.transition, delay: 0.08 }}
          >
            <span className="model-price-badge">MELHOR CUSTO-BENEFÍCIO</span>
            <div className="model-price-card-heading">
              <span className="model-film-label">ESTÚDIO INVISÍVEL</span>
              <h3>Fotos + Vídeos</h3>
              <p>Leve sua criação da imagem ao movimento.</p>
            </div>
            <ul>
              {videoFeatures.map((feature) => (
                <li key={feature}>
                  <FiCheck aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="model-price">
              <strong>R$ 59</strong>
              <span>Pagamento único</span>
            </div>
            <a className="model-button model-button-primary" href="/#contact">
              Quero Fotos + Vídeos <FiArrowUpRight aria-hidden="true" />
            </a>
          </motion.article>
        </div>
      </section>

      <section
        className="model-section model-faq-section"
        aria-labelledby="faq-title"
      >
        <motion.div className="model-faq-heading" {...revealProps}>
          <p className="model-kicker">08 / PERGUNTAS FREQUENTES</p>
          <h2 id="faq-title" className="model-display">
            Sem mistério.
          </h2>
        </motion.div>
        <div className="model-faq-list">
          <motion.details {...revealProps}>
            <summary>Preciso treinar um modelo de IA do zero?</summary>
            <p>
              Não. A proposta é configurar instruções e uma base de conhecimento
              consultável por RAG. A IA recupera seus critérios e referências na
              hora de responder — sem treinar um modelo do zero.
            </p>
          </motion.details>
          <motion.details
            {...revealProps}
            transition={{ ...revealProps.transition, delay: 0.06 }}
          >
            <summary>Funciona com ChatGPT e Claude?</summary>
            <p>
              Sim. Os materiais e comandos são organizados para uso com o
              assistente escolhido, respeitando os recursos disponíveis em cada
              plataforma.
            </p>
          </motion.details>
          <motion.details
            {...revealProps}
            transition={{ ...revealProps.transition, delay: 0.12 }}
          >
            <summary>Posso usar minhas próprias fotos e referências?</summary>
            <p>
              Sim. Suas imagens servem como referências para definir direção
              visual, e os documentos podem reunir presets, critérios de edição
              e exemplos do resultado que você busca.
            </p>
          </motion.details>
        </div>
      </section>

      <footer id="contato" className="model-footer">
        <motion.div {...revealProps}>
          <p className="model-kicker">
            E você pode aprender a criar os dois para o seu negócio.
          </p>
          <h2 className="model-display">
            Essa foto não teve sessão.
            <br />
            <span>Esse vídeo não teve gravação.</span>
          </h2>
        </motion.div>
        <a className="model-button model-button-primary" href="/#contact">
          Fale com a gente <FiArrowUpRight aria-hidden="true" />
        </a>
        <div className="model-footer-bottom">
          <a className="model-brand" href="/" aria-label="Fonseca — início">
            <span className="model-brand-mark">F.</span>
            <span>
              METODO AI<span className="model-brand-muted"> STUDIO</span>
            </span>
          </a>
          <span>Uma foto. Várias produções. Nenhuma sessão nova.</span>
          <a href="#model-hero-title">VOLTAR AO TOPO ↑</a>
        </div>
      </footer>
    </main>
  );
}
