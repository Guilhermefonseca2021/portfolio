import type { KeyboardEvent, TouchEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MotionReveal from "./MotionReveal";

export interface CarouselItem {
  tag: string;
  titleLine1: string;
  titleLine2?: string;
  desc: string;
  img: string;
  type: "image" | "video";
  ctaText?: string;
  ctaUrl?: string;
}

export interface CoverFlowCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
}

const portfolioItems: CarouselItem[] = [
  {
    tag: "Making of",
    titleLine1: "EVENTOS",
    desc: "Bastidores de uma captação para eventos.",
    img: "/portfolio/videos/makeoff-eventos.webm",
    type: "video",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
  {
    tag: "Making of",
    titleLine1: "JOALHERIAS",
    desc: "Bastidores de produção de conteúdo para joalherias.",
    img: "/portfolio/videos/makeoff-joalherias.webm",
    type: "video",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
  {
    tag: "Gastronomia",
    titleLine1: "RESTAURANTE",
    titleLine2: "CAPTAÇÃO 01",
    desc: "Bastidores de produção de conteúdo para restaurante.",
    img: "/portfolio/videos/makeoff-restaurant.webm",
    type: "video",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
  {
    tag: "Gastronomia",
    titleLine1: "RESTAURANTE",
    titleLine2: "CAPTAÇÃO 02",
    desc: "Uma segunda captação de conteúdo para restaurante.",
    img: "/portfolio/videos/makeoff2-restaurant.webm",
    type: "video",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
  {
    tag: "Mercado imobiliário",
    titleLine1: "CORRETORES",
    titleLine2: "DE IMÓVEIS",
    desc: "Bastidores de uma captação para corretores de imóveis.",
    img: "/portfolio/videos/makeoff3-corretores-imoveis.webm",
    type: "video",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
  {
    tag: "Making of",
    titleLine1: "PRODUÇÃO",
    titleLine2: "NA PRÁTICA",
    desc: "Bastidores de uma captação da Fonseca.",
    img: "/portfolio/media/fonseca-video.mp4",
    type: "video",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
  {
    tag: "Cliente",
    titleLine1: "CONTEÚDO",
    titleLine2: "PARA MARCAS",
    desc: "Produção de conteúdo em uma concessionária Honda.",
    img: "/portfolio/media/honda-social.jpg",
    type: "image",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
  {
    tag: "Bastidores",
    titleLine1: "DIREÇÃO",
    titleLine2: "E CAPTAÇÃO",
    desc: "Um olhar de perto sobre o trabalho em set.",
    img: "/portfolio/media/fonseca-trabalho.jpeg",
    type: "image",
    ctaText: "Fale conosco",
    ctaUrl: "#contact",
  },
];

export default function MediaShowcaseCarousel({
  items = portfolioItems,
  sectionLabel = "Por trás do conteúdo",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const touchStartX = useRef(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const total = items.length;

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex && items[index]?.type === "video") {
        video.muted = true;
        video.currentTime = 0;
        video.play().catch(() => undefined);
        return;
      }

      video.pause();
    });
  }, [currentIndex, items]);

  useEffect(() => {
    if (
      !autoplay ||
      shouldReduceMotion ||
      isHovered ||
      isFocused ||
      total <= 1 ||
      items[currentIndex]?.type === "video"
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % total);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [
    autoplay,
    autoplayDelay,
    currentIndex,
    isFocused,
    isHovered,
    items,
    shouldReduceMotion,
    total,
  ]);

  if (total === 0) return null;

  const nextSlide = () => setCurrentIndex((index) => (index + 1) % total);
  const prevSlide = () =>
    setCurrentIndex((index) => (index - 1 + total) % total);
  const goToSlide = (index: number) => setCurrentIndex(index % total);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevSlide();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const difference =
      (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(difference) > 45) {
      if (difference < 0) nextSlide();
      else prevSlide();
    }
  }

  return (
    <section
      id="captacoes"
      aria-label="Portfólio de clientes e bastidores"
      className={`relative overflow-hidden bg-[#0b1220] py-14 sm:py-20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <MotionReveal className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              {sectionLabel}
            </p>
            <h2 className="social-display mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
              Imagem, estratégia{" "}
              <span className="text-primary">e movimento.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/65">
              Clientes e bastidores, da captação ao conteúdo final.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Mídia anterior"
              className="brand-button grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-primary hover:bg-primary/10"
            >
              <FiChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Próxima mídia"
              className="brand-button grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-primary hover:bg-primary/10"
            >
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </MotionReveal>

        <div
          className="relative mx-auto flex w-full items-center justify-center overflow-hidden"
          style={{ height: "clamp(390px, 44vw, 500px)", perspective: "1400px" }}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Mídias de clientes e bastidores"
          tabIndex={0}
        >
          {items.map((item, index) => {
            const offset = (index - currentIndex + total) % total;
            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isVisible = isCenter || isRight || offset === total - 1;
            const transform = isCenter
              ? "translateX(0) scale(1) rotateY(0deg)"
              : isRight
                ? "translateX(clamp(190px, 24vw, 300px)) scale(.82) rotateY(-22deg)"
                : "translateX(clamp(-300px, -24vw, -190px)) scale(.82) rotateY(22deg)";

            return (
              <article
                key={item.img}
                role={isCenter ? undefined : "button"}
                tabIndex={isCenter ? undefined : 0}
                aria-label={
                  isCenter
                    ? undefined
                    : `Exibir ${item.tag}: ${item.titleLine1}`
                }
                onClick={() => !isCenter && goToSlide(index)}
                onKeyDown={(event) => {
                  if (
                    !isCenter &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    goToSlide(index);
                  }
                }}
                className="absolute overflow-hidden rounded-2xl border border-white/15 bg-[#07101d] shadow-2xl"
                style={{
                  width: "clamp(220px, 27vw, 330px)",
                  height: "min(460px, calc(100% - 24px))",
                  transform,
                  opacity: isVisible ? (isCenter ? 1 : 0.46) : 0,
                  zIndex: isCenter ? 30 : isVisible ? 10 : 0,
                  filter: isCenter ? "none" : "brightness(.68)",
                  transition: shouldReduceMotion
                    ? "none"
                    : "transform 850ms cubic-bezier(.2,.8,.2,1), opacity 500ms ease, filter 500ms ease",
                  pointerEvents: isVisible ? "auto" : "none",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {item.type === "video" ? (
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    src={item.img}
                    controls={false}
                    autoPlay={isCenter}
                    muted
                    loop={isCenter}
                    playsInline
                    preload={isCenter ? "auto" : "none"}
                    aria-label={item.titleLine1}
                    onCanPlay={(event) => {
                      if (isCenter) {
                        event.currentTarget.play().catch(() => undefined);
                      }
                    }}
                    className="absolute inset-0 h-full w-full bg-black object-contain"
                  />
                ) : (
                  <img
                    src={item.img}
                    alt={isCenter ? item.desc : ""}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full bg-black/30 object-contain"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#07101d]/85 via-[#07101d]/5 to-transparent" />

                {isCenter && (
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-4 pb-4 text-center sm:px-6 sm:pb-5">
                    <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">
                      {item.titleLine1}
                      {item.titleLine2 && (
                        <span className="block text-base text-white/85">
                          {item.titleLine2}
                        </span>
                      )}
                    </h3>
                    <a
                      href={item.ctaUrl || "#contact"}
                      aria-label={`${item.ctaText || "Fale conosco"}: ${item.titleLine1}`}
                      onClick={(event) => {
                        if (onCtaClick) {
                          event.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      className="brand-button mt-3 grid size-9 place-items-center rounded-full bg-primary text-white transition hover:bg-primary/85"
                    >
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div
          className="mt-4 flex justify-center gap-2"
          role="group"
          aria-label="Selecionar mídia"
        >
          {items.map((item, index) => (
            <button
              key={item.img}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Exibir ${item.tag}`}
              aria-current={index === currentIndex ? "true" : undefined}
              className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/35 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
