import { useEffect, useState } from "react";
import { HiCheckCircle, HiArrowTrendingUp } from "react-icons/hi2";
import fonsecaApi from "../../../../services/fonsecaApi";
import type { Company } from "../../../../types/api";

const PLAN_FEATURES: Record<string, string[]> = {
  BASE: [
    "Até 500 clientes",
    "CRM básico",
    "1 automação",
    "Suporte por e-mail",
  ],
  MEGA: [
    "Até 2.000 clientes",
    "CRM completo",
    "Automações ilimitadas",
    "WhatsApp integrado",
    "Suporte prioritário",
  ],
  PREMIUM: [
    "Clientes ilimitados",
    "CRM completo",
    "Automações ilimitadas",
    "WhatsApp + API",
    "Suporte dedicado 24/7",
  ],
};

const PLAN_PRICES: Record<string, number> = {
  BASE: 19.9,
  MEGA: 39.9,
  PREMIUM: 69.9,
};

export default function CurrentPlan() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fonsecaApi.company.getMe();
        setCompany(data);
      } catch {
        setCompany(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const plan = company?.plan ?? "BASE";
  const price = PLAN_PRICES[plan] ?? PLAN_PRICES.BASE;
  const features = PLAN_FEATURES[plan] ?? PLAN_FEATURES.BASE;

  return (
    <section className="rounded-2xl border border-secondary bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            Plano Atual
          </span>

          <h2 className="mt-4 text-2xl font-bold text-secondaryText">
            {loading ? "Carregando..." : plan}
          </h2>

          <p className="mt-2 text-secondaryText/60">
            {loading ? "" : "Plano contratado da sua empresa."}
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <HiArrowTrendingUp size={26} className="text-primary" />
        </div>
      </div>

      <div className="mt-8 flex items-end gap-2">
        <span className="text-5xl font-bold text-primary">
          {loading ? "..." : `R$${price.toFixed(2).replace(".", ",")}`}
        </span>

        <span className="pb-2 text-secondaryText/60">/mês</span>
      </div>

      <div className="mt-8 space-y-4">
        {features.map((item) => (
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
