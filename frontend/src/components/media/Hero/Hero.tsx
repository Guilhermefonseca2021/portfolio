import HeroBackground from "./HeroBackground";
import HeroButtons from "./HeroButtons";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-8">
        <HeroContent />

        <HeroButtons />

        <HeroStats />
      </div>
    </section>
  );
}
