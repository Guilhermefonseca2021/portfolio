
type Props = {
  service: Service;
};

export default function ServiceCard({ service }: Props) {
  return (
    <article
      className="
        rounded-3xl
        border
        border-white/10
        bg-card
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-primary
        hover:shadow-2xl
      "
    >
      <div className="mb-6 text-5xl">
        {service.icon}
      </div>

      <h3 className="text-2xl font-bold text-secondaryText">
        {service.title}
      </h3>

      <p className="mt-4 leading-7 text-secondaryText/70">
        {service.description}
      </p>
    </article>
  );
}