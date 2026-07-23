import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="bg-bg">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-20 px-6 pt-28 pb-16 lg:px-8">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
}
