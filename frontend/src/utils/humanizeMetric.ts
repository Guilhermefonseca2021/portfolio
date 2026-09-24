const contentUnits = [
  { value: 1_000_000, label: "milhão" },
  { value: 1_000, label: "mil" },
];

export function humanizeContentCount(value: number) {
  const unit = contentUnits.find((item) => value >= item.value);

  if (!unit) return `+${value}`;

  const amount = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 1,
  }).format(value / unit.value);

  return `+${amount} ${unit.label}`;
}
