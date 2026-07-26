import { HiCheckCircle, HiArrowTrendingUp } from "react-icons/hi2";

export default function CurrentPlan() {
  return (
    <section className="rounded-2xl border border-secondary bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            Plano Atual
          </span>

          <h2 className="mt-4 text-2xl font-bold text-secondaryText">
            Professional
          </h2>

          <p className="mt-2 text-secondaryText/60">
            Ideal para empresas em crescimento.
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <HiArrowTrendingUp size={26} className="text-primary" />
        </div>
      </div>

      <div className="mt-8 flex items-end gap-2">
        <span className="text-5xl font-bold text-primary">R$149</span>

        <span className="pb-2 text-secondaryText/60">/mês</span>
      </div>

      <div className="mt-8 space-y-4">
        {[
          "Clientes ilimitados",
          "CRM completo",
          "Automações",
          "WhatsApp",
          "API",
          "Suporte prioritário",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <HiCheckCircle className="text-primary" size={20} />

            <span className="text-secondaryText/80">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          className="
            rounded-xl
            bg-primary
            px-5
            py-3
            font-semibold
            text-primaryText
            transition
            hover:opacity-90
          "
        >
          Alterar Plano
        </button>

        <button
          className="
            rounded-xl
            border
            border-secondary
            bg-secondary
            px-5
            py-3
            font-semibold
            text-secondaryText
            transition
            hover:border-primary
          "
        >
          Cancelar
        </button>
      </div>
    </section>
  );
}
