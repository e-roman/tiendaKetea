import { Link } from "react-router-dom";

export default function AccountHistoryPayments({ onOpenInvoice }) {
  return (
      <>
         <div className="card border shadow-none p-3 p-lg-5">
            {/* Header */}
           <div className="pt-2 pb-3 mb-3 pt-md-0 pb-md-3 mb-md-4 border-bottom">
                <h4 className="card-header-title">Historial de Pedidos</h4>
            </div>
            {/* End Header */}

            {/* Body */}
            <div className="card-body p-0 mt-2 mt-md-2">
              {/* Card */}
              <div>
                {/* Header */}
                {/* <div className="card-header">
                  <h5 className="card-header-title">Historial de Pedidos</h5>
                </div> */}

                {/* Table */}
                <div className="table-responsive d-none d-lg-block">
                  <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle">
                    <thead className="thead-light">
                      <tr>
                        <th>Referencia</th>
                        <th>Estado</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th></th>
                        <th className="text-right">Comprobante</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>#3682300</td>
                        <td><span className="badge bg-soft-warning text-warning">Pendiente</span></td>
                        <td>$1.262.399</td>
                        <td>22/04/2024</td>
                        <td></td>
                        <td className="text-right">
                          <button
                            className="btn btn-white btn-xs"
                            type="button"
                            onClick={onOpenInvoice}
                          >
                            <i className="bi-eye-fill me-1"></i> Ver Recibo
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>#2333234</td>
                        <td><span className="badge bg-soft-success text-success">Recibido</span></td>
                        <td>$1.262.399</td>
                        <td>08/06/2024</td>
                        <td></td>
                        <td className="text-right">
                          <button
                            className="btn btn-white btn-xs"
                            type="button"
                            onClick={onOpenInvoice}
                          >
                            <i className="bi-eye-fill me-1"></i> Ver Recibo
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>#9834283</td>
                        <td><span className="badge bg-soft-success text-success">Recibido</span></td>
                        <td>$1.262.399</td>
                        <td>16/08/2024</td>
                        <td></td>
                        <td className="text-right">
                          <button
                            className="btn btn-white btn-xs"
                            type="button"
                            onClick={onOpenInvoice}
                          >
                            <i className="bi-eye-fill me-1"></i> Ver Recibo
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className="d-block d-lg-none">

                  <div className="card border shadow-none border mb-3">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center justify-content-between pb-2">
                        <div className="d-flex align-items-center justify-content-between gap-2"><p className="font-size-1 mb-0">Referencia</p>  <h4 className="h6 mb-0">#3682303 </h4></div>
                        <div><span className="badge px-2 py-1 bg-soft-warning text-warning font-13 ms-2">Pendiente</span></div>
                      </div>
                      <h4 className="h6">Monto</h4>
                      <h5 className="font-weight-normal">$1.262.399</h5>
                      <p className="font-size-1 mb-0">Metodo de Pago: <span className="text-dark font-weight-medium">Tarjeta de crédito Visa</span></p>
                      <p className="font-size-1">Fecha del pago: <span className="text-dark font-weight-medium">08/06/2024</span></p>
                      <div className="d-flex w-100 gap-2 justify-content-between align-items-center">
                      <a className="btn btn-xs py-2 btn-primary w-100" href="#">PDF</a>
                      <a className="btn btn-xs py-2 btn-soft-secondary w-100" href="#">Ver Recibo</a>
                      </div>
                    </div>
                  </div>

                  <div className="card border shadow-none border mb-3">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center justify-content-between pb-2">
                        <div className="d-flex align-items-center justify-content-between gap-2"><p className="font-size-1 mb-0">Referencia</p>  <h4 className="h6 mb-0">#3682303 </h4></div>
                        <div><span className="badge px-2 py-1 bg-soft-success text-success font-13 ms-2">Recibido</span></div>
                      </div>
                      <h4 className="h6">Monto</h4>
                      <h5 className="font-weight-normal">$1.262.399</h5>
                      <p className="font-size-1 mb-0">Metodo de Pago: <span className="text-dark font-weight-medium">Tarjeta de crédito Visa</span></p>
                      <p className="font-size-1">Fecha del pago: <span className="text-dark font-weight-medium">22/04/2024</span></p>
                      <div className="d-flex w-100 gap-2 justify-content-between align-items-center">
                      <a className="btn btn-xs py-2 btn-primary w-100" href="#">PDF</a>
                      <a className="btn btn-xs py-2 btn-soft-secondary w-100" href="#">Ver Recibo</a>
                      </div>
                    </div>
                  </div>

                  <div className="card border shadow-none border">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center justify-content-between pb-2">
                        <div className="d-flex align-items-center justify-content-between gap-2"><p className="font-size-1 mb-0">Referencia</p>  <h4 className="h6 mb-0">#3682303 </h4></div>
                        <div><span className="badge px-2 py-1 bg-soft-success text-success font-13 ms-2">Recibido</span></div>
                      </div>
                      <h4 className="h6">Monto</h4>
                      <h5 className="font-weight-normal">$1.262.399</h5>
                      <p className="font-size-1 mb-0">Metodo de Pago: <span className="text-dark font-weight-medium">Tarjeta de crédito Visa</span></p>
                      <p className="font-size-1">Fecha del pago: <span className="text-dark font-weight-medium">16/08/2024</span></p>
                      <div className="d-flex w-100 gap-2 justify-content-between align-items-center">
                      <a className="btn btn-xs py-2 btn-primary w-100" href="#">PDF</a>
                      <a className="btn btn-xs py-2 btn-soft-secondary w-100" href="#">Ver Recibo</a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Table */}
              </div>
              {/* End Card */}
            </div>
            {/* End Body */}
        </div>

    </>
  );
}