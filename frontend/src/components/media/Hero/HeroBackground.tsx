import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.muted = true;
      const playback = video.play();
      playback?.catch(() => undefined);
    };

    playVideo();
    video.addEventListener("canplay", playVideo);
    video.addEventListener("loadeddata", playVideo);
    document.addEventListener("visibilitychange", playVideo);

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("loadeddata", playVideo);
      document.removeEventListener("visibilitychange", playVideo);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,8,20,.94),rgba(3,8,20,.62)_52%,rgba(0,113,227,.28))]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_0%,rgba(255,255,255,.08)_48%,transparent_50%),repeating-linear-gradient(115deg,rgba(255,255,255,.05)_0_1px,transparent_1px_8px)] [background-size:100%_100%,100%_14px] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(59,130,246,.22),transparent_34%)]" />
    </>
  );
}
