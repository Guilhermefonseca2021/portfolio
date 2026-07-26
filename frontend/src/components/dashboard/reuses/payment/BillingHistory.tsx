import {
  HiArrowDownTray,
  HiCheckCircle,
} from "react-icons/hi2";

const invoices = [
  {
    month: "Julho 2026",
    value: "R$149,00",
    status: "Pago",
  },
  {
    month: "Junho 2026",
    value: "R$149,00",
    status: "Pago",
  },
  {
    month: "Maio 2026",
    value: "R$149,00",
    status: "Pago",
  },
];

export default function BillingHistory() {
  return (
    <section className="rounded-2xl border border-secondary bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Histórico de Pagamentos
          </h2>

          <p className="mt-2 text-secondaryText/60">
            Todas as cobranças realizadas.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-secondary text-left">
              <th className="pb-4 text-secondaryText/60">
                Mês
              </th>

              <th className="pb-4 text-secondaryText/60">
                Valor
              </th>

              <th className="pb-4 text-secondaryText/60">
                Status
              </th>

              <th className="pb-4 text-right text-secondaryText/60">
                Fatura
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.month}
                className="border-b border-secondary/40"
              >
                <td className="py-5 text-secondaryText">
                  {invoice.month}
                </td>

                <td className="py-5 text-secondaryText">
                  {invoice.value}
                </td>

                <td className="py-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    <HiCheckCircle size={16} />
                    {invoice.status}
                  </span>
                </td>

                <td className="py-5 text-right">
                  <button className="inline-flex items-center gap-2 rounded-xl border border-secondary bg-secondary px-4 py-2 text-secondaryText transition hover:border-primary">
                    <HiArrowDownTray />
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
