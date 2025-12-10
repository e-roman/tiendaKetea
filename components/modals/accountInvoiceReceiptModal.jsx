

import { useEffect } from "react";

export default function accountInvoiceReceiptModal({ onClose }) {
  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // click fuera del modal (simple)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <>
{/* Receipt Invoice Modal */}
    <div
      className="modal-backdrop-custom"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">

      {/* Header */}
      <div className="modal-top-cover bg-primary text-center">
        <figure className="position-absolute end-0 bottom-0 start-0" style={{ marginBottom: "-.125rem" }}>
          <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 100.1">
            <path fill="#fff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
          </svg>
        </figure>

        <div className="modal-close">
           <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
      </div>

      <div className="modal-top-cover-avatar">
        <img
          className="avatar avatar-xl bg-white avatar-circle avatar-centered border border-3 border-white shadow-sm"
          src="../assets/img/favicon/favicon.png"
          alt="Logo"
        />
      </div>

      {/* Body */}
      <div className="modal-body">

        <div className="text-center mb-5">
          <h3 className="mb-1">Ketea S.A:</h3>
          <span className="d-block">Recibo #3682303</span>
        </div>

        <div className="row mb-6">
          <div className="col-md-4 mb-3 mb-md-0">
            <small className="text-secondary mb-2 d-block">Monto pagado:</small>
            <span className="text-dark">$316.8</span>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <small className="text-secondary mb-2 d-block">Fecha de pago:</small>
            <span className="text-dark">Marzo 22, 2022</span>
          </div>

          <div className="col-md-4">
            <small className="text-secondary mb-2 d-block">Método de pago:</small>
            <div className="d-flex align-items-center">
              <img className="max-width-6 me-2" src="../assets/img/cards/img2.jpg" alt="Image Description" />
              <span className="text-dark">•••• 3846</span>
            </div>
          </div>
        </div>

        <small className="text-cap mb-2">Resumen</small>

        <ul className="list-group mb-4">
          <li className="list-group-item text-dark">
            <div className="d-flex justify-content-between align-items-center">
              <span>Pago</span>
              <span>$264.00</span>
            </div>
          </li>

          <li className="list-group-item text-dark">
            <div className="d-flex justify-content-between align-items-center">
              <span>Cargo por servicio / gestión</span>
              <span>$52.8</span>
            </div>
          </li>

          <li className="list-group-item list-group-item-light text-dark">
            <div className="d-flex justify-content-between align-items-center">
              <span className="font-medium">Monto total pagado</span>
              <span className="font-medium">$316.8</span>
            </div>
          </li>
        </ul>

        <div className="d-flex justify-content-end gap-3">
          <a className="btn btn-white btn-xs" href="#"><i className="bi-file-earmark-arrow-down-fill me-1"></i> PDF</a>
          <a className="btn btn-white btn-xs" href="#"><i className="bi-printer-fill me-1"></i> Imprimir Recibo</a>
        </div>

        <hr className="my-5" />

        <p className="modal-footer-text">
          Si tiene alguna pregunta, no dudes en comunnicarte con nosotros
          <a href="mailto:ketea.tienda@gmail.com"> ketea.tienda@gmail.com </a>
          o llamar al 
          <a className="text-nowrap" href="#">+11 66725846</a>
        </p>

      </div>

    </div>
  </div>
</div>

    </>
  );
}