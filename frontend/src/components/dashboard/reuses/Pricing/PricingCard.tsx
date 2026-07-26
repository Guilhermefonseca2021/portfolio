import { HiCheck } from "react-icons/hi2";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  button: string;
  highlighted?: boolean;
  onClick?: () => void;
}

export default function PricingCard({
  title,
  description,
  price,
  period,
  features,
  button,
  highlighted = false,
  onClick,
}: PricingCardProps) {
  return (
    <div
      className={`
        flex h-full flex-col rounded-2xl border p-6 transition-all duration-300
        hover:-translate-y-1 hover:border-primary
        ${
          highlighted
            ? "border-primary bg-secondary"
            : "border-secondary bg-card"
        }
      `}
    >
      <div>
        <h3 className="text-2xl font-bold text-primary">{title}</h3>

        <p className="mt-2 text-sm text-secondaryText/70">
          {description}
        </p>
      </div>

      <div className="my-8">
        <span className="text-5xl font-bold text-secondaryText">
          {price}
        </span>

        {period && (
          <span className="ml-1 text-secondaryText/60">
            {period}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-4">
        {features.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <HiCheck className="text-primary" />

            <span className="text-secondaryText/80">
              {item}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onClick}
        className="
          mt-8 w-full rounded-xl
          bg-primary
          px-4 py-3
          font-semibold
          text-primaryText
          transition
          hover:opacity-90
        "
      >
        {button}
      </button>
    </div>
  );
}
