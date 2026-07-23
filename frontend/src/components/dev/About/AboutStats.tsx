import AboutCard from "./AboutCard";

export default function AboutStats() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <AboutCard title="4+" subtitle="Anos de experiência" />

      <AboutCard title="20+" subtitle="Projetos desenvolvidos" />

      <AboutCard title="Full Stack" subtitle="React • Node • Java" />

      <AboutCard title="IA" subtitle="Automações Inteligentes" />
    </div>
  );
}
