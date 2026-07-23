import { useState } from "react";

import ContactForm from "./ContactForm";
import ServicesModal from "./ServicesModal";

export default function Contact() {
  const [modal, setModal] = useState(false);

  const [services, setServices] = useState<string[]>([]);

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service],
    );
  }

  function handleSubmit(data: ContactFormData) {
    console.log("LEAD:", data);

    // API aqui depois
  }

  return (
    <section
      id="contact"
      className="
      relative
      overflow-hidden
      bg-bg
      py-6
      md:py-14
      "
    >
      {/* transição superior */}

      <div
        className="
        pointer-events-none
        absolute
        inset-x-0
        top-0
        h-32
        bg-gradient-to-b
        from-bg/0
        to-bg/40
        "
      />

      {/* glow */}

      <div
        className="
        pointer-events-none
        absolute
        right-[-120px]
        top-20
        h-[500px]
        w-[500px]
        rounded-full
        bg-primary/10
        blur-[170px]
        "
      />

      <div
        className="
        relative
        z-10
        mx-auto
        max-w-7xl
        px-8
        "
      >
        <div
          className="
          max-w-3xl
          "
        >
          <span
            className="
            text-xs
            font-semibold
            uppercase
            tracking-[6px]
            text-primary
            "
          >
            Contato
          </span>

          <h2
            className="
            mt-5
            text-4xl
            font-bold
            leading-tight
            tracking-tight
            text-secondaryText
            md:text-6xl
            "
          >
            Vamos criar algo
            <span className="text-primary"> incrível juntos.</span>
          </h2>

          <p
            className="
            mt-6
            max-w-xl
            text-lg
            leading-8
            text-secondaryText/70
            "
          >
            Conte sua ideia e receba uma estratégia personalizada para
            transformar sua marca.
          </p>
        </div>

        <ContactForm
          services={services}
          openModal={() => setModal(true)}
          onSubmit={handleSubmit}
        />
      </div>

      {modal && (
        <ServicesModal
          services={services}
          toggleService={toggleService}
          close={() => setModal(false)}
        />
      )}
    </section>
  );
}
