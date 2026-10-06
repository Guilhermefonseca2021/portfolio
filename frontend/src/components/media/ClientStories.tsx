import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";

const stories = [
  {
    id: "DVEAwXhDTDD",
    type: "p",
    label: "História de cliente",
  },
  {
    id: "DQKO0Y-DUca",
    type: "p",
    label: "História de cliente",
  },
  {
    id: "DO1BXEPDSYo",
    type: "reel",
    label: "Indicação",
  },
  {
    id: "DZbA47Ox2kH",
    type: "reel",
    label: "Resultado",
  },
] as const;

const STORY_DURATION = 5_000;

export default function ClientStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const storyRefs = useRef<Array<HTMLElement | null>>([]);
  const storiesScrollerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const previousIndexRef = useRef(activeIndex);
  const programmaticScrollRef = useRef(false);
  const shouldScrollToIndexRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "-10% 0px -20% 0px" },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (activeIndex === previousIndexRef.current) return;
    previousIndexRef.current = activeIndex;

    if (!shouldScrollToIndexRef.current) return;
    shouldScrollToIndexRef.current = false;

    const scroller = storiesScrollerRef.current;
    const story = storyRefs.current[activeIndex];
    if (!scroller || !story) return;

    const storyLeft =
      scroller.scrollLeft +
      story.getBoundingClientRect().left -
      scroller.getBoundingClientRect().left -
      (scroller.clientWidth - story.clientWidth) / 2;
    programmaticScrollRef.current = true;
    scroller.scrollTo({
      left: storyLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    if (programmaticScrollTimeoutRef.current !== null) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
      programmaticScrollTimeoutRef.current = null;
    }, prefersReducedMotion ? 100 : 700);
  }, [activeIndex, prefersReducedMotion]);

  useEffect(
    () => () => {
      if (programmaticScrollTimeoutRef.current !== null) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (
      prefersReducedMotion ||
      isPaused ||
      !isDocumentVisible ||
      !isInView
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      shouldScrollToIndexRef.current = true;
      setActiveIndex((index) => (index + 1) % stories.length);
    }, STORY_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isDocumentVisible, isInView, isPaused, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Resultados e histórias de clientes"
      className="relative overflow-hidden border-y border-white/10 bg-[#090d19] py-10 sm:py-16"
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-9">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
              Vozes reais
            </p>
            <h2 className="social-display mt-2 text-[1.65rem] font-bold leading-[1.08] tracking-[-0.045em] text-white sm:mt-3 sm:text-4xl">
              O trabalho <span className="text-white/50">fala.</span>
            </h2>
          </div>
          <span className="hidden items-center gap-2 pb-1 text-xs text-white/45 sm:flex">
            <FiInstagram aria-hidden="true" />
            @fonseca.socialmedia
          </span>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-6 bg-gradient-to-r from-[#090d19] to-transparent sm:w-16"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-6 bg-gradient-to-l from-[#090d19] to-transparent sm:w-16"
            aria-hidden="true"
          />
          <div
            ref={storiesScrollerRef}
            onScroll={(event) => {
              if (programmaticScrollRef.current) return;
              const center =
                event.currentTarget.getBoundingClientRect().left +
                event.currentTarget.clientWidth / 2;
              const closestIndex = storyRefs.current.reduce(
                (closest, story, index) => {
                  if (!story) return closest;
                  const storyCenter =
                    story.getBoundingClientRect().left +
                    story.getBoundingClientRect().width / 2;
                  const closestStory = storyRefs.current[closest];
                  if (!closestStory) return index;
                  const closestCenter =
                    closestStory.getBoundingClientRect().left +
                    closestStory.getBoundingClientRect().width / 2;
                  return Math.abs(storyCenter - center) <
                    Math.abs(closestCenter - center)
                    ? index
                    : closest;
                },
                0,
              );
              setActiveIndex((current) =>
                current === closestIndex ? current : closestIndex,
              );
            }}
            onWheel={(event) => {
              const scroller = event.currentTarget;
              const isVerticalScroll = Math.abs(event.deltaY) > Math.abs(event.deltaX);
              const canScrollLeft = scroller.scrollLeft > 0;
              const canScrollRight =
                scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth;

              if (
                isVerticalScroll &&
                ((event.deltaY < 0 && canScrollLeft) ||
                  (event.deltaY > 0 && canScrollRight))
              ) {
                event.preventDefault();
                scroller.scrollLeft += event.deltaY;
              }
            }}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc((100%-min(78vw,330px))/2)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:px-[calc((100%-330px)/2)]"
            role="region"
            aria-label="Stories de resultados de clientes"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              const direction = event.key === "ArrowRight" ? 1 : -1;
              shouldScrollToIndexRef.current = true;
              setActiveIndex(
                (index) => (index + direction + stories.length) % stories.length,
              );
            }}
          >
            {stories.map((story, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={story.id}
                  ref={(element) => {
                    storyRefs.current[index] = element;
                  }}
                  aria-label={`${story.label}, story ${index + 1} de ${stories.length}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`w-[min(78vw,330px)] shrink-0 snap-center transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-65"
                  }`}
                >
                  <div className="rounded-[1.65rem] border border-white/15 bg-[#101522] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.32)] sm:p-2.5">
                    <div className="mb-2 flex gap-1 px-1 pt-1" aria-hidden="true">
                      {stories.map((progressStory, progressIndex) => (
                        <span
                          key={progressStory.id}
                          className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/20"
                        >
                          {progressIndex < activeIndex && (
                            <span className="block h-full w-full bg-white/85" />
                          )}
                          {progressIndex === activeIndex && (
                            <span
                              className="block h-full rounded-full bg-white/90"
                              style={{
                                animationName: prefersReducedMotion
                                  ? "none"
                                  : "story-progress",
                                animationDuration: `${STORY_DURATION}ms`,
                                animationTimingFunction: "linear",
                                animationFillMode: "forwards",
                                animationPlayState:
                                  isPaused || !isDocumentVisible || !isInView
                                    ? "paused"
                                    : "running",
                              }}
                              key={activeIndex}
                            />
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5 px-2 pb-2 pt-1">
                      <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-primary via-violet-500 to-sky-400 p-[1.5px]">
                        <span className="grid size-full place-items-center rounded-full bg-[#101522]">
                          <FiInstagram
                            className="size-4 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">
                          fonseca.socialmedia
                        </p>
                        <p className="text-[10px] text-white/45">
                          {story.label}
                        </p>
                      </div>
                      <span className="text-[10px] tabular-nums text-white/40">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(stories.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="h-[440px] overflow-hidden rounded-[1.1rem] bg-[#111827] sm:h-[460px]">
                      <iframe
                        src={`https://www.instagram.com/${story.type}/${story.id}/embed/?hidecaption=true`}
                        title={`${story.label} no Instagram, ${index + 1} de ${stories.length}`}
                        loading="lazy"
                        tabIndex={-1}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className={`pointer-events-none relative -top-12 h-[600px] w-full border-0 sm:h-[620px] ${
                          isActive ? "opacity-100" : "opacity-85"
                        }`}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
            Role ou deslize para explorar
          </p>
        </div>
      </div>
    </section>
  );
}
