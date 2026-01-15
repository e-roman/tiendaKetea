import { useEffect } from "react";

export default function AccountAddCardModal({ onClose }) {
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
        {/* Add Card Modal */}
    <div
      className="modal-backdrop-custom modal-style-xs "
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">

            {/* Header */}
            <div className="modal-header px-3 pt-3 pb-6 pt-md-5 pb-md-0 px-md-5">
                <h4 className="modal-title" id="accountAddCardModalLabel">Agregar tarjeta</h4>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {/* Body */}
            <div className="modal-body p-3 p-md-5">

                <form>

                {/* Radio Button Group */}
                <div
                    className="btn-group btn-group-segment d-flex mb-4"
                    role="group"
                    aria-label="Account add card radio button group"
                >
                    <input
                    type="radio"
                    className="btn-check"
                    name="accountAddCardBtnRadio"
                    id="accountAddCardBtnRadioOption1"
                    autoComplete="off"
                    defaultChecked
                    />
                    <label className="btn btn-sm shadow-none" htmlFor="accountAddCardBtnRadioOption1">
                    Crédito o Débito
                    </label>

                    <input
                    type="radio"
                    className="btn-check"
                    name="accountAddCardBtnRadio"
                    id="accountAddCardBtnRadioOption2"
                    autoComplete="off"
                    disabled
                    />
                    <label className="btn btn-sm" htmlFor="accountAddCardBtnRadioOption2">
                    Mercado Pago <span className="badge bg-soft-primary text-primary">Próximamente</span>
                    </label>
                </div>

                <div className="mb-4">
                    <label htmlFor="cardNameLabel" className="form-label">Nombre de la tarjeta</label>
                    <input type="text" className="form-control" id="cardNameLabel" placeholder="Visa" aria-label="Visa" />
                </div>

                <div className="mb-4">
                    <label htmlFor="cardNumberLabel" className="form-label">Número de tarjeta</label>
                    <input type="text" className="form-control" id="cardNumberLabel" placeholder="xxxx xxxx xxxx xxxx" aria-label="xxxx xxxx xxxx xxxx" />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                    <div className="mb-4">
                        <label htmlFor="expirationDateLabel" className="form-label">Fecha de vencimiento</label>
                        <input type="text" className="form-control" id="expirationDateLabel" placeholder="xx/xxxx" aria-label="xx/xxxx" />
                    </div>
                    </div>

                    <div className="col-sm-6">
                    <div className="mb-4">
                        <label htmlFor="securityCodeLabel" className="form-label">
                        CVV
                        <i className="bi-question-circle text-body ms-1"></i>
                        </label>
                        <input type="text" className="form-control" id="securityCodeLabel" placeholder="xxx" aria-label="xxx" />
                    </div>
                    </div>
                </div>

                <div className="form-check mb-4">
                    <input type="checkbox" className="form-check-input" id="makePrimaryCheckbox1" defaultChecked />
                    <label className="form-check-label" htmlFor="makePrimaryCheckbox1">
                    Marcar como principal
                    </label>
                </div>

                <div className="d-md-flex justify-content-end gap-3 py-5 py-md-0 pt-md-0">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary px-6 w-100 w-md-auto
                                order-1 order-md-2 mb-4 mb-md-0"
                        onClick={onClose}
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm border-0 btn-white px-6 w-100 w-md-auto
                                order-2 order-md-1"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>


                </form>
            </div>

            </div>
        </div>
        </div>

    </>
  );
}