import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../src/context/AuthContext";

export default function LogoutModal({ show, onClose }) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  // Si no se muestra, no renderizamos nada
if (!show) {
  return (
    <div style={{ display: "none" }} />
  );
}

  const handleLogout = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      logout();

      // reset login modal a step login
      window.dispatchEvent(new CustomEvent("authStep", { detail: "login" }));

      setLoading(false);
      onClose();

      // opcional: abrir login
      // const modal = document.getElementById("signupModal");
      // if (modal) bootstrap.Modal.getOrCreateInstance(modal).show();
    }, 800);
  };

  // Evitar scroll al abrir
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleBackdropClick = useCallback((e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      if (!loading) onClose();
    }
  }, [loading, onClose]);

  // Escape para cerrar
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, onClose]);

  return (
    <div
      className="modal-backdrop fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,0.55)"
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="modal show d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logoutModalTitle"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">

            {/* Close */}
            {/* <button
              type="button"
              className="btn-close position-absolute"
              style={{ top: "0.75rem", right: "0.75rem" }}
              onClick={onClose}
              disabled={loading}
            /> */}

            <div className="modal-body text-center p-5">
              <h2 id="logoutModalTitle" className="mb-3">
                Cerrar sesión
              </h2>

              <p className="mb-4">
                ¿Confirmás que deseas cerrar tu sesión?
              </p>

              <div className="d-grid gap-3">

                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                  ) : (
                    "Cerrar sesión"
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-white border btn-lg"
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
    </div>
  );
}
