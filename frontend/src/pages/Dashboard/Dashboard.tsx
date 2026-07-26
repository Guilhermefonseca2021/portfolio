import OrderStatistics from "../../components/dashboard/_layout/OrderStatistics";
import Stats from "../../components/dashboard/_layout/Stats";

import IncomeCard from "../../components/dashboard/reuses/cards/IncomeCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

        <p className="mt-2 text-secondaryText/60">
          Bem-vindo ao painel administrativo.
        </p>
      </div>

      {/* Cards */}

      <Stats />

      {/* Gráficos */}

      <div className="grid gap-6 xl:grid-cols-2">
        <OrderStatistics />

        <IncomeCard
          title="TOTAL INCOME"
          total={42842}
          prefix="R$ "
          sessions={[
            {
              label: "Phone",
              percentage: 60,
              value: 25705.2,
              color: "#22c55e",
            },
            {
              label: "Tablet",
              percentage: 30,
              value: 12852.6,
              color: "#4ade80",
            },
            {
              label: "Desktop",
              percentage: 8,
              value: 3427.36,
              color: "#86efac",
            },
            {
              label: "Other",
              percentage: 2,
              value: 856.84,
              color: "#bbf7d0",
            },
          ]}
        />
      </div>

      {/* Tabela */}


    </div>
  );
}
