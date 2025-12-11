import { Link } from "react-router-dom";

export default function AccountHistoryPayments({ onOpenInvoice }) {
  return (
      <>
        <div className="card shadow-none">
            {/* Header */}
            <div className="card-header border-bottom">
                <h4 className="card-header-title">Historial de Pedidos</h4>
            </div>
            {/* End Header */}

            {/* Body */}
            <div className="card-body">
        {/* Card */}
        <div className="card shadow-none">
          {/* Header */}
          {/* <div className="card-header">
            <h5 className="card-header-title">Historial de Pedidos</h5>
          </div> */}

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle">
              <thead className="thead-light">
                <tr>
                  <th>Referencia</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Comprobante</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><a href="#">#3682303</a></td>
                  <td><span className="badge bg-soft-warning text-warning">Pendiente</span></td>
                  <td>$1.262.399</td>
                  <td>22/04/2024</td>
                  <td>
                    <Link className="btn btn-white btn-xs" to="#">
                      <i className="bi-file-earmark-arrow-down-fill me-1"></i> PDF
                    </Link>
                  </td>
                  <td>
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
                  <td><a href="#">#2333234</a></td>
                  <td><span className="badge bg-soft-success text-success">Recibido</span></td>
                  <td>$1.262.399</td>
                  <td>08/06/2024</td>
                  <td>
                    <Link className="btn btn-white btn-xs" to="#">
                      <i className="bi-file-earmark-arrow-down-fill me-1"></i> PDF
                    </Link>
                  </td>
                  <td>
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
                  <td><a href="#">#9834283</a></td>
                  <td><span className="badge bg-soft-success text-success">Recibido</span></td>
                  <td>$1.262.399</td>
                  <td>16/08/2024</td>
                  <td>
                    <Link className="btn btn-white btn-xs" to="#">
                      <i className="bi-file-earmark-arrow-down-fill me-1"></i> PDF
                    </Link>
                  </td>
                  <td>
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
          {/* End Table */}
        </div>
        {/* End Card */}
            </div>
            {/* End Body */}
        </div>

    </>
  );
}