import HeroBackground from "./HeroBackground";
import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0b1220]"
    >
      <HeroBackground />

      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-6 py-28 sm:px-8 lg:min-h-screen">
        <HeroContent />

        <HeroButtons />

        <HeroStats />
      </div>
    </section>
  );
}
