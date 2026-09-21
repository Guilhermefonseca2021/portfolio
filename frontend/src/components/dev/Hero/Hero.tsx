import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="bg-bg">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center justify-between gap-10 px-6 pb-12 pt-28 sm:gap-16 lg:min-h-screen lg:px-8 lg:pb-16">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
}
