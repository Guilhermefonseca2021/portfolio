import { useEffect, useRef, useState } from "react";
import { FiPlus, FiCopy, FiTrash2, FiLink, FiUpload, FiFolderPlus, FiShoppingCart, FiEye, FiEyeOff, FiCreditCard } from "react-icons/fi";
import Modal from "../../components/dashboard/reuses/modal/Modal";
import fonsecaApi from "../../services/fonsecaApi";
import { notifyToast } from "../../components/ui/GlobalToast";
import type { ImageItem, ImageFolder, FolderImage, Plan, StorageInfo } from "../../types/api";

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
  const [folders, setFolders] = useState<ImageFolder[]>([]);
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [imageForm, setImageForm] = useState({ name: "", price: "0", url: "" });
  const [folderForm, setFolderForm] = useState({ name: "", description: "", price: "0" });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [editingFolder, setEditingFolder] = useState<ImageFolder | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<ImageFolder | null>(null);
  const [folderImages, setFolderImages] = useState<FolderImage[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
      const [imageData, storageData, foldersData, plansData] = await Promise.all([
        fonsecaApi.images.list(),
        fonsecaApi.images.storage(),
        fonsecaApi.imageFolders.list(),
        fonsecaApi.plans.list(),
      ]);
      setImages(imageData);
      setStorage(storageData);
      setFolders(foldersData);
      setPlans(plansData);
    } catch (err) {
      setError(fonsecaApi.utils.getErrorMessage(err, "Erro ao carregar imagens."));
    } finally {
      setLoading(false);
    }
  }

  function openCreateImageModal() {
    setImageForm({ name: "", price: "0", url: "" });
    setSelectedFiles([]);
    setPreviewUrls((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setFormError(null);
    setOpenImageModal(true);
  }

  function openCreateFolderModal() {
    setEditingFolder(null);
    setFolderForm({ name: "", description: "", price: "0" });
    setFormError(null);
    setOpenFolderModal(true);
  }

  function openEditFolderModal(folder: ImageFolder) {
    setEditingFolder(folder);
    setFolderForm({
      name: folder.name,
      description: folder.description ?? "",
      price: String(folder.price),
    });
    setFormError(null);
    setOpenFolderModal(true);
  }

  async function openFolderImages(folder: ImageFolder) {
    setSelectedFolder(folder);
    const data = await fonsecaApi.imageFolders.get(folder.id);
    const fi = data.images || [];
    setFolderImages(fi);
    setSelectedIds(new Set(fi.map((i) => i.imageId)));
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

  async function handleDeleteImage(image: ImageItem) {
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

  async function handleImageSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imageForm.name.trim()) {
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
            name: imageForm.name.trim(),
            price: Number(imageForm.price) || 0,
            file,
          });
        }
        setUploading(false);
        notifyToast("Imagens enviadas com sucesso.", "success");
      } else {
        if (!imageForm.url.trim()) {
          setFormError("Selecione uma imagem ou informe uma URL.");
          return;
        }
        await fonsecaApi.images.create({
          name: imageForm.name.trim(),
          price: Number(imageForm.price) || 0,
          url: imageForm.url.trim(),
        });
        notifyToast("Imagem cadastrada com sucesso.", "success");
      }

      setOpenImageModal(false);
      setImageForm({ name: "", price: "0", url: "" });
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

  async function handleFolderSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!folderForm.name.trim()) {
      setFormError("Nome da pasta é obrigatório.");
      return;
    }

    try {
      setSaving(true);
      setFormError(null);

      if (editingFolder) {
        await fonsecaApi.imageFolders.update(editingFolder.id, {
          name: folderForm.name.trim(),
          description: folderForm.description.trim() || undefined,
          price: Number(folderForm.price) || 0,
        });
        notifyToast("Pasta atualizada.", "success");
      } else {
        await fonsecaApi.imageFolders.create({
          name: folderForm.name.trim(),
          description: folderForm.description.trim() || undefined,
          price: Number(folderForm.price) || 0,
        });
        notifyToast("Pasta criada.", "success");
      }

      setOpenFolderModal(false);
      setFolderForm({ name: "", description: "", price: "0" });
      setEditingFolder(null);
      await loadData();
    } catch {
      setFormError("Erro ao salvar pasta.");
      notifyToast("Erro ao salvar pasta.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemoveImageFromFolder(imageId: string) {
    if (!selectedFolder) return;
    try {
      await fonsecaApi.imageFolders.removeImage(selectedFolder.id, imageId);
      notifyToast("Imagem removida da pasta.", "success");
      openFolderImages(selectedFolder);
    } catch {
      notifyToast("Erro ao remover imagem da pasta.", "error");
    }
  }

  function handleToggleImage(imageId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(imageId)) {
        next.delete(imageId);
      } else {
        next.add(imageId);
      }
      return next;
    });
  }

  async function handleSaveFolderImages() {
    if (!selectedFolder) return;
    try {
      const currentIds = new Set(folderImages.map((fi) => fi.imageId));
      const toAdd = Array.from(selectedIds).filter((id) => !currentIds.has(id));
      const toRemove = Array.from(currentIds).filter((id) => !selectedIds.has(id));

      for (const id of toAdd) {
        await fonsecaApi.imageFolders.addImage(selectedFolder.id, id);
      }
      for (const id of toRemove) {
        await fonsecaApi.imageFolders.removeImage(selectedFolder.id, id);
      }

      if (toAdd.length > 0) {
        notifyToast(`${toAdd.length} imagem(s) adicionada(s) à pasta.`, "success");
      }
      if (toRemove.length > 0) {
        notifyToast(`${toRemove.length} imagem(s) removida(s) da pasta.`, "success");
      }

      if (toAdd.length === 0 && toRemove.length === 0) {
        notifyToast("Nenhuma alteração.", "success");
      }

      openFolderImages(selectedFolder);
    } catch {
      notifyToast("Erro ao atualizar imagens da pasta.", "error");
    }
  }

  async function handleDeleteFolder(id: string) {
    if (!window.confirm("Excluir esta pasta?")) return;
    try {
      await fonsecaApi.imageFolders.remove(id);
      notifyToast("Pasta excluída.", "success");
      await loadData();
    } catch {
      notifyToast("Erro ao excluir pasta.", "error");
    }
  }

  async function handleBuyFolder(folder: ImageFolder) {
    try {
      const result = await fonsecaApi.stripe.checkoutFolder(folder.id);
      if (result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch {
      notifyToast("Erro ao iniciar compra da pasta.", "error");
    }
  }

  async function handleBuyImage(image: ImageItem) {
    try {
      const result = await fonsecaApi.stripe.checkoutImage(image.id);
      if (result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch {
      notifyToast("Erro ao iniciar compra da imagem.", "error");
    }
  }

  async function handleToggleActive(image: ImageItem) {
    try {
      const newActive = !image.isActive;
      await fonsecaApi.images.toggleActive(image.id, newActive);
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, isActive: newActive } : img,
        ),
      );
      notifyToast(
        newActive ? "Imagem publicada." : "Imagem despublicada.",
        "success",
      );
    } catch {
      notifyToast("Erro ao atualizar status da imagem.", "error");
    }
  }

  async function handleChangePlan(planKey: string) {
    try {
      const result = await fonsecaApi.plans.checkout(planKey);
      if (result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch {
      notifyToast("Erro ao iniciar assinatura do plano.", "error");
    }
  }

  const storagePercentage = storage?.percentageUsed ?? 0;
  const storageBarColor = getStorageBarColor(storagePercentage);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Imagens e Pastas</h1>
          <p className="mt-2 text-secondaryText/60">Gerencie suas imagens, pastas e vendas.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openCreateFolderModal}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primaryText transition hover:opacity-90"
          >
            <FiFolderPlus size={18} />
            Nova Pasta
          </button>
          <button
            onClick={openCreateImageModal}
            className="flex items-center gap-2 rounded-xl border border-secondary px-5 py-3 font-semibold text-secondaryText transition hover:border-primary"
          >
            <FiPlus size={18} />
            Nova Imagem
          </button>
        </div>
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-secondaryText">Pastas de Venda</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {folders.map((folder) => (
                <div key={folder.id} className="rounded-2xl border border-secondary bg-card p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-secondaryText">{folder.name}</h3>
                      <p className="text-sm text-secondaryText/60">{folder.description ?? "Sem descrição"}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">R$ {Number(folder.price).toFixed(2)}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => openFolderImages(folder)}
                      className="flex-1 rounded-xl border border-secondary px-3 py-2 text-sm text-secondaryText transition hover:border-primary"
                    >
                      Ver Imagens
                    </button>
                    <button
                      onClick={() => openEditFolderModal(folder)}
                      className="rounded-xl border border-secondary px-3 py-2 text-sm text-secondaryText transition hover:border-primary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleBuyFolder(folder)}
                      className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primaryText transition hover:opacity-90"
                    >
                      <FiShoppingCart size={14} />
                      Comprar
                    </button>
                    <button
                      onClick={() => handleDeleteFolder(folder.id)}
                      className="rounded-xl border border-red-500/30 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {folders.length === 0 && (
                <div className="rounded-2xl border border-dashed border-secondary bg-card p-8 text-center">
                  <p className="text-secondaryText/60">Nenhuma pasta criada. Clique em "Nova Pasta" para começar.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-secondaryText">Todas as Imagens</h2>
            {loading ? (
              <p className="text-secondaryText/70">Carregando...</p>
            ) : error ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
            ) : images.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-secondary bg-card p-12 text-center">
                <p className="text-secondaryText/60">Nenhuma imagem cadastrada.</p>
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
                          onClick={() => handleToggleActive(image)}
                          title={image.isActive ? "Despublicar imagem" : "Publicar imagem"}
                          className={`rounded-lg p-2 text-white backdrop-blur transition ${image.isActive ? "bg-green-500/60 hover:bg-green-500" : "bg-secondary/60 hover:bg-secondary"}`}
                        >
                          {image.isActive ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                        </button>

                        <button
                          onClick={() => handleCopyLink(image)}
                          title="Copiar link de compartilhamento"
                          className="rounded-lg bg-black/60 p-2 text-white backdrop-blur transition hover:bg-primary"
                        >
                          <FiLink size={16} />
                        </button>

                        <button
                          onClick={() => handleDeleteImage(image)}
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

                        {Number(image.price) > 0 ? (
                          <button
                            onClick={() => handleBuyImage(image)}
                            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primaryText transition hover:opacity-90"
                          >
                            <FiShoppingCart size={14} />
                            Comprar
                          </button>
                        ) : (
                          image.fileName && <span className="text-xs text-secondaryText/40">Na VPS</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-secondary bg-card p-6">
            <h2 className="text-xl font-semibold text-secondaryText">Upgrade de Plano</h2>
            <p className="mt-2 text-sm text-secondaryText/60">Plano atual: <strong>{storage?.plan ?? "Base"}</strong></p>
            <div className="mt-4 space-y-3">
              {plans.map((plan) => (
                <div key={plan.key} className="flex items-center justify-between rounded-xl border border-secondary bg-bg p-4">
                  <div>
                    <p className="font-semibold text-secondaryText">{plan.name}</p>
                    <p className="text-lg font-bold text-primary">R$ {plan.price.toFixed(2)}</p>
                    <p className="text-xs text-secondaryText/50">{plan.storageLimitGb} GB de armazenamento</p>
                  </div>
                  <button
                    onClick={() => handleChangePlan(plan.key)}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primaryText transition hover:opacity-90"
                  >
                    <FiCreditCard size={14} />
                    Assinar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal open={openImageModal} title="Nova Imagem" width="md" onClose={() => setOpenImageModal(false)}>
        <form onSubmit={handleImageSubmit} className="space-y-5">
          {formError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{formError}</div>
          )}

          <div>
            <label className={labelClass}>Nome *</label>
            <input
              value={imageForm.name}
              onChange={(e) => setImageForm((prev) => ({ ...prev, name: e.target.value }))}
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
              value={imageForm.price}
              onChange={(e) => setImageForm((prev) => ({ ...prev, price: e.target.value }))}
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
                  value={imageForm.url}
                  onChange={(e) => setImageForm((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className={inputClass}
                />
              </div>

              {imageForm.url && previewUrls.length === 0 && (
                <div className="rounded-xl border border-secondary bg-bg p-3">
                  <SafeImage src={imageForm.url} alt="Preview" className="h-40 w-full rounded-lg object-cover" />
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-3 border-t border-secondary pt-5">
            <button
              type="button"
              onClick={() => setOpenImageModal(false)}
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

      <Modal open={openFolderModal} title={editingFolder ? "Editar Pasta" : "Nova Pasta"} width="md" onClose={() => setOpenFolderModal(false)}>
        <form onSubmit={handleFolderSubmit} className="space-y-5">
          {formError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{formError}</div>
          )}

          <div>
            <label className={labelClass}>Nome *</label>
            <input
              value={folderForm.name}
              onChange={(e) => setFolderForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Pack Praia"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Descrição</label>
            <textarea
              value={folderForm.description}
              onChange={(e) => setFolderForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição da pasta"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Preço (R$)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={folderForm.price}
              onChange={(e) => setFolderForm((prev) => ({ ...prev, price: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-secondary pt-5">
            <button
              type="button"
              onClick={() => setOpenFolderModal(false)}
              className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!selectedFolder} title={selectedFolder?.name} width="lg" onClose={() => setSelectedFolder(null)}>
        <div className="space-y-4">
          <p className="text-secondaryText/60">{selectedFolder?.description}</p>
          <p className="text-lg font-bold text-primary">R$ {Number(selectedFolder?.price).toFixed(2)}</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {folderImages.map((fi) => (
              <div key={fi.id} className="relative rounded-xl border border-secondary bg-bg">
                <SafeImage src={resolveImageUrl(fi.image!)} alt={fi.image?.name} className="h-32 w-full rounded-lg object-cover" />
                <button
                  onClick={() => handleRemoveImageFromFolder(fi.imageId)}
                  className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white backdrop-blur transition hover:bg-red-500"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-secondary pt-4">
            <p className="mb-2 text-sm font-medium text-secondaryText">
              Selecione imagens da biblioteca para a pasta:
            </p>
            <div className="mb-3 flex items-center justify-between rounded-xl border border-secondary bg-bg px-3 py-2">
              <span className="text-sm text-secondaryText">
                {selectedIds.size} de {images.length} selecionadas
              </span>
              <button
                onClick={() => {
                  if (selectedIds.size === images.length) {
                    setSelectedIds(new Set());
                  } else {
                    setSelectedIds(new Set(images.map((img) => img.id)));
                  }
                }}
                className="text-xs font-semibold text-primary underline"
              >
                {selectedIds.size === images.length ? "Desmarcar todas" : "Marcar todas"}
              </button>
            </div>
            <div className="grid max-h-80 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
              {images.map((img) => {
                const inFolder = folderImages.some((fi) => fi.imageId === img.id);
                const isSelected = selectedIds.has(img.id);
                return (
                  <label
                    key={img.id}
                    className={`relative flex cursor-pointer flex-col items-center justify-end rounded-xl border-2 transition-all ${isSelected ? "border-primary bg-primary/10" : "border-secondary"} ${inFolder ? "opacity-60 grayscale" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleImage(img.id)}
                      disabled={inFolder}
                      className="absolute left-2 top-2 h-4 w-4 cursor-pointer accent-primary"
                    />
                    {inFolder && (
                      <span
                        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-400/50"
                        title="Já na pasta"
                      >
                        NA PASTA
                      </span>
                    )}
                    <SafeImage src={resolveImageUrl(img)} alt={img.name} className="h-24 w-full rounded-lg object-cover" />
                    <p className="mt-1 truncate px-1 text-center text-xs text-secondaryText">{img.name}</p>
                  </label>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end gap-3 border-t border-secondary pt-4">
              <button
                onClick={() => setSelectedFolder(null)}
                className="rounded-xl border border-secondary px-5 py-2 text-secondaryText transition hover:bg-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveFolderImages}
                className="rounded-xl bg-primary px-6 py-2 font-semibold text-primaryText transition hover:opacity-90"
              >
                Salvar seleção
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
