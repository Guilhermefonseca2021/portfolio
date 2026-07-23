import ContactItem from "./ContactItem";

export default function ContactCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-10 text-sm">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-8 text-3xl font-bold text-secondaryText">
            Entre em contato
          </h3>

          <div className="space-y-6">
            <ContactItem
              icon="📧"
              title="Email"
              value="gsbloogs194@email.com"
            />

            <ContactItem
              icon="📱"
              title="WhatsApp"
              value="+55 (83) 99812-9695"
            />

            <ContactItem
              icon="💼"
              title="LinkedIn"
              value="linkedin.com/in/guilhermefonseca2021"
            />

            <ContactItem
              icon="🐙"
              title="GitHub"
              value="github.com/Guilhermefonseca2021"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <a
            href="https://wa.me/5583998129695"
            target="_blank"
            rel="noreferrer"
            className="
              rounded-2xl
              bg-primary
              px-10
              py-5
              text-lg
              font-semibold
              text-primaryText
              transition
              hover:scale-105
            "
          >
            Solicitar orçamento
          </a>
        </div>
      </div>
    </div>
  );
}
