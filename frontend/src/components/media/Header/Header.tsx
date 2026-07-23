import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-8">
        <Logo />

        <Navigation />

        <a
          href="#contact"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
        >
          Falar conosco
        </a>
      </div>
    </header>
  );
}
