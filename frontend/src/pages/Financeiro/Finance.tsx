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

          <h2 className="mt-4 text-3xl font-bold text-primary">R$ 0,00</h2>

          <p className="mt-2 text-sm text-secondaryText/60">
            Sem dados disponíveis
          </p>
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-secondaryText/60">Pagamentos</span>

            <HiReceiptPercent size={24} className="text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-primary">0</h2>

          <p className="mt-2 text-sm text-secondaryText/60">
            Sem dados disponíveis
          </p>
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-secondaryText/60">Assinantes</span>

            <HiChartBar size={24} className="text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-primary">0</h2>

          <p className="mt-2 text-sm text-secondaryText/60">
            Sem dados disponíveis
          </p>
        </div>

        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-secondaryText/60">Crescimento</span>

            <HiArrowTrendingUp size={24} className="text-primary" />
          </div>

          <h2 className="mt-4 text-3xl font-bold text-primary">0%</h2>

          <p className="mt-2 text-sm text-secondaryText/60">
            Sem dados disponíveis
          </p>
        </div>
      </div>

      {/* Aviso de integração pendente */}
      <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
        <h2 className="text-lg font-semibold text-yellow-300">
          Módulo financeiro ainda não integrado
        </h2>

        <p className="mt-2 text-sm text-yellow-200/70">
          O backend ainda não possui endpoints de receitas, despesas ou
          movimentações financeiras. Assim que estes recursos estiverem
          disponíveis, os indicadores serão preenchidos com dados reais.
        </p>
      </div>

      {/* Componente de Pagamento */}
      <Payment />
    </div>
  );
}
