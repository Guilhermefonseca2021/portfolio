import { useEffect, useMemo, useState } from "react";
import {
  HiArrowDownTray,
  HiChartBar,
  HiUserGroup,
} from "react-icons/hi2";

import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";
import fonsecaApi from "../../services/fonsecaApi";
import type { Lead, Customer, Deal } from "../../types/api";

const periods = ["Hoje", "7 dias", "30 dias", "90 dias", "Este ano"];

export default function Reports() {
  const [period, setPeriod] = useState("30 dias");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [leadData, customerData, dealData] = await Promise.all([
          fonsecaApi.leads.list(),
          fonsecaApi.customers.list(),
          fonsecaApi.deals.list(),
        ]);
        setLeads(leadData);
        setCustomers(customerData);
        setDeals(dealData);
      } catch (err) {
        setError(
          fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar relatórios."),
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ===========================
  // METRICS REAIS
  // ===========================

  const totalLeads = leads.length;
  const totalClients = customers.length;
  const conversion =
    totalLeads > 0 ? Math.round((totalClients / totalLeads) * 100) : 0;

  // Receita estimada: soma dos deals WON
  const revenue = useMemo(() => {
    return deals
      .filter((deal) => deal.status === "WON")
      .reduce((acc, deal) => acc + (Number(deal.value) || 0), 0);
  }, [deals]);

  // Origem dos leads: extrai do campo notes (primeira linha)
  const sources = useMemo(() => {
    const map: Record<string, number> = {};

    for (const lead of leads) {
      const firstLine = lead.notes?.split("\n")[0] ?? "";
      const source = firstLine.replace("Empresa:", "").trim() || "Sem origem";
      map[source] = (map[source] ?? 0) + 1;
    }

    return Object.entries(map)
      .map(([name, total]) => ({
        name,
        total,
        percentage:
          totalLeads > 0 ? Math.round((total / totalLeads) * 100) : 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [leads, totalLeads]);

  // Últimos leads
  const lastLeads = useMemo(() => {
    return [...leads]
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      )
      .slice(0, 5);
  }, [leads]);

  const chartMax = Math.max(...sources.map((item) => item.total), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondaryText">Relatórios</h1>

          <p className="mt-1 text-secondaryText/60">
            Resumo do desempenho comercial e origem dos leads.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-secondary bg-card px-4 py-3 text-secondaryText outline-none focus:border-primary"
          >
            {periods.map((item) => (
              <option key={item} value={item} className="bg-card">
                {item}
              </option>
            ))}
          </select>

          <button className="flex items-center gap-2 rounded-xl border border-secondary bg-card px-5 py-3 text-secondaryText transition hover:border-primary">
            <HiArrowDownTray />
            Exportar
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-secondaryText/70">Carregando relatórios...</p>
      ) : error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : (
        <>
          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <IncomeCard
              title="Total de Leads"
              total={totalLeads}
              prefix=""
              decimals={0}
              sessions={[]}
            />

            <IncomeCard
              title="Clientes"
              total={totalClients}
              prefix=""
              decimals={0}
              sessions={[]}
            />

            <IncomeCard
              title="Conversão"
              total={conversion}
              prefix=""
              decimals={0}
              sessions={[]}
            />

            <IncomeCard
              title="Receita"
              total={revenue}
              prefix="R$ "
              sessions={[]}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-5">
            {/* Origem */}
            <div className="rounded-2xl border border-secondary bg-card p-6 xl:col-span-3">
              <div className="mb-6 flex items-center gap-3">
                <HiChartBar size={24} className="text-primary" />

                <div>
                  <h2 className="text-xl font-bold text-secondaryText">
                    Origem dos Leads
                  </h2>

                  <p className="text-sm text-secondaryText/50">
                    Distribuição por origem
                  </p>
                </div>
              </div>

              {sources.length === 0 ? (
                <p className="text-secondaryText/60">
                  Sem dados suficientes para gerar este relatório.
                </p>
              ) : (
                <div className="space-y-5">
                  {sources.map((source) => (
                    <div key={source.name}>
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium text-secondaryText">
                          {source.name}
                        </span>

                        <span className="text-sm text-secondaryText/60">
                          {source.total} ({source.percentage}%)
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${(source.total / chartMax) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumo */}
            <div className="rounded-2xl border border-secondary bg-card p-6 xl:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <HiUserGroup size={22} className="text-primary" />

                <h2 className="text-lg font-bold text-secondaryText">
                  Resumo
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-secondaryText/60">Total de leads</span>

                  <span className="font-semibold text-primary">
                    {totalLeads}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-secondaryText/60">Total de clientes</span>

                  <span className="font-semibold text-secondaryText">
                    {totalClients}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-secondaryText/60">Negociações</span>

                  <span className="font-semibold text-secondaryText">
                    {deals.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-secondaryText/60">Conversão média</span>

                  <span className="font-semibold text-green-400">
                    {conversion}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-secondaryText/60">Receita estimada</span>

                  <span className="font-semibold text-secondaryText">
                    R$ {revenue.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Últimos Leads */}
          <div className="rounded-2xl border border-secondary bg-card p-6">
            <h2 className="mb-5 text-lg font-bold text-secondaryText">
              Últimos Leads
            </h2>

            {lastLeads.length === 0 ? (
              <p className="text-secondaryText/60">
                Sem dados suficientes para gerar este relatório.
              </p>
            ) : (
              <div className="space-y-4">
                {lastLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between rounded-xl border border-secondary bg-bg px-5 py-4"
                  >
                    <div>
                      <p className="font-semibold text-secondaryText">
                        {lead.name}
                      </p>

                      <span className="text-sm text-secondaryText/60">
                        {lead.email ?? lead.phone ?? "-"}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {lead.status ?? "LEAD"}
                      </span>

                      <p className="mt-2 text-xs text-secondaryText/50">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString("pt-BR")
                          : "-"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
