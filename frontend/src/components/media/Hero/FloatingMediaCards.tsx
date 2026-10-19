import { useState } from "react";

const mediaCards = [
  {
    label: "produção",
    src: "/portfolio/media/fonseca-camera.jpeg",
    position: "left-[4%] top-[12%] rotate-[-8deg]",
  },
  {
    label: "estratégia",
    src: "/portfolio/media/fonseca-trabalho.jpeg",
    position: "right-[8%] top-[10%] rotate-[7deg]",
  },
  {
    label: "movimento",
    src: "/portfolio/media/fonseca-video.mp4",
    position: "right-[3%] bottom-[14%] rotate-[-6deg]",
  },
  {
    label: "presença",
    src: "/portfolio/media/fonseca-sorriso.jpeg",
    position: "left-[10%] bottom-[10%] rotate-[6deg]",
  },
];

function FloatingMediaCard({
  label,
  src,
  position,
}: (typeof mediaCards)[number]) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div
      className={`floating-media-card pointer-events-none absolute hidden aspect-[4/5] w-24 overflow-hidden rounded-xl border border-white/20 bg-white/[.06] shadow-2xl backdrop-blur-sm sm:block md:w-32 lg:w-40 ${position}`}
      aria-hidden="true"
    >
      {src.endsWith(".mp4") ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-75 mix-blend-screen"
          aria-hidden="true"
        />
      ) : hasImage ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-75 mix-blend-screen"
          onError={() => setHasImage(false)}
        />
      ) : null}
      {!hasImage ? (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium uppercase tracking-[.28em] text-white/60">
          {label}
        </span>
      ) : null}
      <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.2),transparent_38%,rgba(0,113,227,.2))]" />
    </div>
  );
}

export default function FloatingMediaCards() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {mediaCards.map((card) => (
        <FloatingMediaCard key={card.label} {...card} />
      ))}
    </div>
  );
}
