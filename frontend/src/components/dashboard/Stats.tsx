export default function Stats() {
  const stats = [
    {
      title: "Usuários",
      value: "1.254",
      change: "+12%",
    },
    {
      title: "Projetos",
      value: "48",
      change: "+6%",
    },
    {
      title: "Receita",
      value: "R$ 12.450",
      change: "+18%",
    },
    {
      title: "Conversão",
      value: "32%",
      change: "+4%",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="
            rounded-2xl
            border
            border-secondary
            bg-card
            p-6
            transition-all
            hover:border-primary
            hover:-translate-y-1
          "
        >
          <p className="text-sm text-secondaryText/60">
            {item.title}
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            {item.value}
          </h2>

          <span className="mt-4 inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            {item.change}
          </span>
        </div>
      ))}
    </div>
  );
}