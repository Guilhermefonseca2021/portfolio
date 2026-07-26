import IncomeCard from "../reuses/cards/IncomeCard";

export default function WhatsappStats() {
  const cards = [
    {
      title: "Conversas Hoje",
      total: 245,
      sessions: [
        {
          label: "Respondidas",
          value: 190,
          percentage: 78,
          color: "#22c55e",
        },
      ],
    },

    {
      title: "Mensagens",
      total: 1520,
      sessions: [
        {
          label: "Automáticas",
          value: 900,
          percentage: 60,
          color: "#8b5cf6",
        },
      ],
    },

    {
      title: "Clientes Ativos",
      total: 843,
      sessions: [
        {
          label: "Novos",
          value: 120,
          percentage: 20,
          color: "#06b6d4",
        },
      ],
    },
  ];

  return (
    <div
      className="
grid
grid-cols-1
md:grid-cols-3
gap-5
"
    >
      {cards.map((card, index) => (
        <IncomeCard key={index} {...card} />
      ))}
    </div>
  );
}
