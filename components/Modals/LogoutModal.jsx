// src/components/Modals/LogoutModal.jsx
import { useState } from "react";
import { useAuth } from "../../src/context/AuthContext";

export default function LogoutModal({ show, onClose }) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleLogout = () => {
    if (loading) return;

    setLoading(true);

    // Simulación breve para UX (opcional)
    setTimeout(() => {
      logout();
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">

          {/* Close */}
          <div className="modal-close position-absolute">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            />
          </div>

          <div className="modal-body text-center">

            <h2 className="mb-3">Cerrar sesión</h2>
            <p className="mb-4">
              ¿Confirmás que deseas cerrar tu sesión?
            </p>

            <div className="d-grid gap-2 pt-4">

              <button
                type="button"
                className="btn btn-primary form-control-lg mt-2"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  "Cerrar sesión"
                )}
              </button>

              <button
                type="button"
                className="btn btn-white border-0 btn-lg"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
