import ContactCard from "./ContactCard";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32"
    >
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-20 text-center">

          <span className="font-semibold uppercase tracking-[4px] text-primary">
            Contato
          </span>

          <h2 className="mt-4 text-5xl font-bold text-secondaryText">
            Vamos construir algo incrível
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-secondaryText/70">
            Estou disponível para desenvolver sistemas,
            aplicações web, aplicativos mobile, automações
            e soluções com Inteligência Artificial.
          </p>

        </div>

        <ContactCard />

      </div>
    </section>
  );
}