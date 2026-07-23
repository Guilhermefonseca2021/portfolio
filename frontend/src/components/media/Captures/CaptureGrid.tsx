import CaptureCard from "./CaptureCard";
import captures from "./capturesItems";

export default function CaptureGrid() {
  return (
    <div
      className="
    mx-auto
    grid
    w-full
    max-w-3xl
    grid-cols-4
    gap-2
    px-3
  "
    >
      {captures.map((capture) => (
        <CaptureCard key={capture.id} image={capture.image} />
      ))}
    </div>
  );
}
