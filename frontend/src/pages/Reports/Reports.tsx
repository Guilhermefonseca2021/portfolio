import { useMemo, useState } from "react";
import {
  HiArrowDownTray,
  HiChartBar,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi2";

import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";

type Source = {
  name: string;
  total: number;
  percentage: number;
};

type Seller = {
  name: string;
  leads: number;
  clients: number;
};

type LastLead = {
  id: number;
  name: string;
  source: string;
  date: string;
  status: string;
};

const sources: Source[] = [
  {
    name: "Instagram",
    total: 412,
    percentage: 42,
  },
  {
    name: "Google",
    total: 283,
    percentage: 29,
  },
  {
    name: "Site",
    total: 162,
    percentage: 16,
  },
  {
    name: "WhatsApp",
    total: 74,
    percentage: 8,
  },
  {
    name: "Facebook",
    total: 51,
    percentage: 5,
  },
];

const sellers: Seller[] = [
  {
    name: "Guilherme",
    leads: 156,
    clients: 42,
  },
  {
    name: "Lucas",
    leads: 104,
    clients: 29,
  },
  {
    name: "Pedro",
    leads: 81,
    clients: 18,
  },
];

const lastLeads: LastLead[] = [
  {
    id: 1,
    name: "Carlos Henrique",
    source: "Instagram",
    date: "Hoje",
    status: "Novo",
  },
  {
    id: 2,
    name: "Amanda Souza",
    source: "Google",
    date: "Hoje",
    status: "Contato",
  },
  {
    id: 3,
    name: "João Pedro",
    source: "Site",
    date: "Ontem",
    status: "Proposta",
  },
  {
    id: 4,
    name: "Fernanda Alves",
    source: "WhatsApp",
    date: "Ontem",
    status: "Negociação",
  },
];

const periods = ["Hoje", "7 dias", "30 dias", "90 dias", "Este ano"];

export default function Reports() {
  const [period, setPeriod] = useState("30 dias");

  const totalLeads = useMemo(
    () => sources.reduce((acc, item) => acc + item.total, 0),
    [],
  );

  const totalClients = useMemo(
    () => sellers.reduce((acc, item) => acc + item.clients, 0),
    [],
  );

  const conversion = Math.round((totalClients / totalLeads) * 100);

  const revenue = 184500;

  const chartMax = Math.max(...sources.map((item) => item.total));

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

      {/* Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <IncomeCard title="Total de Leads" total={totalLeads} sessions={[]} />

        <IncomeCard title="Clientes" total={totalClients} sessions={[]} />

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
                Distribuição por plataforma
              </p>
            </div>
          </div>

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
        </div>

        {/* Ranking */}

        <div className="rounded-2xl border border-secondary bg-card p-6 xl:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <HiUsers size={24} className="text-primary" />

            <div>
              <h2 className="text-xl font-bold text-secondaryText">
                Responsáveis
              </h2>

              <p className="text-sm text-secondaryText/50">
                Desempenho da equipe
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {sellers.map((seller) => {
              const percent = Math.round((seller.clients / seller.leads) * 100);

              return (
                <div
                  key={seller.name}
                  className="rounded-xl border border-secondary bg-bg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-secondaryText">
                        {seller.name}
                      </p>

                      <span className="text-sm text-secondaryText/60">
                        {seller.leads} Leads
                      </span>
                    </div>

                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {percent}%
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>

                  <div className="mt-3 flex justify-between text-sm text-secondaryText/60">
                    <span>Clientes</span>

                    <span>{seller.clients}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Resumo */}

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="mb-5 flex items-center gap-3">
            <HiUserGroup size={22} className="text-primary" />

            <h2 className="text-lg font-bold text-secondaryText">Resumo</h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-secondaryText/60">Melhor origem</span>

              <span className="font-semibold text-primary">Instagram</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondaryText/60">Mais leads</span>

              <span className="font-semibold text-secondaryText">
                Segunda-feira
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

        {/* Últimos Leads */}

        <div className="rounded-2xl border border-secondary bg-card p-6 xl:col-span-2">
          <h2 className="mb-5 text-lg font-bold text-secondaryText">
            Últimos Leads
          </h2>

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
                    {lead.source}
                  </span>
                </div>

                <div className="text-right">
                  <span className="block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {lead.status}
                  </span>

                  <p className="mt-2 text-xs text-secondaryText/50">
                    {lead.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
