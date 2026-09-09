import { useEffect, useState } from "react";
import { HiOutlineXMark, HiCheckCircle, HiExclamationCircle, HiInformationCircle } from "react-icons/hi2";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

let toasts: ToastItem[] = [];
const listeners: Array<(toasts: ToastItem[]) => void> = [];

function notify(listeners: Array<(toasts: ToastItem[]) => void>) {
  listeners.forEach((listener) => listener([...toasts]));
}

export function toast(message: string, type: ToastType = "info") {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, type, message }];
  notify(listeners);

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify(listeners);
  }, 4000);
}

export function useToast() {
  const [currentToasts, setCurrentToasts] = useState<ToastItem[]>(toasts);

  useEffect(() => {
    listeners.push(setCurrentToasts);
    return () => {
      const index = listeners.indexOf(setCurrentToasts);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return { toasts: currentToasts, toast };
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <HiCheckCircle className="text-green-400" size={20} />,
  error: <HiExclamationCircle className="text-red-400" size={20} />,
  warning: <HiExclamationCircle className="text-yellow-400" size={20} />,
  info: <HiInformationCircle className="text-blue-400" size={20} />,
};

const bgColors: Record<ToastType, string> = {
  success: "bg-green-500/10 border-green-500/30",
  error: "bg-red-500/10 border-red-500/30",
  warning: "bg-yellow-500/10 border-yellow-500/30",
  info: "bg-blue-500/10 border-blue-500/30",
};

const textColors: Record<ToastType, string> = {
  success: "text-green-300",
  error: "text-red-300",
  warning: "text-yellow-300",
  info: "text-blue-300",
};

export function ToastContainer() {
  const { toasts: currentToasts } = useToast();

  if (currentToasts.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-4 z-[9999] flex flex-col gap-2" aria-live="polite">
      {currentToasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur max-w-sm animate-in slide-in-from-right duration-300 ${bgColors[t.type]}`}
        >
          {icons[t.type]}
          <p className={`flex-1 text-sm font-medium ${textColors[t.type]}`}>{t.message}</p>
          <button
            onClick={() => {
              toasts = toasts.filter((x) => x.id !== t.id);
              notify(listeners);
            }}
            className="p-1 text-secondaryText/50 hover:text-secondaryText transition"
            aria-label="Fechar"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}