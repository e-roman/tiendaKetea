
export default function AccountNotificaciones() {
  return (
      <>
        {/* Card */}
        <div className="card shadow-none p-2 p-lg-5 p-2 p-lg-5">
          {/* Header */}
          <div className="pt-4 pt-md-0 pb-4 mb-3 pb-md-5 mb-md-4 border-bottom">
            <h4 className="card-header-title">Notificaciones</h4>
          </div>
          {/* End Header */}


          <div className="card-body">

            {/* List Group */}
                  <div className="list-group">
                      <div className="list-group-item list-group-item-action d-flex gap-3 ps-0 pb-3 border-0 border-bottom">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <small className="mb-0 opacity-50">Tu compra fue procesada correctamente.</small>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </div>
                      <div className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <small className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </small>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </div>
                      <div className="list-group-item list-group-item-action d-flex gap-3 ps-0 pb-3 border-0 border-bottom">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-cart3"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Nuevo pedido confirmado</h6>
                                  <small className="mb-0 opacity-50">Tu compra fue procesada correctamente.</small>
                              </div>
                              <small className="opacity-50 text-nowrap">1min</small>
                          </div>
                      </div>
                      <div className="list-group-item list-group-item-action d-flex gap-3 ps-0 py-3 border-0 border-bottom">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Tu paquete está en camino</h6>
                                  <small className="mb-0 opacity-50">El pedido #48291 fue despachado y está viajando hacia tu domicilio. </small>
                              </div>
                              <small className="opacity-50 text-nowrap">3d</small>
                          </div>
                      </div>

                      <div className="list-group-item list-group-item-action d-flex gap-3 ps-0 pt-3 border-0">
                          <div className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light avatar avatar-3x2"><i className="bi bi-box-seam"></i></div>
                          <div className="d-flex gap-2 w-100 justify-content-between small lh-sm">
                              <div>
                                  <h6 className="mb-1">Pago rechazado</h6>
                                  <small className="mb-0 opacity-50">Hubo un problema al procesar tu método de pago. </small>
                              </div>
                              <small className="opacity-50 text-nowrap">15d</small>
                          </div>
                      </div>
                      
                  </div>
            {/* End List Group */}
          </div>
        </div>
        {/* End Card */}



    </>
  );
}