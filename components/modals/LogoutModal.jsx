// src/components/Modals/LogoutModal.jsx
import { useAuth } from "../../src/context/AuthContext";

export default function LogoutModal({ show, onClose }) {
  const { logout } = useAuth();

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Close */}
          <div className="modal-close position-absolute end-0 mt-2 me-2">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body text-center">

            <h2 className="mb-3">Cerrar sesión</h2>
            <p className="mb-4">Confirmas que deseas cerrar tu sesión.</p>

            <div className="d-grid gap-2 pt-4">
              <button
                type="button"
                className="btn btn-white btn-lg"
                onClick={onClose}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn btn-primary form-control-lg mt-2"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                Cerrar sesión
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
