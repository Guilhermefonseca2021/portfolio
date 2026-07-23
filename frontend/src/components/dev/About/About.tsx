import AboutContent from "./AboutContent";
import AboutStats from "./AboutStats";

export default function About() {
  return (
    <section id="about" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="text-primary font-semibold uppercase tracking-[4px]">
            Sobre Mim
          </span>

          <h2 className="mt-4 text-5xl font-bold text-secondaryText">
            Engenharia, Produto e Resultado
          </h2>

          <p className="mt-6 text-secondaryText/70">
            Desenvolvendo soluções escaláveis focadas em qualidade, performance
            e experiência do usuário.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <AboutContent />

          <AboutStats />
        </div>
      </div>
    </section>
  );
}
