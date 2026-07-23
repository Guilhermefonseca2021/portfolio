import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">
      <span className="mb-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        Engenheiro de Software
      </span>

      <h1 className="text-5xl font-black leading-tight text-secondaryText lg:text-7xl">
        Guilherme
        <br />
        Fonseca
      </h1>

      <p className="mt-8 text-lg leading-8 text-secondaryText/70">
        Desenvolvedor Full Stack especializado em React, Node.js, TypeScript, IA
        e arquitetura escalável para produtos digitais.
      </p>

      <HeroButtons />
    </div>
  );
}
