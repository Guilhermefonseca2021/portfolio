import { useCallback, useEffect, useState } from "react";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import fonsecaApi from "../../services/fonsecaApi";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3333"
).replace(/\/$/, "");

function resolveImageUrl(image: ImageItem): string {
  const raw = image.url?.trim();
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${API_BASE_URL}${path}`;
}

function SafeImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-secondary/40 text-secondaryText/60 ${className ?? ""}`}
      >
        <span>Imagem indisponível</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? "Imagem"}
      className={className}
      onError={(event) => {
        console.error("❌ FALHA AO CARREGAR IMAGEM");
        console.error("URL:", src);
        console.error("Elemento:", event.currentTarget);
        setErrored(true);
      }}
    />
  );
}

export default function PublicImage() {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadImage = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fonsecaApi.images.get(id);
      setImage(data);
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Imagem não encontrada."));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadImage();
    }, 0);
    return () => clearTimeout(timer);
  }, [id, loadImage]);

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-secondary bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="flex items-center gap-2 text-secondaryText transition hover:text-primary"
          >
            <FiArrowLeft size={18} />
            <span className="font-semibold">Fonseca</span>
          </a>

          <span className="text-sm text-secondaryText/60">
            Imagens para venda
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {loading ? (
          <p className="text-center text-secondaryText/70">
            Carregando imagem...
          </p>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <p className="text-red-300">{error}</p>
          </div>
        ) : image ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-secondary bg-card">
              <SafeImage
                src={resolveImageUrl(image)}
                alt={image.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-secondaryText">
                  {image.name}
                </h1>
                <p className="mt-2 text-secondaryText/60">
                  Imagem digital de alta qualidade.
                </p>
              </div>

              <div className="rounded-2xl border border-secondary bg-card p-6">
                <p className="text-sm text-secondaryText/60">Preço</p>
                <p className="mt-1 text-4xl font-bold text-primary">
                  R$ {Number(image.price).toFixed(2)}
                </p>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-primaryText transition hover:opacity-90">
                <FiShoppingCart size={20} />
                Comprar Imagem
              </button>

              <p className="text-xs text-secondaryText/50">
                Ao comprar, você receberá acesso imediato ao download da imagem
                em alta resolução.
              </p>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
