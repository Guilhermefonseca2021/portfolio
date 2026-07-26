import {
  HiChartBar,
  HiCurrencyDollar,
  HiArrowTrendingUp,
  HiReceiptPercent,
} from "react-icons/hi2";

import Payment from "../../components/dashboard/reuses/payment/Payment";

export default function Finance() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Financeiro</h1>

        <p className="mt-2 text-secondaryText/60">
          Gerencie pagamentos, assinaturas, cobranças e acompanhe os indicadores
          financeiros da sua conta.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-secondaryText/60">Receita Mensal</span>

            <HiCurrencyDollar size={24} className="text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-primary">R$ 8.450</h2>

          <p className="mt-2 text-sm text-green-400">+12% este mês</p>
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-secondaryText/60">Pagamentos</span>

            <HiReceiptPercent size={24} className="text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-primary">156</h2>

          <p className="mt-2 text-sm text-secondaryText/60">Processados</p>
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-secondaryText/60">Assinantes</span>

            <HiChartBar size={24} className="text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-primary">342</h2>

          <p className="mt-2 text-sm text-secondaryText/60">Clientes ativos</p>
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-secondaryText/60">Crescimento</span>

            <HiArrowTrendingUp size={24} className="text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-primary">+24%</h2>

          <p className="mt-2 text-sm text-green-400">Últimos 30 dias</p>
        </div>
      </div>

      {/* Componente de Pagamento */}
      <Payment />
    </div>
  );
}
