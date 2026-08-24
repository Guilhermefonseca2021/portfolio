import { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi2";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { Company } from "../../types/api";

const PLANS = [
  {
    key: "BASE",
    name: "Base",
    price: "R$ 19,90",
    description: "Para quem está começando.",
    features: [
      "Até 10 automações",
      "CRM básico",
      "Suporte por e-mail",
    ],
  },
  {
    key: "MEGA",
    name: "Mega",
    price: "R$ 39,90",
    description: "Para operações em crescimento.",
    features: [
      "Até 50 automações",
      "CRM completo",
      "WhatsApp integrado",
      "Suporte prioritário",
    ],
  },
  {
    key: "PREMIUM",
    name: "Premium",
    price: "R$ 69,90",
    description: "Para operações avançadas.",
    features: [
      "Automações ilimitadas",
      "CRM completo",
      "WhatsApp + API",
      "Suporte dedicado",
    ],
  },
];

export default function Plans() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fonsecaApi.company.getMe();
        setCompany(data);
      } catch {
        notifyToast("Erro ao carregar planos.", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const currentPlan = company?.plan ?? "BASE";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Planos e benefícios</h1>
        <p className="mt-2 text-secondaryText/60">Compare e entenda cada plano.</p>
      </div>

      {loading && <p className="text-secondaryText/70">Carregando...</p>}

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrent = currentPlan === plan.key;

          return (
            <div
              key={plan.key}
              className={`rounded-2xl border p-6 ${
                isCurrent ? "border-primary bg-primary/5" : "border-secondary bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-secondaryText">{plan.name}</h3>
                {isCurrent && (
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    Atual
                  </span>
                )}
              </div>

              <p className="mt-2 text-secondaryText/60">{plan.description}</p>

              <p className="mt-4 text-3xl font-bold text-primary">{plan.price}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-secondaryText/80">
                    <HiCheckCircle className="text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {!isCurrent && (
                <button
                  onClick={() => notifyToast("Contrate o plano pelo painel de pagamento.", "success")}
                  className="mt-6 w-full rounded-xl bg-primary px-5 py-2 font-semibold text-primaryText transition hover:opacity-90"
                >
                  Assinar {plan.name}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
