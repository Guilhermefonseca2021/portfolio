import { useEffect, useState } from "react";

const media = [
  { type: "image", src: "/portfolio/media/fonseca-camera.jpeg", label: "Produção audiovisual" },
  { type: "image", src: "/portfolio/media/fonseca-trabalho.jpeg", label: "Estratégia em ação" },
  { type: "video", src: "/portfolio/media/fonseca-video.mp4", label: "Conteúdo em movimento" },
  { type: "image", src: "/portfolio/media/fonseca-sorriso.jpeg", label: "Presença que conecta" },
] as const;

export default function MediaShowcaseCarousel() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((value) => (value + 1) % media.length);
  const prev = () => setCurrent((value) => (value - 1 + media.length) % media.length);

  useEffect(() => {
    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const item = media[current];

  return (
    <section aria-label="Conteúdos em destaque" className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Por trás do conteúdo</p>
          <h2 className="social-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">Imagem, estratégia e movimento.</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={prev} aria-label="Mídia anterior" className="brand-button rounded-[18px] border border-white/15 px-4 py-2 text-xl hover:border-primary">‹</button>
          <button type="button" onClick={next} aria-label="Próxima mídia" className="brand-button rounded-[18px] border border-white/15 px-4 py-2 text-xl hover:border-primary">›</button>
        </div>
      </div>
      <div className="spotlight-card relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-[#111d31]">
        {item.type === "video" ? <video src={item.src} autoPlay muted loop playsInline className="h-full w-full object-cover" aria-label={item.label} /> : <img src={item.src} alt={item.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/90 via-transparent to-transparent" />
        <p className="absolute bottom-6 left-6 text-lg font-bold text-white sm:text-2xl">{item.label}</p>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {media.map((entry, index) => <button key={entry.src} type="button" onClick={() => setCurrent(index)} aria-label={`Exibir ${entry.label}`} className={`h-2 rounded-full transition-all ${current === index ? "w-10 bg-primary" : "w-2 bg-white/35"}`} />)}
      </div>
    </section>
  );
}
