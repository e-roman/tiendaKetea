export default function NavProfile({ onSelect }) {
  return (
    <>
      <div className="navbar-expand-lg navbar-light">
        <div id="sidebarNav" className="collapse navbar-collapse navbar-vertical">
          <div className="card shadow-none flex-grow-1 mb-5">
            <div className="card-body">

              <span className="text-cap">Mi Cuenta</span>

              <ul className="nav nav-sm nav-tabs nav-vertical mb-4">
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-start"
                    onClick={() => onSelect("personalInfo")}>
                    <i className="bi-person-badge nav-icon"></i> Datos Personales
                  </button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn btn-link text-start"
                    onClick={() => onSelect("security")}>
                    <i className="bi-shield-shaded nav-icon"></i> Seguridad
                  </button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn btn-link text-start"
                    onClick={() => onSelect("notifications")}>
                    <i className="bi-bell nav-icon"></i> Notificaciones
                  </button>
                </li>
              </ul>

              <span className="text-cap">Compras</span>

              <ul className="nav nav-sm nav-tabs nav-vertical mb-4">
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-start"
                    onClick={() => onSelect("orders")}>
                    <i className="bi-basket nav-icon"></i> Mis Compras
                  </button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn btn-link text-start"
                    onClick={() => onSelect("favorites")}>
                    <i className="bi-heart nav-icon"></i> Favoritos
                  </button>
                </li>
              </ul>

              <span className="text-cap">Pago</span>

              <ul className="nav nav-sm nav-tabs nav-vertical">
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-start"
                    onClick={() => onSelect("payment")}>
                    <i className="bi-credit-card nav-icon"></i> Métodos de Pago
                  </button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn btn-link text-start"
                    onClick={() => onSelect("address")}>
                    <i className="bi-geo-alt nav-icon"></i> Dirección
                  </button>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
