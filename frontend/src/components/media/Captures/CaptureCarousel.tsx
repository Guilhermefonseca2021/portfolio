import { useEffect, useState } from "react";

const images = [
  "/images/portfolio/img1.webp",
  "/images/portfolio/img2.webp",
  "/images/portfolio/img3.webp",
];

export default function CaptureCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  function next() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
          bg-black/20
        "
      >
        <img
          src={images[current]}
          alt="Projeto Social Media"
          draggable={false}
          className="
            h-full
            w-full
            object-contain
            select-none
            transition-all
            duration-500
          "
        />
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
        {images.map((_, index) => (
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
