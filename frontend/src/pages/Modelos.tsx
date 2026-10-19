import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiCheck,
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

const presets = [
  {
    command: "/preset-1",
    title: "Color grade",
    description: "Tons, contraste e acabamento com a identidade da sua marca.",
  },
  {
    command: "/preset-2",
    title: "Edição editorial",
    description: "Uma direção pronta para retratos, campanhas e conteúdo.",
  },
  {
    command: "/models",
    title: "Modelos e formatos",
    description: "Referências e instruções para capas, feeds e novas imagens.",
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
  const [comparison, setComparison] = useState(50);
  const prefersReducedMotion = useReducedMotion();
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
          <span className="model-brand-mark">F.</span>
          <span>FÁBRICA <span className="model-brand-muted">/ MODELOS</span></span>
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
            ESTÚDIO CRIATIVO + INTELIGÊNCIA ARTIFICIAL
          </p>
          <h1 id="model-hero-title" className="model-display">
            A IA cria.
            <br />
            <span>Seu estilo</span>
            <br />
            assina.
          </h1>
          <p className="model-hero-description">
            Presets, comandos e referências para transformar a sua identidade
            visual em imagens com intenção — sem começar do zero a cada prompt.
          </p>
          <div className="model-hero-actions">
            <a className="model-button model-button-primary" href="#comparacao">
              Ver a transformação <FiArrowDownRight aria-hidden="true" />
            </a>
            <span className="model-hero-note">Feito para ChatGPT ou Claude</span>
          </div>
          <div className="model-hero-stamp" aria-hidden="true">
            <span>ESTILO</span>
            <span>COM</span>
            <span>INTENÇÃO</span>
          </div>
        </motion.div>

        <div className="model-hero-visual">
          <div className="model-video-frame">
            <video autoPlay loop muted playsInline preload="auto" poster="/portfolio/media/fonseca-retrato.jpg">
              <source src="/videos/hero.webm" type="video/webm" />
              Seu navegador não suporta vídeo incorporado.
            </video>
            <div className="model-video-shade" />
            <div className="model-video-caption">
              <span className="model-video-status">
                <span className="model-live-dot" />
                DIREÇÃO EM MOVIMENTO
              </span>
              <span>IMAGEM É LINGUAGEM.</span>
            </div>
            <a
              className="model-video-index"
              href="https://www.youtube.com/watch?v=aqz-KE-bpKQ"
              target="_blank"
              rel="noreferrer"
            >
              VÍDEO EXEMPLO NO YOUTUBE ↗
            </a>
          </div>
          <p className="model-visual-footnote">
            REFERÊNCIA VISUAL <span>—</span> A SUA IDENTIDADE, NÃO UM FILTRO
            GENÉRICO
          </p>
        </div>
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
            Uma imagem.
            <br />
            <span>Outra intenção.</span>
          </h2>
          <p>
            Arraste a linha para comparar a foto original com a mesma imagem
            recebendo um color grade de demonstração.
          </p>
        </motion.div>

        <div className="model-compare-wrap">
          <div className="model-compare-label">
            <span>DESLIZE PARA COMPARAR</span>
            <FiMove aria-hidden="true" />
          </div>
          <div
            className="model-compare"
            style={{ "--compare-position": `${comparison}%` } as CSSProperties}
          >
            <img
              className="model-compare-image model-compare-before"
              src="/portfolio/media/fonseca-retrato.jpg"
              alt="Retrato original sem o preset de cor"
              draggable="false"
            />
            <div className="model-compare-after">
              <img
                className="model-compare-image"
                src="/portfolio/media/fonseca-retrato.jpg"
                alt=""
                aria-hidden="true"
                draggable="false"
              />
            </div>
            <span className="model-compare-tag model-compare-tag-before">
              ORIGINAL <span>·</span> SEM PRESET
            </span>
            <span className="model-compare-tag model-compare-tag-after">
              COLOR GRADE <span>·</span> COM PRESET
            </span>
            <div className="model-compare-divider" aria-hidden="true">
              <span className="model-compare-knob">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m14.5 5-7 7 7 7M9.5 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <input
              className="model-compare-slider"
              type="range"
              min="5"
              max="95"
              value={comparison}
              onChange={(event) => setComparison(Number(event.target.value))}
              aria-label="Arraste para comparar a imagem original com a imagem com preset"
            />
          </div>
          <p className="model-compare-caption">
            DEMONSTRAÇÃO DE COLOR GRADING <span>—</span> A MESMA FOTO, DUAS
            DIREÇÕES VISUAIS
          </p>
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
            RAG é a ponte entre o que você pede e o que a IA precisa saber.
            Em vez de depender só de uma instrução genérica, ela consulta uma
            base de conhecimento preparada para o seu jeito de criar.
          </p>
          <div className="model-rag-note">
            <span className="model-rag-note-symbol">RAG</span>
            <span>
              <strong>Geração aumentada por recuperação.</strong>
              A IA busca referências antes de responder.
            </span>
          </div>
        </motion.div>

        <div className="model-steps">
          {steps.map((step) => (
            <motion.article
              className="model-step"
              key={step.number}
              {...revealProps}
              transition={{ ...revealProps.transition, delay: Number(step.number) * 0.06 }}
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

        <motion.div className="model-prompt-card" {...revealProps}>
          <div className="model-prompt-header">
            <span><i /> BASE DE CONHECIMENTO</span>
            <span>PDF · PRESETS · REFERÊNCIAS</span>
          </div>
          <p className="model-prompt-question">/presets-colors-dias</p>
          <div className="model-prompt-rule">
            <span>REGRA RECUPERADA</span>
            <p>
              “Preserve tons de pele naturais. Use sombras profundas, luz
              lateral suave e uma paleta fria com pontos quentes controlados.”
            </p>
          </div>
          <div className="model-prompt-footer">
            <span>CONTEXTO ENCONTRADO</span>
            <span className="model-prompt-match">98% MATCH</span>
          </div>
        </motion.div>
      </section>

      <section
        id="presets"
        className="model-section model-presets-section"
        aria-labelledby="presets-title"
      >
        <motion.div className="model-presets-heading" {...revealProps}>
          <div>
            <p className="model-kicker">03 / SEU FLUXO CRIATIVO</p>
            <h2 id="presets-title" className="model-display">
              Um comando.
              <br />
              <span>Uma direção.</span>
            </h2>
          </div>
          <p>
            Os gatilhos acionam instruções e referências específicas. Menos
            retrabalho explicando; mais consistência no resultado.
          </p>
        </motion.div>
        <div className="model-preset-grid">
          {presets.map((preset, index) => (
            <motion.article
              className="model-preset-card"
              key={preset.command}
              {...revealProps}
              transition={{ ...revealProps.transition, delay: index * 0.08 }}
            >
              <span className="model-preset-prompt">PROMPT / GATILHO</span>
              <code>{preset.command}</code>
              <h3>{preset.title}</h3>
              <p>{preset.description}</p>
              <FiArrowUpRight aria-hidden="true" />
            </motion.article>
          ))}
        </div>
        <p className="model-preset-footnote">
          Os comandos e a base de conhecimento são personalizados para o seu
          fluxo. Exemplos ilustrativos.
        </p>
      </section>

      <section
        id="imagens-ia"
        className="model-section model-ai-gallery-section"
        aria-labelledby="ai-gallery-title"
      >
        <motion.div className="model-ai-gallery-heading" {...revealProps}>
          <div>
            <p className="model-kicker">04 / EXEMPLOS CRIADOS COM IA</p>
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
                <span className="model-film-label">DO CONCEITO AO RESULTADO</span>
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
            <span className="model-evolution-mark" aria-hidden="true">+</span>
            <div>
              <span className="model-film-label">FEITO PARA CONTINUAR CRESCENDO</span>
              <h3>Você não recebe apenas o que existe hoje.</h3>
              <p>
                O Estúdio Invisível continua evoluindo junto com quem usa.
              </p>
            </div>
          </motion.div>
          <ul className="model-evolution-list">
            <li><FiCheck aria-hidden="true" /> Atualizações e novidades</li>
            <li><FiCheck aria-hidden="true" /> Troca entre clientes</li>
            <li><FiCheck aria-hidden="true" /> Novos testes e prompts</li>
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
            Fotógrafo, captação, iluminação, produção, tratamento, vídeo,
            edição e tempo. Uma produção mais completa pode representar
            centenas ou até milhares de reais.*
          </p>
          <ul className="model-cost-list" aria-label="Etapas de uma produção tradicional">
            {traditionalProduction.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <span className="model-cost-footnote">
            *Estimativa de referência. O custo varia de acordo com o escopo e
            a produção.
          </span>
        </motion.div>
        <motion.div className="model-cost-number" aria-label="Dois mil reais" {...revealProps}>
          <span>UMA PRODUÇÃO COMPLETA PODE CHEGAR A</span>
          <strong>R$ 2.000<sup>*</sup></strong>
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

      <section className="model-section model-faq-section" aria-labelledby="faq-title">
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
              Não. A proposta é configurar instruções e uma base de
              conhecimento consultável por RAG. A IA recupera seus critérios e
              referências na hora de responder — sem treinar um modelo do zero.
            </p>
          </motion.details>
          <motion.details {...revealProps} transition={{ ...revealProps.transition, delay: 0.06 }}>
            <summary>Funciona com ChatGPT e Claude?</summary>
            <p>
              Sim. Os materiais e comandos são organizados para uso com o
              assistente escolhido, respeitando os recursos disponíveis em cada
              plataforma.
            </p>
          </motion.details>
          <motion.details {...revealProps} transition={{ ...revealProps.transition, delay: 0.12 }}>
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
          <p className="model-kicker">SEU PRÓXIMO PROMPT PODE TER IDENTIDADE.</p>
          <h2 className="model-display">
            Vamos criar
            <br />
            <span>o seu sistema.</span>
          </h2>
        </motion.div>
        <a className="model-button model-button-primary" href="/#contact">
          Fale com a gente <FiArrowUpRight aria-hidden="true" />
        </a>
        <div className="model-footer-bottom">
          <a className="model-brand" href="/" aria-label="Fonseca — início">
            <span className="model-brand-mark">F.</span>
            <span>FÁBRICA <span className="model-brand-muted">/ MODELOS</span></span>
          </a>
          <span>IMAGENS COM INTENÇÃO. PROCESSOS COM IDENTIDADE.</span>
          <a href="#model-hero-title">VOLTAR AO TOPO ↑</a>
        </div>
      </footer>
    </main>
  );
}
