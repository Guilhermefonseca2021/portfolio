import { useEffect, useState } from "react";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { Deal, Customer } from "../../types/api";

export default function Contracts() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [dealsData, customersData] = await Promise.all([
          fonsecaApi.deals.list(),
          fonsecaApi.customers.list(),
        ]);
        setDeals(dealsData);
        setCustomers(customersData);
      } catch {
        notifyToast("Erro ao carregar contratos.", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const wonDeals = deals.filter((deal) => deal.status === "WON");
  const customerMap = new Map(customers.map((c) => [c.id, c]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Contratos</h1>
        <p className="mt-2 text-secondaryText/60">Negócios fechados da sua empresa.</p>
      </div>

      {loading && <p className="text-secondaryText/70">Carregando contratos...</p>}

      {!loading && wonDeals.length === 0 && (
        <div className="rounded-2xl border border-dashed border-secondary bg-card p-12 text-center">
          <p className="text-secondaryText/60">Nenhum contrato fechado ainda.</p>
        </div>
      )}

      <div className="grid gap-4">
        {wonDeals.map((deal) => {
          const customer = customerMap.get(deal.customerId);
          return (
            <div key={deal.id} className="rounded-2xl border border-secondary bg-card p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-secondaryText">{deal.title ?? "Contrato"}</h3>
                  <p className="text-sm text-secondaryText/60">
                    Cliente: {customer?.name ?? "Sem cliente"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">R$ {(deal.value ?? 0).toFixed(2)}</p>
                  <p className="text-xs text-secondaryText/60">{deal.status}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
