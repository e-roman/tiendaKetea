// src/components/LogoutModal.jsx
export default function ListPrices({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Lista de Precios</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>Lista de Precios</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={() => window.location.href = "/logout"}>
              Cerrar sesión
            </button>
          </div>

        </div>
      </div>

      {/* Fondo oscuro */}
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}
