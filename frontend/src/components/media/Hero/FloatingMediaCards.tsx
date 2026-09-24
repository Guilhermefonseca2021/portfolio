import { useState } from "react";

const mediaCards = [
  { label: "img 1", src: "/portfolio/media/img1.png", position: "left-[6%] top-[18%] rotate-[-8deg]" },
  { label: "img 2", src: "/portfolio/media/img2.png", position: "right-[10%] top-[14%] rotate-[7deg]" },
  { label: "img 3", src: "/portfolio/media/img3.png", position: "right-[4%] bottom-[18%] rotate-[-6deg]" },
  { label: "img 4", src: "/portfolio/media/img4.png", position: "left-[13%] bottom-[14%] rotate-[6deg]" },
  { label: "img 5", src: "/portfolio/media/img5.png", position: "left-1/2 top-[8%] rotate-[3deg]" },
];

function FloatingMediaCard({ label, src, position }: (typeof mediaCards)[number]) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div
      className={`floating-media-card pointer-events-none absolute hidden aspect-[4/5] w-24 overflow-hidden rounded-xl border border-white/20 bg-white/[.06] shadow-2xl backdrop-blur-sm sm:block md:w-32 lg:w-40 ${position}`}
      aria-hidden="true"
    >
      {hasImage ? (
        <img
          src={src}
          alt=""
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
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {mediaCards.map((card) => (
        <FloatingMediaCard key={card.label} {...card} />
      ))}
    </div>
  );
}
