export default function HeroButtons() {
  return (
    <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-5">
      <a
        href="#contact"
        className="rounded-xl bg-primary px-7 py-4 text-center font-semibold text-primaryText transition duration-300 hover:scale-105"
      >
        Entrar em contato
      </a>

      <a
        href="#projects"
        className="rounded-xl border border-primary px-7 py-4 text-center font-semibold text-primary transition duration-300 hover:bg-primary hover:text-primaryText"
      >
        Ver Projetos
      </a>
    </div>
  );
}
