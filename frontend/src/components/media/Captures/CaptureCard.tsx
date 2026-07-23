type Props = {
  image: string;
};

export default function CaptureCard({ image }: Props) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-card
        transition
        duration-300
        hover:-translate-y-1
        hover:border-primary/40
      "
    >
      <div
        className="
          aspect-square
          w-full
          overflow-hidden
        "
      >
        <img
          src={image}
          alt="Produção de conteúdo"
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />
      </div>
    </article>
  );
}
