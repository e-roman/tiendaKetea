export default function AccountAddress() {
  return (
      <>
        <div className="card shadow-none p-2 p-lg-5">
            {/* Header */}
            <div className="pt-4 pt-md-0 pb-4 mb-3 pb-md-5 mb-md-4 border-bottom">
                <h4 className="card-header-title">Mi Dirección</h4>
            </div>
            {/* End Header */}

            {/* Body */}
            <div className="card-body p-1 p-md-0 mt-2 mt-md-3">
                <div className="row">
                <div className="col-sm-6 mb-5 mb-sm-7">
                    {/* Radio Check */}
                    <div className="form-check form-check-inline w-100 h-100">
                    <input
                        type="radio"
                        id="billingRadio1"
                        name="billingRadio"
                        className="form-check-input"
                        defaultChecked
                    />
                    <label className="form-check-label" htmlFor="billingRadio1">
                        <span className="h5 d-block">Dirección de facturación n.° 1</span>

                        <span className="d-block mb-2">
                        Tronador 411<br />
                        Haedo, Morón.<br />
                        Buenos Aires<br />
                        </span>

                        <a
                        className="btn btn-white btn-xs"
                        href="#"
                        >
                        <i className="bi-pencil-fill me-1"></i> Editar dirección
                        </a>
                    </label>
                    </div>
                    {/* End Radio Check */}
                </div>
                {/* End Col */}

                <div className="col-sm-6 mb-5 mb-sm-7">
                    {/* Radio Check */}
                    <div className="form-check form-check-inline w-100 h-100">
                    <input
                        type="radio"
                        id="billingRadio2"
                        name="billingRadio"
                        className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="billingRadio2">
                        <span className="h5 d-block">Dirección de facturación n.° 2</span>

                        <span className="d-block mb-2">
                        11 de Septiembre 1653<br />
                        Haedo, Morón.<br />
                        Buenos Aires<br />
                        </span>

                        <a
                        className="btn btn-white btn-xs"
                        href="#"
                        >
                        <i className="bi-pencil-fill me-1"></i> Editar dirección
                        </a>
                    </label>
                    </div>
                    {/* End Radio Check */}
                </div>
                {/* End Col */}

                <div className="col-sm-6 mb-5 mb-sm-7">
                    {/* Card */}
                    <a
                    className="card card-dashed card-centered shadow-none"
                    href="javascript:;"
                    data-bs-toggle="modal"
                    data-bs-target="#accountAddAddressModal"
                    >
                    <div className="card-body card-dashed-body py-3">
                        <div>
                        <span className="d-block">
                            <i className="bi-plus"></i> Agregar nueva dirección
                        </span>
                        </div>
                    </div>
                    </a>
                    {/* End Card */}
                </div>
                {/* End Col */}
                </div>
                {/* End Row */}

                <div className="mb-4">
                <h5>Ubicación de envío</h5>
                <p className="mb-0">Bs.A. - 20.00% Cargo por envío</p>
                <a className="link-sm" href="#">Más información</a>
                </div>

                <p className="mb-0">
                Tu ubicación de envío determina los cargos adicionales aplicados a tu pedido.
                </p>
                <a className="link-sm" href="#">
                ¿Cómo puedo corregir mi ubicación de envío una vez realizado el pedido?
                </a>
            </div>
            {/* End Body */}
        </div>

    </>
  );
}