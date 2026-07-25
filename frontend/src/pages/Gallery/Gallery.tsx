import GalleryGrid from "../../components/dashboard/reuses/gallery/GalleryGrid";

export default function Gallery() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Galeria</h1>

        <p className="mt-2 text-secondaryText/60">
          Visualize seus conteúdos publicados.
        </p>
      </div>

      <GalleryGrid />
    </div>
  );
}
