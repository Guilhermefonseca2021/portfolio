import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <header className="neon-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111d]/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 shadow-[0_0_16px_rgba(96,165,250,0.9)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <Navigation />

        <a
          href="#contact"
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-sky-400/50 bg-gradient-to-r from-primary to-sky-500 px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_0_16px_rgba(14,165,233,0.35)] transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(14,165,233,0.65)] sm:px-3 sm:text-[10px] md:px-3.5 lg:gap-2 lg:px-5 lg:py-2.5 lg:text-sm"
        >
          Pedir orçamento
          <FiArrowUpRight aria-hidden="true" className="size-3.5 lg:size-4" />
        </a>
      </div>
    </header>
  );
}
