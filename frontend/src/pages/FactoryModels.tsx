import { useState } from "react";
import PageSeo from "../components/seo/PageSeo";

const showcases = [
  { label: "Retrato editorial", image: "/portfolio/media/fonseca-sorriso.jpeg", tone: "blue" },
  { label: "Produção em movimento", image: "/portfolio/media/fonseca-camera.jpeg", tone: "violet" },
  { label: "Bastidores que vendem", image: "/portfolio/media/fonseca-trabalho.jpeg", tone: "cyan" },
];

const steps = [
  ["01", "Você envia", "Uma foto real, um produto ou uma ideia inicial."],
  ["02", "A gente modela", "Cenário, direção e linguagem visual entram no sistema."],
  ["03", "Você multiplica", "Novas peças para campanha, catálogo, social e lançamento."],
];

export default function FactoryModels() {
  const [active, setActive] = useState(0);

  return (
    <main className="factory-page min-h-screen overflow-hidden bg-[#0b1220] text-white">
      <PageSeo title="Fábrica de modelos | Fonseca Digital" description="Transforme uma referência real em um sistema visual que gera conteúdo para sua marca." path="/fabrica-de-modelos" keywords="fábrica de modelos, conteúdo visual, produção digital, Fonseca Digital" />
      <header className="factory-nav mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
        <a href="/" className="factory-wordmark">FONSECA<span>®</span></a>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/55 md:flex">
          <a href="#como-funciona" className="transition hover:text-white">Como funciona</a>
          <a href="#possibilidades" className="transition hover:text-white">Possibilidades</a>
          <a href="#conversa" className="factory-nav-cta">Conversar</a>
        </nav>
      </header>

      <section className="factory-hero mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pb-36 lg:pt-20">
        <div className="relative z-10">
          <p className="factory-kicker">FÁBRICA DE MODELOS / 001</p>
          <h1 className="factory-display mt-6 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-[6.5rem]">Uma imagem.<br /><span>Mil possibilidades.</span></h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-white/62">Criamos modelos visuais para sua marca produzir mais, testar rápido e aparecer sempre com a mesma força — sem repetir a mesma sessão.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#conversa" className="brand-button factory-primary rounded-[18px] px-6 py-4 text-sm">Construir meu modelo <span aria-hidden="true">↗</span></a>
            <a href="#como-funciona" className="factory-secondary rounded-[18px] px-6 py-4 text-sm font-bold text-white">Ver o sistema</a>
          </div>
        </div>
        <div className="factory-hero-art spotlight-card">
          <div className="factory-art-grid" aria-hidden="true" />
          <img src="/portfolio/media/fonseca-camera.jpeg" alt="Fonseca segurando uma câmera em um estúdio" className="factory-hero-image" />
          <div className="factory-art-label"><span>MODELO REAL</span><strong>PERSONA / 001</strong></div>
          <div className="factory-art-stamp">F<br />DIGITAL</div>
        </div>
      </section>

      <section id="possibilidades" className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:pb-36">
        <div className="factory-section-heading"><p className="factory-kicker">DE UMA REFERÊNCIA PARA UM UNIVERSO</p><h2 className="factory-display mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] sm:text-6xl">Não é só uma foto.<br /><span>É um ativo da sua marca.</span></h2></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {showcases.map((item, index) => <button type="button" key={item.label} onClick={() => setActive(index)} className={`factory-showcase spotlight-card text-left ${active === index ? "is-active" : ""}`}><img src={item.image} alt={item.label} loading="lazy" /><span className="factory-showcase-overlay" /><div className="relative z-10 flex items-end justify-between"><span><small>APLICAÇÃO 0{index + 1}</small><strong>{item.label}</strong></span><span className="factory-arrow">↗</span></div></button>)}
        </div>
      </section>

      <section id="como-funciona" className="factory-process border-y border-white/10 bg-[#0d1729] py-24 sm:py-32"><div className="mx-auto max-w-7xl px-6 sm:px-8"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="factory-kicker">O MÉTODO</p><h2 className="factory-display mt-5 text-4xl font-black tracking-[-0.06em] sm:text-6xl">Um sistema<br /><span>que continua.</span></h2></div><div className="grid gap-3">{steps.map(([number, title, description]) => <div key={number} className="spotlight-card factory-step"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><b aria-hidden="true">↗</b></div>)}</div></div></div></section>

      <section className="factory-capabilities mx-auto max-w-7xl px-6 pb-24 sm:px-8"><div className="mb-10 max-w-2xl"><p className="factory-kicker">POSSIBILIDADES</p><h2 className="factory-display mt-4 text-4xl font-black tracking-[-0.06em] sm:text-6xl">Do simples ao extraordinário.</h2></div><div className="grid gap-4 md:grid-cols-3">{[['Fotografia de impacto','Direção de luz, cenário e enquadramento para valorizar seu produto.'],['Campanhas e anúncios','Modelos com chamada, oferta e formato para cada canal.'],['Pessoas e experiências','Conteúdo com presença humana para sua marca ganhar vida.'],['Personalização rápida','Troque produto, frase e formato sem recomeçar tudo.'],['Feito para o celular','Um sistema simples para criar onde você estiver.'],['Fidelidade ao produto','Instruções claras para preservar o que torna sua marca única.']].map(([title, description], index) => <article key={title} className="factory-capability spotlight-card"><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="factory-faq mx-auto max-w-5xl px-6 pb-24 sm:px-8"><p className="factory-kicker text-center">DÚVIDAS FREQUENTES</p><h2 className="factory-display mt-4 text-center text-4xl font-black tracking-[-0.06em] sm:text-6xl">Sem complicação.</h2><div className="mt-10">{[['Preciso ter uma câmera profissional?','Não. Começamos com o que você já tem e construímos uma direção melhor a partir da sua realidade.'],['O modelo funciona para qualquer negócio?','Sim. A lógica se adapta a produtos, serviços, pessoas, campanhas e lançamentos.'],['A marca fica com um sistema reutilizável?','Sim. Você recebe uma base visual pensada para continuar produzindo depois do primeiro projeto.']].map(([question, answer]) => <details key={question} className="factory-faq-item"><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section id="conversa" className="factory-cta mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-36"><div className="spotlight-card relative overflow-hidden rounded-[28px] border border-primary/40 bg-primary p-8 sm:p-14 lg:p-20"><div className="factory-cta-orb" /><p className="relative z-10 text-xs font-black uppercase tracking-[0.2em] text-white/75">PRONTO PARA PRODUZIR DIFERENTE?</p><h2 className="factory-display relative z-10 mt-5 max-w-3xl text-4xl font-black tracking-[-0.06em] sm:text-7xl">Vamos criar o modelo que sua marca ainda não tem.</h2><a href="/#contact" className="brand-button relative z-10 mt-9 inline-flex rounded-[18px] bg-[#0b1220] px-6 py-4 text-sm">Falar com a Fonseca <span aria-hidden="true">↗</span></a></div></section>

      <footer className="border-t border-white/10 px-6 py-8 text-xs uppercase tracking-[0.16em] text-white/40 sm:px-8"><div className="mx-auto flex max-w-7xl justify-between"><span>FONSECA DIGITAL</span><span>FÁBRICA DE MODELOS / 001</span></div></footer>
    </main>
  );
}
