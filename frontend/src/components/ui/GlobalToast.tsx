import { useEffect, useState } from "react";

type ToastPayload = {
  type: "success" | "error";
  message: string;
};

let toastTimer: number | undefined;

// eslint-disable-next-line react-refresh/only-export-components
export function notifyToast(
  message: string,
  type: ToastPayload["type"] = "success",
) {
  window.dispatchEvent(
    new CustomEvent<ToastPayload>("app:toast", {
      detail: { message, type },
    }),
  );
}

export default function GlobalToast() {
  const [toast, setToast] = useState<ToastPayload | null>(null);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastPayload>;
      setToast(customEvent.detail);

      if (toastTimer) {
        window.clearTimeout(toastTimer);
      }

      toastTimer = window.setTimeout(() => setToast(null), 3500);
    };

    window.addEventListener("app:toast", handleToast as EventListener);

    return () => {
      window.removeEventListener("app:toast", handleToast as EventListener);
    };
  }, []);

  if (!toast) {
    return null;
  }

  return (
    <div
      role="alert"
      className="fixed right-4 top-4 z-[9999] max-w-sm rounded-2xl border border-white/10 bg-card/95 px-4 py-3 shadow-2xl backdrop-blur"
    >
      <p
        className={`text-sm font-medium ${
          toast.type === "success" ? "text-emerald-300" : "text-red-300"
        }`}
      >
        {toast.message}
      </p>
    </div>
  );
}
