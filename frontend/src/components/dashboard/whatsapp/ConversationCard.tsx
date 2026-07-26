interface Props {
  name: string;
  message: string;
  time: string;
  status: "online" | "offline";
}

export default function ConversationCard({
  name,
  message,
  time,
  status,
}: Props) {
  return (
    <div
      className="
      p-3
      rounded-xl
      bg-secondaryText/5
      hover:bg-secondaryText/10
      cursor-pointer
      "
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-primary">
          {name}
        </h3>

        <span className="text-xs text-secondaryText/60">
          {time}
        </span>
      </div>

      <p className="text-sm text-secondaryText/70 mt-1">
        {message}
      </p>

      <span
        className={`
          text-xs
          ${
            status === "online"
              ? "text-green-400"
              : "text-secondaryText/40"
          }
        `}
      >
        {status}
      </span>
    </div>
  );
}
