export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      <a
        href="#contact"
        className="rounded-xl bg-primary px-7 py-4 font-semibold text-primaryText transition duration-300 hover:scale-105"
      >
        Entrar em contato
      </a>

      <a
        href="#projects"
        className="rounded-xl border border-primary px-7 py-4 font-semibold text-primary transition duration-300 hover:bg-primary hover:text-primaryText"
      >
        Ver Projetos
      </a>
    </div>
  );
}
