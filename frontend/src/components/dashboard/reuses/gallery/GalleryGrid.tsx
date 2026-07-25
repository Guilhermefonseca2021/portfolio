import GalleryCard from "./GalleryCard";
import { galleryData } from "./galleryItems";

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {galleryData.map((item) => (
        <GalleryCard
          key={item.id}
          image={item.image}
          shares={item.shares}
          views={item.views}
          comments={item.comments}
          likes={item.likes}
        />
      ))}
    </div>
  );
}
