import { useEffect, useRef, useState } from "react";
import clients from "./clientsItems";

const infiniteClients = [...clients, ...clients];

export default function ClientsRow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const cycleWidthRef = useRef(0);
  const pointerStartXRef = useRef(0);
  const pointerStartOffsetRef = useRef(0);
  const draggingRef = useRef(false);
  const lastFrameRef = useRef(0);
  const activePointerIdRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function normalizeOffset(offset: number) {
    const cycleWidth = cycleWidthRef.current;

    if (!cycleWidth) return offset;

    let normalizedOffset = offset;

    while (normalizedOffset <= -cycleWidth) normalizedOffset += cycleWidth;
    while (normalizedOffset > 0) normalizedOffset -= cycleWidth;

    return normalizedOffset;
  }

  function applyOffset() {
    if (!trackRef.current) return;

    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      cycleWidthRef.current = track.scrollWidth / 2;
      offsetRef.current = normalizeOffset(offsetRef.current);
      applyOffset();
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);

    let animationFrame = 0;

    const animate = (time: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = time;

      const elapsed = Math.min(time - lastFrameRef.current, 50);
      lastFrameRef.current = time;

      if (!draggingRef.current) {
        offsetRef.current = normalizeOffset(
          offsetRef.current - elapsed * 0.035,
        );
        applyOffset();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    activePointerIdRef.current = event.pointerId;
    draggingRef.current = true;
    setIsDragging(true);
    pointerStartXRef.current = event.clientX;
    pointerStartOffsetRef.current = offsetRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (
      !draggingRef.current ||
      activePointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    offsetRef.current = normalizeOffset(
      pointerStartOffsetRef.current + event.clientX - pointerStartXRef.current,
    );
    applyOffset();
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (activePointerIdRef.current !== event.pointerId) return;

    draggingRef.current = false;
    activePointerIdRef.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="relative overflow-hidden py-8 sm:py-10">
      <div
        ref={trackRef}
        className={`clients-scroll flex w-max touch-pan-y select-none items-center gap-4 sm:gap-8 lg:gap-16 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        {infiniteClients.map((client, index) => (
          <img
            key={`${client.id}-${index}`}
            src={client.image}
            alt={client.name}
            className="h-8 w-14 max-w-14 shrink-0 object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:opacity-100 sm:h-12 sm:w-28 sm:max-w-28 lg:h-16 lg:w-40 lg:max-w-40"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
