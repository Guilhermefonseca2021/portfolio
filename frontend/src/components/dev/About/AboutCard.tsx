type Props = {
  title: string;

  subtitle: string;
};

export default function AboutCard({ title, subtitle }: Props) {
  return (
    <div
      className="
                rounded-3xl
                border
                border-white/10
                bg-card
                p-8
                transition
                hover:-translate-y-2
                hover:border-primary
            "
    >
      <h3
        className="
                    text-4xl
                    font-bold
                    text-primary
                "
      >
        {title}
      </h3>

      <p
        className="
                    mt-4
                    text-sm
                    leading-6
                    text-secondaryText/70
                "
      >
        {subtitle}
      </p>
    </div>
  );
}
