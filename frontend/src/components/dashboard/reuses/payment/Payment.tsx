import CurrentPlan from "./CurrentPlan";
import PaymentMethod from "./PaymentMethod";
import PaymentForm from "./PaymentForm";
import BillingHistory from "./BillingHistory";

export default function Payment() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Pagamentos</h1>

        <p className="mt-2 text-secondaryText/60">
          Gerencie seu plano, cartão e histórico de pagamentos.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CurrentPlan />

        <PaymentMethod />
      </div>

      <PaymentForm />

      <BillingHistory />
    </div>
  );
}
