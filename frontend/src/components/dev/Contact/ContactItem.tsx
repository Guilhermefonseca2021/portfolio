import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
};

export default function ContactItem({ icon, title, value }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-3xl">{icon}</div>

      <div>
        <h4 className="font-semibold text-secondaryText">{title}</h4>

        <p className="text-secondaryText/70">{value}</p>
      </div>
    </div>
  );
}
