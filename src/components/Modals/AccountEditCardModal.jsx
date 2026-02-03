
import { useEffect } from "react";

export default function AccountEditCardModal({ onClose }) {
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
        {/* Edit Card Modal */}
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
                <h4 className="modal-title" id="accountEditCardModalLabel">Editar tarjeta</h4>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            {/* End Header */}

            {/* Body */}
            <div className="p-3 p-md-5">

                {/* Form */}
                <form>

                <div className="mb-4">
                    <label htmlFor="editCardNameLabel" className="form-label">Nombre del titular</label>
                    <input
                    type="text"
                    className="form-control"
                    id="editCardNameLabel"
                    placeholder="Francisco Perez"
                    aria-label="Francisco Perez"
                    defaultValue="Francisco Perez"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="editCardNumberLabel" className="form-label">Número de tarjeta</label>
                    <input
                    type="text"
                    className="js-input-mask form-control"
                    name="cardNumber"
                    id="editCardNumberLabel"
                    placeholder="xxxx xxxx xxxx xxxx"
                    aria-label="xxxx xxxx xxxx xxxx"
                    defaultValue="5200 7084 8243 3846"
                    />
                </div>

                <div className="row">
                    <div className="col-sm-6">
                    <div className="mb-4">
                        <label htmlFor="editCardEexpirationDateLabel" className="form-label">
                        Fecha de vencimiento
                        </label>
                        <input
                        type="text"
                        className="js-input-mask form-control"
                        name="expirationDate"
                        id="editCardEexpirationDateLabel"
                        placeholder="xx/xxxx"
                        aria-label="xx/xxxx"
                        defaultValue="12/2022"
                        />
                    </div>
                    </div>

                    <div className="col-sm-6">
                    <div className="mb-4">
                        <label htmlFor="editCardSecurityCodeLabel" className="form-label">
                        CVV
                        <i
                            className="bi-question-circle text-body ms-1"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="A 3 - digit number, typically printed on the back of a card."
                        ></i>
                        </label>

                        <input
                        type="password"
                        className="js-input-mask form-control"
                        name="securityCode"
                        id="editCardSecurityCodeLabel"
                        placeholder="xxx"
                        aria-label="xxx"
                        defaultValue="789"
                        />
                    </div>
                    </div>
                </div>

                {/* Checkbox */}
                <div className="form-check mb-4">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id="editCardMakePrimaryCheckbox2"
                    defaultChecked
                    />
                    <label className="form-check-label" htmlFor="editCardMakePrimaryCheckbox2">
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
                        className="btn btn-sm btn-white px-6 w-100 w-md-auto
                                order-2 order-md-1"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>


                </form>
            </div>
            {/* End Body */}

            </div>
        </div>
        </div>

    </>
  );
}