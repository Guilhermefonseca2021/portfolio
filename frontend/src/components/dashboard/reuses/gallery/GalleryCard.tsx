import { FaComment, FaEye, FaHeart, FaShare } from "react-icons/fa";

interface GalleryCardProps {
  image: string;
  shares: number;
  views: number;
  comments: number;
  likes: number;
}

export default function GalleryCard({
  image,
  shares,
  views,
  comments,
  likes,
}: GalleryCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-secondary bg-card shadow-lg transition duration-300 hover:-translate-y-1 hover:border-primary/40">
      <img src={image} alt="" className="h-56 w-full object-cover" />

      <div className="flex items-center justify-between p-4 text-secondaryText/70">
        <button className="flex items-center gap-2 transition hover:text-primary">
          <FaShare />
          <span>{shares}</span>
        </button>

        <button className="flex items-center gap-2 transition hover:text-primary">
          <FaEye />
          <span>{views}</span>
        </button>

        <button className="flex items-center gap-2 transition hover:text-primary">
          <FaComment />
          <span>{comments}</span>
        </button>

        <button className="flex items-center gap-2 transition hover:text-red-400">
          <FaHeart />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}
