import { useEffect, useState } from "react";
import {
  HiChartBar,
  HiCurrencyDollar,
  HiArrowTrendingUp,
  HiReceiptPercent,
} from "react-icons/hi2";
import Payment from "../../components/dashboard/reuses/payment/Payment";
import fonsecaApi from "../../services/fonsecaApi";
import type { Deal } from "../../types/api";

export default function Finance() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const dealData = await fonsecaApi.deals.list();
      setDeals(dealData);
    } catch (err) {
      setError(
        fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar financeiro."),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Receita: soma dos deals WON
  const receita = deals
    .filter((deal) => deal.status === "WON")
    .reduce((acc, deal) => acc + (Number(deal.value) || 0), 0);

  // Pagamentos: deals WON
  const pagamentos = deals.filter((deal) => deal.status === "WON").length;

  // Assinantes: clientes com deals
  const assinantes = new Set(deals.map((deal) => deal.customerId)).size;

  // Crescimento: % de deals WON vs total
  const crescimento =
    deals.length > 0
      ? Math.round(
          (deals.filter((deal) => deal.status === "WON").length /
            deals.length) *
            100,
        )
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Financeiro</h1>

        <p className="mt-2 text-secondaryText/60">
          Acompanhe os indicadores financeiros da sua conta.
        </p>
      </div>

      {loading ? (
        <p className="text-secondaryText/70">Carregando financeiro...</p>
      ) : error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : (
        <>
          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-secondary bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="text-secondaryText/60">Receita</span>

                <HiCurrencyDollar size={24} className="text-primary" />
              </div>

              <h2 className="mt-4 text-3xl font-bold text-primary">
                R$ {receita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </h2>

              <p className="mt-2 text-sm text-secondaryText/60">
                Deals ganhos
              </p>
            </div>

            <div className="rounded-2xl border border-secondary bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="text-secondaryText/60">Pagamentos</span>

                <HiReceiptPercent size={24} className="text-primary" />
              </div>

              <h2 className="mt-4 text-3xl font-bold text-primary">
                {pagamentos}
              </h2>

              <p className="mt-2 text-sm text-secondaryText/60">
                Deals ganhos
              </p>
            </div>

            <div className="rounded-2xl border border-secondary bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="text-secondaryText/60">Clientes</span>

                <HiChartBar size={24} className="text-primary" />
              </div>

              <h2 className="mt-4 text-3xl font-bold text-primary">
                {assinantes}
              </h2>

              <p className="mt-2 text-sm text-secondaryText/60">
                Com negociações
              </p>
            </div>

            <div className="rounded-2xl border border-secondary bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="text-secondaryText/60">Conversão</span>

                <HiArrowTrendingUp size={24} className="text-primary" />
              </div>

              <h2 className="mt-4 text-3xl font-bold text-primary">
                {crescimento}%
              </h2>

              <p className="mt-2 text-sm text-secondaryText/60">
                Deals ganhos / total
              </p>
            </div>
          </div>

          {/* Lista de negociações */}
          <div className="rounded-2xl border border-secondary bg-card p-6">
            <h2 className="text-lg font-semibold text-secondaryText">
              Negociações
            </h2>

            {deals.length === 0 ? (
              <p className="mt-4 text-secondaryText/60">
                Nenhuma negociação encontrada.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between rounded-xl border border-secondary bg-bg p-4"
                  >
                    <div>
                      <p className="font-semibold text-secondaryText">
                        {deal.title ?? "Negociação"}
                      </p>

                      <span className="text-sm text-secondaryText/60">
                        {deal.customer?.name ?? "Cliente"}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        R${" "}
                        {(Number(deal.value) || 0).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>

                      <span
                        className={`text-xs font-semibold ${
                          deal.status === "WON"
                            ? "text-green-400"
                            : deal.status === "LOST"
                              ? "text-red-400"
                              : "text-yellow-400"
                        }`}
                      >
                        {deal.status === "WON"
                          ? "Ganho"
                          : deal.status === "LOST"
                            ? "Perdido"
                            : "Aberto"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Componente de Pagamento */}
      <Payment />
    </div>
  );
}
