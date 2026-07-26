import PricingCard from "./PricingCard";

interface Plan {
  title: string;
  description: string;
  price: string;
  period?: string;
  button: string;
  features: string[];
  highlighted?: boolean;
}

interface Props {
  plans: Plan[];
}

export default function PricingGrid({ plans }: Props) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </section>
  );
}
