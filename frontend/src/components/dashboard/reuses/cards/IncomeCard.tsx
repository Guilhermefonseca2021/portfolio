import { useEffect, useRef, useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

type Session = {
  label: string;
  value: number;
  percentage: number;
  color: string;
};

interface IncomeCardProps {
  title: string;
  total: number;
  prefix?: string;
  decimals?: number;
  sessions: Session[];
  defaultOpen?: boolean;
}

function AnimatedNumber({
  value,
  duration = 1600,
  prefix = "",
  decimals = 2,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);

      setDisplayValue(value * progress);

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      }
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, duration]);

  return (
    <>
      {prefix}
      {displayValue.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </>
  );
}

export default function IncomeCard({
  title,
  total,
  prefix = "$",
  decimals = 2,
  sessions,
  defaultOpen = true,
}: IncomeCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  function getGridCols() {
    switch (sessions.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      default:
        return "grid-cols-2 lg:grid-cols-4";
    }
  }

  return (
    <div className="rounded-2xl border border-secondary bg-card p-6 shadow-lg transition-all duration-300">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-secondaryText">{title}</h3>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-secondaryText/70 transition hover:bg-secondary hover:text-primary"
        >
          {open ? (
            <FaChevronCircleUp size={18} />
          ) : (
            <FaChevronCircleDown size={18} />
          )}
        </button>
      </div>

      {/* Conteúdo */}

      <div
        className={`grid overflow-hidden transition-all duration-500 ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* Total */}

          <h2 className="text-4xl font-bold text-primary">
            <AnimatedNumber
              value={total}
              prefix={prefix}
              decimals={decimals}
              duration={2000}
            />
          </h2>

          {/* Barra */}

          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-secondary">
            {sessions.map((item) => (
              <div
                key={item.label}
                className="transition-all duration-700"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            ))}
          </div>

          {/* Estatísticas */}

          <div className={`mt-6 grid gap-4 ${getGridCols()}`}>
            {sessions.map((item) => (
              <div
                key={item.label}
                className="border-l border-secondary pl-4 first:border-none first:pl-0"
              >
                <div className="flex items-center gap-2 text-sm text-secondaryText/60">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span>{item.label}</span>
                </div>

                <div className="mt-2 text-xl font-semibold text-secondaryText">
                  <AnimatedNumber
                    value={item.value}
                    prefix={prefix}
                    decimals={decimals}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
