import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

interface Props {
  page: number;
  totalPages: number;

  onPrevious?: () => void;
  onNext?: () => void;
}

export default function TablePagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="flex items-center justify-between border-t border-secondary p-5">
      <span className="text-sm text-secondaryText/70">
        Página {page} de {totalPages}
      </span>

      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={page === 1}
          className="flex items-center gap-2 rounded-xl border border-secondary bg-card px-4 py-2 text-secondaryText transition hover:bg-secondary disabled:opacity-40"
        >
          <FaChevronCircleLeft className="h-4 w-4" />
          Anterior
        </button>

        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="flex items-center gap-2 rounded-xl border border-secondary bg-card px-4 py-2 text-secondaryText transition hover:bg-secondary disabled:opacity-40"
        >
          Próxima
          <FaChevronCircleRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
