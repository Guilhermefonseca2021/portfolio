interface Props {
  services: string[];

  openModal: () => void;

  onSubmit: (data: ContactFormData) => void;

  submitting?: boolean;
}

export default function ContactForm({ services, openModal, onSubmit, submitting }: Props) {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    onSubmit({
      name: String(form.get("name") ?? ""),

      email: String(form.get("email") ?? ""),

      whatsapp: String(form.get("whatsapp") ?? ""),

      company: String(form.get("company") ?? ""),

      instagram: String(form.get("instagram") ?? ""),

      services,

      objective: String(form.get("objective") ?? ""),

      companySize: String(form.get("companySize") ?? ""),

      budget: String(form.get("budget") ?? ""),

      deadline: String(form.get("deadline") ?? ""),

      message: String(form.get("message") ?? ""),
    });
  }

  return (
    <form
      onSubmit={submit}
      className="
      mt-12
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      p-6
      md:p-8
      "
    >
      <div
        className="
        grid
        gap-4
        md:grid-cols-2
        "
      >
        <input name="name" placeholder="Nome" className="input" />

        <input name="email" placeholder="Email" className="input" />

        <input name="whatsapp" placeholder="WhatsApp" className="input" />

        <input name="company" placeholder="Empresa" className="input" />
      </div>

      <button
        type="button"
        onClick={openModal}
        className="
        mt-5
        flex
        h-12
        w-full
        items-center
        justify-between
        rounded-xl
        border
        border-white/10
        bg-black/20
        px-4
        text-sm
        text-white/80
        transition
        hover:border-primary/50
        "
      >
        <span>
          {services.length
            ? `${services.length} serviços selecionados`
            : "Selecionar serviços"}
        </span>

        <span
          className="
          text-primary
          "
        >
          +
        </span>
      </button>

      <textarea
        name="message"
        placeholder="Conte sobre seu projeto..."
        className="
        mt-5
        block
        min-h-[150px]
        w-full
        resize-none
        rounded-xl
        border
        border-white/10
        bg-black/20
        px-4
        py-4
        text-sm
        text-white
        outline-none
        transition
        placeholder:text-white/40
        focus:border-primary
        "
      />

      <button
        type="submit"
        disabled={submitting}
        className="
        mt-5
        h-12
        w-full
        rounded-xl
        bg-primary
        font-semibold
        text-white
        transition
        hover:opacity-90
        disabled:opacity-50
        "
      >
        {submitting ? "Enviando..." : "Solicitar orçamento"}
      </button>
    </form>
  );
}
