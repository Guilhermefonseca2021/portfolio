export default function HeroButtons() {
  return (
    <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
      <a
        href="#contact"
        className="rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-black"
      >
        Solicitar orçamento
      </a>

      <a
        href="#portfolio"
        className="
            rounded-lg
            border
            border-white/10
            px-6
            py-3
            text-center
            text-sm
            font-medium
            text-white
            hover:bg-white/5
        "
      >
        Ver trabalhos
      </a>
    </div>
  );
}
