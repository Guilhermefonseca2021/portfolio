// src/pages/dashboard/Automations.tsx

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";
import DataTable from "../../components/dashboard/reuses/table/DataTable";
import StatusBadge from "../../components/dashboard/reuses/table/StatusBadge";
import fonsecaApi from "../../services/fonsecaApi";
import type { Automation } from "../../types/api";

export default function Automations() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAutomations() {
      try {
        setLoading(true);
        setError(null);
        const data = await fonsecaApi.automations.list();
        setAutomations(data);
      } catch (err) {
        setError(
          fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar automações."),
        );
      } finally {
        setLoading(false);
      }
    }

    loadAutomations();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold text-primary">Automações</h1>

        <p className="mt-2 text-secondaryText/60">
          Gerencie todos os fluxos inteligentes da plataforma.
        </p>
      </div>

      {/* DASHBOARD */}

      <div className="grid gap-6 xl:grid-cols-2">
        <IncomeCard
          title="Fluxos"
          total={42}
          prefix=""
          decimals={0}
          sessions={[
            {
              label: "Ativos",
              value: 30,
              percentage: 72,
              color: "#22c55e",
            },
            {
              label: "Pausados",
              value: 8,
              percentage: 19,
              color: "#f59e0b",
            },
            {
              label: "Erro",
              value: 4,
              percentage: 9,
              color: "#ef4444",
            },
          ]}
        />

        <IncomeCard
          title="Execuções Hoje"
          total={15482}
          prefix=""
          decimals={0}
          sessions={[
            {
              label: "WhatsApp",
              value: 8500,
              percentage: 55,
              color: "#25D366",
            },
            {
              label: "CRM",
              value: 3800,
              percentage: 25,
              color: "#c89bff",
            },
            {
              label: "Email",
              value: 2000,
              percentage: 13,
              color: "#3b82f6",
            },
            {
              label: "API",
              value: 1182,
              percentage: 7,
              color: "#f97316",
            },
          ]}
        />

        <IncomeCard
          title="Conversões"
          total={674}
          prefix=""
          decimals={0}
          sessions={[
            {
              label: "Leads",
              value: 322,
              percentage: 48,
              color: "#22c55e",
            },
            {
              label: "Vendas",
              value: 201,
              percentage: 30,
              color: "#c89bff",
            },
            {
              label: "Agendamentos",
              value: 151,
              percentage: 22,
              color: "#3b82f6",
            },
          ]}
        />

        <IncomeCard
          title="Economia de Tempo"
          total={126}
          prefix=""
          decimals={0}
          sessions={[
            {
              label: "Horas",
              value: 126,
              percentage: 100,
              color: "#c89bff",
            },
          ]}
        />
      </div>

      {/* TABELA */}

      <DataTable<Automation>
        title="Fluxos de Automação"
        description="Todos os fluxos cadastrados na plataforma."
        data={automations}
        columns={[
          {
            key: "name",
            title: "Fluxo",
            render: (row) => (
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary bg-secondary/20 font-semibold text-secondaryText">
                  {row.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-secondaryText">{row.name}</p>

                  <p className="text-sm text-secondaryText/60">{row.keyword}</p>
                </div>
              </div>
            ),
          },
          {
            key: "response",
            title: "Resposta",
            render: (row) => (
              <span className="text-secondaryText">{row.response}</span>
            ),
          },
          {
            key: "priority",
            title: "Prioridade",
            render: (row) => (
              <span className="font-semibold text-primary">{row.priority}</span>
            ),
          },
          {
            key: "active",
            title: "Status",
            render: (row) => (
              <StatusBadge status={row.active ? "Ativo" : "Pausado"} />
            ),
          },
          {
            key: "actions",
            title: "",
            render: () => (
              <button className="rounded-xl border border-secondary px-4 py-2 text-sm text-secondaryText transition hover:bg-secondary">
                Editar
              </button>
            ),
          },
        ]}
        actions={
          <div className="flex gap-3">
            <button className="rounded-xl border border-secondary px-4 py-2 text-sm text-secondaryText transition hover:bg-secondary">
              Ver Todos
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primaryText transition hover:opacity-90">
              <FiPlus size={16} />
              Novo Fluxo
            </button>
          </div>
        }
        pagination={{
          page: 1,
          totalPages: 5,
          onPrevious: () => {},
          onNext: () => {},
        }}
      />

      {loading && (
        <p className="text-secondaryText/70">Carregando automações...</p>
      )}
      {!loading && !error && automations.length === 0 && (
        <p className="text-secondaryText/70">Nenhuma automação encontrada.</p>
      )}
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
