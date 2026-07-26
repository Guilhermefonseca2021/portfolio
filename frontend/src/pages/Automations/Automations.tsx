// src/pages/dashboard/Automations.tsx

import { FiPlus } from "react-icons/fi";
import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";
import DataTable from "../../components/dashboard/reuses/table/DataTable";
import StatusBadge from "../../components/dashboard/reuses/table/StatusBadge";

type Flow = {
  name: string;
  avatar: string;
  trigger: string;
  category: string;
  status: "Ativo" | "Pausado" | "Erro";
  executions: number;
};

const flows: Flow[] = [
  {
    name: "Boas-vindas WhatsApp",
    avatar: "https://i.pravatar.cc/80?img=10",
    trigger: "Novo Lead",
    category: "WhatsApp",
    status: "Ativo",
    executions: 1820,
  },
  {
    name: "Carrinho Abandonado",
    avatar: "https://i.pravatar.cc/80?img=11",
    trigger: "Compra",
    category: "E-commerce",
    status: "Ativo",
    executions: 932,
  },
  {
    name: "Lead CRM",
    avatar: "https://i.pravatar.cc/80?img=12",
    trigger: "Formulário",
    category: "CRM",
    status: "Pausado",
    executions: 512,
  },
  {
    name: "Follow-up Comercial",
    avatar: "https://i.pravatar.cc/80?img=13",
    trigger: "Pipeline",
    category: "CRM",
    status: "Erro",
    executions: 88,
  },
];

export default function Automations() {
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

      <DataTable<Flow>
        title="Fluxos de Automação"
        description="Todos os fluxos cadastrados na plataforma."
        data={flows}
        columns={[
          {
            key: "name",
            title: "Fluxo",
            render: (row) => (
              <div className="flex items-center gap-3">
                <img
                  src={row.avatar}
                  alt={row.name}
                  className="h-11 w-11 rounded-xl border border-secondary object-cover"
                />

                <div>
                  <p className="font-semibold text-secondaryText">{row.name}</p>

                  <p className="text-sm text-secondaryText/60">
                    {row.category}
                  </p>
                </div>
              </div>
            ),
          },
          {
            key: "trigger",
            title: "Disparo",
          },
          {
            key: "executions",
            title: "Execuções",
            render: (row) => (
              <span className="font-semibold text-primary">
                {row.executions.toLocaleString("pt-BR")}
              </span>
            ),
          },
          {
            key: "status",
            title: "Status",
            render: (row) => <StatusBadge status={row.status} />,
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
    </div>
  );
}
