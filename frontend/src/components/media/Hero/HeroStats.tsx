export default function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-4 sm:mt-14 sm:flex sm:gap-12">
      <div>
        <span
          className="
        rounded-full
        border
        border-primary/20
        bg-primary/10
        px-4
        py-1.5
        text-xs
        font-medium
        uppercase
        tracking-[2px]
        text-primary
    "
        >
          +50 Clientes
        </span>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white">7</h3>

        <p className="text-sm text-white/50">Anos</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white">+1Mil</h3>

        <p className="text-sm text-white/50">Conteúdos entregues</p>
      </div>
    </div>
  );
}
