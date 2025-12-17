export default function AccountSecurity() {
  return (
      <>
            {/* Card */}
            <div className="card shadow-none p-2 p-lg-5">
                <div className="pt-4 pt-md-0 pb-4 mb-3 pb-md-5 mb-md-4 d-flex justify-content-between align-items-center border-bottom">
                <div className="d-flex align-items-center">
                    <h4 className="card-header-title">Verificación en dos pasos</h4>
                    <span className="badge bg-soft-danger text-danger ms-2">Desactivada</span>
                </div>
                </div>

                {/* Body */}
                <div className="card-body p-1 p-md-0 mt-2 mt-md-3">
                <p className="card-text">
                    Comenzá ingresando tu contraseña para que podamos confirmar que sos vos. Luego te guiaremos por dos pasos simples más.
                </p>

                <form>
                    {/* Form */}
                    <div className="row mb-4">
                    <label
                        htmlFor="accountPasswordLabel"
                        className="col-sm-3 col-form-label form-label"
                    >
                        Contraseña
                    </label>

                    <div className="col-sm-9">
                        <input
                        type="password"
                        className="form-control mb-2"
                        name="currentPassword"
                        id="accountPasswordLabel"
                        placeholder="Ingresar contraseña actual"
                        aria-label=""
                        />
                        <small className="form-text">
                        Esta es la contraseña que usás para iniciar sesión en tu cuenta de Front.
                        </small>
                    </div>
                    </div>
                    {/* End Form */}

                    <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary rounded-pill btn-sm px-4 w-xs-100">
                        Establecer
                    </button>
                    </div>
                </form>
                </div>
                {/* End Body */}
            </div>
            {/* End Card */}

            {/* Card */}
            <div className="card shadow-none p-2 p-lg-5">
                <div className="mb-3 pb-md-5 d-flex justify-content-between align-items-center border-bottom">
                <h5 className="card-header-title">Contraseña</h5>
                </div>

                {/* Body */}
                <div className="card-body p-1 p-md-0 mt-2 mt-md-3">
                {/* Form */}
                <form>
                    {/* Form */}
                    <div className="row mb-4">
                    <label
                        htmlFor="currentPasswordLabel"
                        className="col-sm-3 col-form-label form-label"
                    >
                        Contraseña actual
                    </label>

                    <div className="col-sm-9">
                        <input
                        type="password"
                        className="form-control"
                        name="currentPassword"
                        id="currentPasswordLabel"
                        placeholder="Ingresá tu contraseña actual"
                        aria-label="Ingresá tu contraseña actual"
                        />
                    </div>
                    </div>
                    {/* End Form */}

                    {/* Form */}
                    <div className="row mb-4">
                    <label htmlFor="newPassword" className="col-sm-3 col-form-label form-label">
                        Nueva contraseña
                    </label>

                    <div className="col-sm-9">
                        <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Ingresá una nueva contraseña"
                        aria-label="Ingresá una nueva contraseña"
                        />
                    </div>
                    </div>
                    {/* End Form */}

                    {/* Form */}
                    <div className="row mb-4">
                    <label
                        htmlFor="confirmNewPasswordLabel"
                        className="col-sm-3 col-form-label form-label"
                    >
                        Confirmar nueva contraseña
                    </label>

                    <div className="col-sm-9">
                        <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="confirmNewPassword"
                            id="confirmNewPasswordLabel"
                            placeholder="Confirmá tu nueva contraseña"
                            aria-label="Confirmá tu nueva contraseña"
                        />
                        </div>

                        <h5>Requisitos de la contraseña:</h5>

                        <p className="card-text small">Asegurate de cumplir con los siguientes requisitos:</p>

                        <ul className="small">
                        <li>Mínimo 8 caracteres (mientras más larga, mejor)</li>
                        <li>Al menos una letra minúscula</li>
                        <li>Al menos una letra mayúscula</li>
                        <li>Al menos un número, símbolo o carácter de espacio</li>
                        </ul>
                    </div>
                    </div>
                    {/* End Form */}

                    <div className="d-md-flex justify-content-end gap-3 mt-5 mt-md-8">
                    <a className="btn border-0 btn-sm px-4 btn-white w-xs-100 d-none d-md-block" href="javascript:;">Cancelar</a>
                    <button type="submit" className="btn btn-sm px-4 rounded-pill btn-primary w-xs-100">
                        Actualizar Contraseña
                    </button>
                    </div>
                </form>
                {/* End Form */}
                </div>
                {/* End Body */}
            </div>
            {/* End Card */}

            {/* Card */}
            <div className="card shadow-none p-2 p-lg-5">
                <div className="mb-3 pb-md-5 d-flex justify-content-between align-items-center border-bottom">
                <h5 className="card-header-title">Ingresar con Gmail</h5>
                </div>

                {/* Body */}
                <div className="card-body p-1 p-md-0 mt-2 mt-md-3">
                {/* Form */}
                <form>
                    {/* List Group */}
                    <div className="list-group list-group-flush list-group-no-gutters">
                    {/* Item */}
                    <div className="list-group-item">
                        <div className="d-flex">
                        <div className="flex-shrink-0">
                            <img
                            className="avatar avatar-xs avatar-4x3"
                            src="../assets/svg/brands/google-icon.svg"
                            alt="Image Description"
                            />
                        </div>

                        <div className="flex-grow-1 ms-3">
                            <div className="row align-items-center">
                            <div className="col">
                                <h6 className="mb-1">Gmail</h6>
                                <span className="d-block small text-body">Ingresa con cuenta</span>
                            </div>

                            <div className="col-auto">
                                {/* Form Switch */}
                                <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="connectedAccounts1"
                                />
                                <label className="form-check-label" htmlFor="connectedAccounts1"></label>
                                </div>
                                {/* End Form Switch */}
                            </div>
                            </div>
                            {/* End Row */}
                        </div>
                        </div>
                    </div>
                    {/* End Item */}
                    </div>
                    {/* End List Group */}
                </form>
                {/* End Form */}
                </div>
                {/* End Body */}
            </div>
            {/* End Card */}

    </>
  );
}