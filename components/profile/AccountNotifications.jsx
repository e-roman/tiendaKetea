export default function AccountNotificactions() {
  return (
      <>
        {/* Card */}
        <div className="card shadow-none">
          {/* Header */}
          <div className="card-header d-flex justify-content-between align-items-center border-bottom">
            <h4 className="card-header-title">Notificaciones</h4>

            <a id="toggleAll1" className="btn btn-white btn-sm btn-toggle" href="#" style={{position: "absolute", right: "30px"}}>
                  <span className="btn-toggle-default">Activar todas</span>
                  <span className="btn-toggle-toggled">Desaactivar todas</span>
                </a>
          </div>
          {/* End Header */}

          {/* Alert */}
          <div className="alert alert-soft-danger text-center card-alert" role="alert">
            Necesitamos permiso de tu navegador para mostrar notificaciones.{" "}
            <a className="alert-link font-medium" href="#">
              Solicitar permiso
            </a>
          </div>
          {/* End Alert */}

          <div className="card-body">
           <h5 className="card-header-title pb-3">Enviarme:</h5>

            {/* List Group */}
            <div className="list-group list-group-flush list-group-no-gutters">
              {/* Item */}
              <div className="list-group-item">
                {/* Form Switch */}
                <label className="form-check form-switch" htmlFor="accountNotificationSwitch1">
                  <input className="form-check-input mt-0" type="checkbox" id="accountNotificationSwitch1" />
                  <span className="d-block">
                    Novedades para vos – <span className="badge bg-success ms-1">Nuevo</span>
                  </span>
                  <span className="d-block small text-muted">
                    Un email semanal con productos recomendados según tus intereses.
                  </span>
                </label>
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="list-group-item">
                <label className="form-check form-switch" htmlFor="accountNotificationSwitch3">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="accountNotificationSwitch3"
                    defaultChecked
                  />
                  <span className="d-block">Actividad de la cuenta</span>
                  <span className="d-block small text-muted">
                    Recibí notificaciones sobre tu cuenta, tus pedidos o actividad reciente que te hayas perdido.
                  </span>
                </label>
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="list-group-item">
                <label className="form-check form-switch" htmlFor="accountNotificationSwitch4">
                  <input className="form-check-input mt-0" type="checkbox" id="accountNotificationSwitch4" />
                  <span className="d-block">Ofertas cerca de tu ubicación – Nuevo</span>
                  <span className="d-block small text-muted">
                    Recibí un email cuando haya promociones o eventos especiales en tiendas cercanas a tu zona.
                  </span>
                </label>
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="list-group-item">
                <label className="form-check form-switch" htmlFor="accountNotificationSwitch2">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="accountNotificationSwitch2"
                    defaultChecked
                  />
                  <span className="d-block">Oportunidades</span>
                  <span className="d-block small text-muted">
                    Un email diario cuando se activen nuevas ofertas, descuentos o productos en tu categoría favorita.
                  </span>
                </label>
              </div>
              {/* End Item */}
            </div>
            {/* End List Group */}
          </div>
        </div>
        {/* End Card */}

        {/* Card */}
        <div className="card shadow-none card-sm">
          {/* Header */}
          <div className="card-header d-flex justify-content-between align-items-center border-bottom">
            <h5 className="card-header-title">Newsletter</h5>

            <a
              id="toggleAll3"
              className="js-toggle-state btn btn-white btn-sm btn-toggle"
              href="javascript:;"
              data-hs-toggle-state-options='{"targetSelector": "#accountNotificationSwitch5, #accountNotificationSwitch6, #accountNotificationSwitch7, #accountNotificationSwitch8"}'
            >
              <span className="btn-toggle-default">Activar todas</span>
              <span className="btn-toggle-toggled">Desactivar todas</span>
            </a>
          </div>
          {/* End Header */}

          <div className="card-body">
            <small className="card-subtitle">Suscribirme a:</small>

            {/* List Group */}
            <div className="list-group list-group-flush list-group-no-gutters">
              {/* Item */}
              <div className="list-group-item">
                <label className="form-check form-switch" htmlFor="accountNotificationSwitch5">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="accountNotificationSwitch5"
                    defaultChecked
                  />
                  <span className="d-block">Novedades de la tienda</span>
                  <span className="d-block small text-muted">
                    Recibí noticias, lanzamientos de productos y actualizaciones importantes.
                  </span>
                </label>
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="list-group-item">
                <label className="form-check form-switch" htmlFor="accountNotificationSwitch6">
                  <input className="form-check-input mt-0" type="checkbox" id="accountNotificationSwitch6" />
                  <span className="d-block">
                    Ofertas destacadas <span className="badge bg-success ms-1">Nuevo</span>
                  </span>
                  <span className="d-block small text-muted">
                    Un email semanal con las promociones y descuentos más populares.
                  </span>
                </label>
              </div>
              {/* End Item */}

              {/* Item */}
              <div className="list-group-item">
                <label className="form-check form-switch" htmlFor="accountNotificationSwitch7">
                  <input className="form-check-input mt-0" type="checkbox" id="accountNotificationSwitch7" />
                  <span className="d-block">Alertas de productos</span>
                  <span className="d-block small text-muted">
                    Un resumen semanal con novedades, productos recién llegados y recomendaciones personalizadas.
                  </span>
                </label>
              </div>
              {/* End Item */}
            </div>
            {/* End List Group */}
          </div>
        </div>
        {/* End Card */}

        {/* Toggle Button */}
        <div className="d-sm-flex justify-content-between align-items-center pt-4">
          <div className="mb-3 mb-sm-0">
            <small>Activar o desactivar todas las notificaciones:</small>
          </div>

          <a
            className="js-toggle-state btn btn-primary btn-sm btn-toggle"
            href="javascript:;"
            data-hs-toggle-state-options='{"targetSelector": "#accountNotificationSwitch1, #accountNotificationSwitch2, #accountNotificationSwitch3, #accountNotificationSwitch4, #accountNotificationSwitch5, #accountNotificationSwitch6, #accountNotificationSwitch7, #accountNotificationSwitch8, #accountNotificationSwitch9, #accountNotificationSwitch10, #accountNotificationSwitch11", "slaveSelector": "#toggleAll1, #toggleAll2, #toggleAll3, #toggleAll4"}'
          >
            <span className="btn-toggle-default">
              <i className="bi-toggle-off me-1"></i> Desactivar todas
            </span>
            <span className="btn-toggle-toggled">
              <i className="bi-toggle-on me-1"></i> Activar todas
            </span>
          </a>
        </div>
        {/* End Toggle Button */}

    </>
  );
}