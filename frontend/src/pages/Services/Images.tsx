import { useEffect, useRef, useState } from "react";
import { FiPlus, FiCopy, FiTrash2, FiLink, FiUpload } from "react-icons/fi";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";

const inputClass =
  "w-full rounded-xl border border-secondary bg-bg px-4 py-2.5 text-secondaryText outline-none transition focus:border-primary";

const labelClass = "mb-1 block text-sm font-medium text-secondaryText";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:3333").replace(/\/$/, "");

function resolveImageUrl(image: ImageItem): string {
  const raw = image.url?.trim();
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${API_BASE_URL}${path}`;
}

function SafeImage({ src, alt, className }: { src: string; alt?: string; className?: string }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`flex items-center justify-center bg-secondary/40 text-secondaryText/60 ${className ?? ""}`}>
        <span>Imagem indisponível</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? "Imagem"}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function getStorageBarColor(percentage: number): string {
  if (percentage >= 100) return "bg-red-500";
  if (percentage >= 90) return "bg-red-400";
  if (percentage >= 70) return "bg-yellow-400";
  return "bg-primary";
}

export default function Images() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "0",
    url: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const [imageData, storageData] = await Promise.all([
        fonsecaApi.images.list(),
        fonsecaApi.images.storage(),
      ]);
      setImages(imageData);
      setStorage(storageData);
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar imagens."));
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setForm({ name: "", price: "0", url: "" });
    setSelectedFiles([]);
    setPreviewUrls((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setFormError(null);
    setOpenModal(true);
  }

  function updateForm(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileSelect(files: FileList | null) {
    if (!files || files.length === 0) {
      setSelectedFiles([]);
      setPreviewUrls((prev) => {
        prev.forEach((url) => URL.revokeObjectURL(url));
        return [];
      });
      setFormError(null);
      return;
    }

    const validFiles: File[] = [];
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ALLOWED_TYPES.includes(file.type)) {
        setFormError("Formato não permitido. Use JPG, PNG ou WEBP.");
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFormError(`Arquivo muito grande: ${file.name}. O limite é de 20 MB.`);
        continue;
      }

      validFiles.push(file);
      urls.push(URL.createObjectURL(file));
    }

    setSelectedFiles(validFiles);
    setPreviewUrls(urls);
    setFormError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      setFormError("Nome da imagem é obrigatório.");
      return;
    }

    try {
      setSaving(true);
      setFormError(null);

      if (selectedFiles.length > 0) {
        setUploading(true);
        for (const file of selectedFiles) {
          await fonsecaApi.images.upload({
            name: form.name.trim(),
            price: Number(form.price) || 0,
            file,
          });
        }
        setUploading(false);
        notifyToast("Imagens enviadas com sucesso.", "success");
      } else {
        if (!form.url.trim()) {
          setFormError("Selecione uma imagem ou informe uma URL.");
          return;
        }
        await fonsecaApi.images.create({
          name: form.name.trim(),
          price: Number(form.price) || 0,
          url: form.url.trim(),
        });
        notifyToast("Imagem cadastrada com sucesso.", "success");
      }

      setOpenModal(false);
      setForm({ name: "", price: "0", url: "" });
      setSelectedFiles([]);
      setPreviewUrls((prev) => {
        prev.forEach((url) => URL.revokeObjectURL(url));
        return [];
      });
      await loadData();
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(err, "Erro ao salvar imagem.");
      setFormError(message);
      notifyToast(message, "error");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  async function handleDelete(image: ImageItem) {
    if (!window.confirm(`Tem certeza que deseja excluir "${image.name}"?`)) return;

    try {
      await fonsecaApi.images.remove(image.id);
      notifyToast("Imagem excluída com sucesso.", "success");
      setImages((prev) => prev.filter((i) => i.id !== image.id));
      await loadData();
    } catch (err) {
      const message = fonsecaApi.utils.getErrorMessage(err, "Erro ao excluir imagem.");
      notifyToast(message, "error");
    }
  }

  function handleCopyLink(image: ImageItem) {
    const link = `${window.location.origin}/s/${image.id}`;
    navigator.clipboard.writeText(link);
    notifyToast("Link copiado para a área de transferência.", "success");
  }

  const storagePercentage = storage?.percentageUsed ?? 0;
  const storageBarColor = getStorageBarColor(storagePercentage);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Imagens</h1>
          <p className="mt-2 text-secondaryText/60">Gerencie suas imagens para venda e compartilhamento.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primaryText transition hover:opacity-90"
        >
          <FiPlus size={18} />
          Nova Imagem
        </button>
      </div>

      {storage && (
        <div className="rounded-2xl border border-secondary bg-card p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-secondaryText">Armazenamento</h2>
              <p className="mt-1 text-sm text-secondaryText/60">
                Plano {storage.plan} · {formatBytes(storage.storageUsed)} usados de {formatBytes(storage.storageLimit)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{storagePercentage}%</p>
              <p className="text-sm text-secondaryText/60">{formatBytes(storage.storageAvailable)} livres</p>
            </div>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-500 ${storageBarColor}`}
              style={{ width: `${Math.min(storagePercentage, 100)}%` }}
            />
          </div>

          {storagePercentage >= 100 && (
            <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              Seu armazenamento está cheio. Não é possível enviar novas imagens.
            </p>
          )}

          {storagePercentage >= 90 && storagePercentage < 100 && (
            <p className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-300">
              Seu armazenamento está quase cheio. Considere fazer upgrade do plano.
            </p>
          )}
        </div>
      )}

      {loading ? (
        <p className="text-secondaryText/70">Carregando imagens...</p>
      ) : error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-secondary bg-card p-12 text-center">
          <p className="text-secondaryText/60">Nenhuma imagem cadastrada. Clique em "Nova Imagem" para começar.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group overflow-hidden rounded-2xl border border-secondary bg-card transition hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden bg-bg">
                <SafeImage
                  src={resolveImageUrl(image)}
                  alt={image.name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />

                <div className="absolute right-3 top-3 flex gap-2">
                  <button
                    onClick={() => handleCopyLink(image)}
                    title="Copiar link de compartilhamento"
                    className="rounded-lg bg-black/60 p-2 text-white backdrop-blur transition hover:bg-primary"
                  >
                    <FiLink size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(image)}
                    title="Excluir imagem"
                    className="rounded-lg bg-black/60 p-2 text-white backdrop-blur transition hover:bg-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-secondaryText">{image.name}</h3>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">R$ {Number(image.price).toFixed(2)}</span>

                  {image.fileSize && (
                    <span className="text-xs text-secondaryText/60">{formatBytes(Number(image.fileSize))}</span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyLink(image)}
                    className="flex items-center gap-1.5 rounded-lg border border-secondary px-3 py-1.5 text-xs text-secondaryText transition hover:border-primary hover:text-primary"
                  >
                    <FiCopy size={14} />
                    Copiar link
                  </button>

                  {image.fileName && <span className="text-xs text-secondaryText/40">Na VPS</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={openModal} title="Nova Imagem" width="md" onClose={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {formError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{formError}</div>
          )}

          <div>
            <label className={labelClass}>Nome *</label>
            <input
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              placeholder="Ex: Pôr do sol na praia"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Preço (R$)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => updateForm("price", e.target.value)}
              placeholder="0.00"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Arquivo (JPG, PNG, WEBP - máx 20 MB)</label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-secondary bg-bg p-6 transition hover:border-primary">
              <FiUpload size={24} className="text-primary" />
              <span className="text-sm text-secondaryText/70">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} arquivo(s) selecionado(s)`
                  : "Clique para selecionar imagens"}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </label>
          </div>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="rounded-xl border border-secondary bg-bg p-2">
                  <SafeImage src={url} alt={`Preview ${index + 1}`} className="h-24 w-full rounded-lg object-cover" />
                </div>
              ))}
            </div>
          )}

          {selectedFiles.length === 0 && (
            <>
              <div>
                <label className={labelClass}>Ou URL externa</label>
                <input
                  value={form.url}
                  onChange={(e) => updateForm("url", e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className={inputClass}
                />
              </div>

              {form.url && previewUrls.length === 0 && (
                <div className="rounded-xl border border-secondary bg-bg p-3">
                  <SafeImage src={form.url} alt="Preview" className="h-40 w-full rounded-lg object-cover" />
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-3 border-t border-secondary pt-5">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
            >
              {uploading ? "Enviando..." : saving ? "Salvando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
