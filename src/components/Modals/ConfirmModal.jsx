import { useEffect, useCallback, useState } from "react";
import ButtonSpinner from "@/components/ButtonSpinner";

export default function ConfirmModal({
  show,
  title,
  message,
  confirmLabel = "Eliminar",
  confirmLoadingLabel = "Eliminando...",
  cancelLabel = "Cancelar",
  onConfirm,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target.classList.contains("modal-backdrop") && !loading) onClose();
    },
    [loading, onClose]
  );

  useEffect(() => {
    if (!show) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, loading, onClose]);

  if (!show) return null;

  const handleConfirm = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      onConfirm();
      setLoading(false);
    }, 500);
  };

  return (
    <div
      className="modal-backdrop fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.55)" }}
      onClick={handleBackdropClick}
    >
      <div className="modal show d-block" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <div
              className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{ width: 48, height: 48 }}
            >
              <i className="bi bi-trash font-18"></i>
            </div>

            <h5 className="font-bold mb-2">{title}</h5>
            <p className="text-muted mb-4">{message}</p>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary w-50"
                onClick={onClose}
                disabled={loading}
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                className="btn btn-danger w-50"
                onClick={handleConfirm}
                disabled={loading}
              >
                <ButtonSpinner loading={loading} loadingText={confirmLoadingLabel}>
                  {confirmLabel}
                </ButtonSpinner>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
