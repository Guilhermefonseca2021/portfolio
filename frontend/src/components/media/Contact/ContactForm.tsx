interface Props {
  services: string[];
  selectedPlans: string[];

  openModal: () => void;
  onTogglePlan: (plan: string) => void;
  onSubmit: (data: ContactFormData) => void;

  submitting?: boolean;
}

export default function ContactForm({
  services,
  selectedPlans,
  openModal,
  onTogglePlan,
  onSubmit,
  submitting,
}: Props) {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    onSubmit({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      whatsapp: "",
      company: "",
      instagram: "",
      services,
      selectedPlans,
      objective: "",
      companySize: "",
      budget: "",
      deadline: "",
      message: String(form.get("message") ?? ""),
    });
  }

  const totalSelected = services.length + selectedPlans.length;

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
      {selectedPlans.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Plano no formulário
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedPlans.map((plan) => (
              <button
                key={plan}
                type="button"
                onClick={() => onTogglePlan(plan)}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/15"
                aria-label={`Remover plano ${plan}`}
              >
                <span>{plan}</span>
                <span className="text-base leading-none">×</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className="
        grid
        gap-4
        md:grid-cols-2
        "
      >
        <input name="name" placeholder="Nome ou empresa" className="input" />

        <input name="email" placeholder="Email" className="input" />
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
        rounded-[18px]
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
          {totalSelected > 0
            ? `${totalSelected} item${totalSelected > 1 ? "s" : ""} no formulário`
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
        placeholder="Conte sobre seu projeto (opcional)"
        className="
        mt-5
        block
        min-h-[150px]
        w-full
        resize-none
        rounded-[18px]
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
brand-button rounded-[18px]
  bg-primary
  font-extrabold
  text-white
        transition
        hover:opacity-90
        disabled:opacity-50
        "
      >
        {submitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
