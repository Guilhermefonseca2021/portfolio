export default function AboutContent() {
  const english = localStorage.getItem("language") === "en";

  return (
    <div className="space-y-8">
      <p className="leading-8 text-secondaryText/80">
        Sou engenheiro de software especializado em aplicações web, mobile e
        backend. Trabalho desde o levantamento de requisitos até a entrega da
        solução, sempre priorizando arquitetura limpa, performance e código
        sustentável.
      </p>

      <p className="leading-8 text-secondaryText/80">
        Meu foco é desenvolver produtos que resolvam problemas reais utilizando
        tecnologias modernas, boas práticas de engenharia e automações com IA.
      </p>

      <a
        href={
          english ? "/docs/Curriculo_2026EN.pdf" : "/docs/Curriculo_2026.pdf"
        }
        download
        className="inline-flex rounded-xl bg-primary px-8 py-4 font-semibold text-primaryText transition hover:scale-105"
      >
        Download CV
      </a>
    </div>
  );
}
