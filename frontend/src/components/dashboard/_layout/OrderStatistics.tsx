import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const data = [
  {
    date: "Jul 24",
    Active: 8,
    Completed: 6,
    Canceled: 3,
  },
  {
    date: "Jul 23",
    Active: 2,
    Completed: 9,
    Canceled: 5,
  },
  {
    date: "Jul 22",
    Active: 3,
    Completed: 7,
    Canceled: 8,
  },
  {
    date: "Jul 21",
    Active: 7,
    Completed: 8,
    Canceled: 8,
  },
  {
    date: "Jul 20",
    Active: 3,
    Completed: 10,
    Canceled: 8,
  },
  {
    date: "Jul 19",
    Active: 10,
    Completed: 1,
    Canceled: 7,
  },
  {
    date: "Jul 18",
    Active: 10,
    Completed: 4,
    Canceled: 2,
  },
];

function StatCard({
  value,
  label,
  badge,
  color,
}: {
  value: string;
  label: string;
  badge: string;
  color: string;
}) {
  return (
    <div
      className="
      border border-white/10
      rounded-xl
      p-4
      bg-white/[0.02]
      flex
      flex-col
      gap-2
      "
    >
      <div className="flex items-center gap-2">
        <span
          className="
          text-lg
          font-semibold
          text-secondaryText
          "
        >
          {value}
        </span>

        <span
          className={`
          text-[11px]
          px-2
          py-1
          rounded
          ${color}
          `}
        >
          {badge}
        </span>
      </div>

      <span
        className="
        text-xs
        text-secondaryText/50
      "
      >
        {label}
      </span>
    </div>
  );
}

export default function OrderStatistics() {
  return (
    <div
      className="
      bg-card
      rounded-xl
      border
      border-white/10
      shadow-xl
      p-5
      w-full
      "
    >
      {/* Header */}
      <div
        className="
        flex
        justify-between
        items-center
        mb-5
        "
      >
        <h2
          className="
          text-sm
          font-semibold
          text-secondaryText
          "
        >
          Order Statistics
        </h2>

        <button
          className="
          text-secondaryText/50
          hover:text-primary
          "
        >
          ...
        </button>
      </div>

      {/* Cards */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-3
        mb-6
        "
      >
        <StatCard
          value="10"
          badge="$80"
          label="Active"
          color="bg-blue-500/20 text-blue-400"
        />

        <StatCard
          value="50"
          badge="+$469"
          label="Completed"
          color="bg-emerald-500/20 text-emerald-400"
        />

        <StatCard
          value="4"
          badge="-$130"
          label="Canceled"
          color="bg-red-500/20 text-red-400"
        />
      </div>

      {/* Chart */}
      <div
        className="
        h-[300px]
        w-full
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={true} />

            <XAxis dataKey="date" stroke="#f0e6ff80" fontSize={11} />

            <YAxis stroke="#f0e6ff80" fontSize={11} />

            <Tooltip
              contentStyle={{
                background: "#040121",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Legend
              wrapperStyle={{
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="Active"
              stroke="#60a5fa"
              fill="url(#active)"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="Completed"
              stroke="#34d399"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />

            <Line
              type="monotone"
              dataKey="Canceled"
              stroke="#fb7185"
              strokeWidth={2}
              dot={{
                r: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
