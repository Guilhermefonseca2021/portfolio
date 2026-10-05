import { useEffect, useState } from "react";

const images = [
  "/images/portfolio/img1.webp",
  "/images/portfolio/img2.webp",
  "/images/portfolio/img3.webp",
];

const videos = [
  "/portfolio/media/trabalho-01.mp4",
  "/portfolio/media/trabalho-02.mp4",
];

export default function CaptureCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % (images.length + videos.length));
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  function next() {
    setCurrent((prev) => (prev + 1) % (images.length + videos.length));
  }

  function prev() {
    setCurrent((prev) => (prev === 0 ? images.length + videos.length - 1 : prev - 1));
  }

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-card
      "
    >
      {/* BOX FIXO */}
      <div
        className="
          flex
          w-full
          h-[220px]
          sm:h-[320px]
          md:h-[420px]
          items-center
          justify-center
          bg-[#0b1220]
        "
      >
        {current >= images.length ? (
          <video
            src={videos[current - images.length]}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover select-none"
            aria-label="Vídeo de trabalho da Fonseca Social Media"
          />
        ) : <img
          src={images[current]}
          alt="Projeto Social Media"
          draggable={false}
          className="
            h-full
            w-full
            object-cover
            select-none
            transition-all
            duration-500
          "
        />}
      </div>

      {/* ESQUERDA */}
      <button
        onClick={prev}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-black/50
          text-2xl
          text-white
          backdrop-blur
          hover:bg-black/70
        "
      >
        ‹
      </button>

      {/* DIREITA */}
      <button
        onClick={next}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-black/50
          text-2xl
          text-white
          backdrop-blur
          hover:bg-black/70
        "
      >
        ›
      </button>

      {/* DOTS */}
      <div
        className="
          absolute
          bottom-4
          left-1/2
          flex
          -translate-x-1/2
          gap-2
        "
      >
        {[...images, ...videos].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              h-2
              rounded-full
              transition-all
              ${current === index ? "w-8 bg-white" : "w-2 bg-white/40"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
