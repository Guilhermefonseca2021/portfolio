interface Props {
  status: string;
}

const colors = {
  online: "bg-green-500/15 text-green-400 border-green-500/30",
  offline: "bg-red-500/15 text-red-400 border-red-500/30",
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  blocked: "bg-primary/15 text-primary border-primary/30",
};

export default function StatusBadge({ status }: Props) {
  const color =
    colors[status.toLowerCase() as keyof typeof colors] ??
    "bg-secondary text-secondaryText";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${color}`}
    >
      {status}
    </span>
  );
}
