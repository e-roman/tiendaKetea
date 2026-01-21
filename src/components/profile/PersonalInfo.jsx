export default function PersonalInfo() {
  return (
      <>
          <div className="d-grid gap-3 gap-lg-3">
            {/*!-- Card --*/}
            <div className="card border shadow-none p-3 p-lg-5">
              <div className="pt-2 pb-3 mb-3 pt-md-0 pb-md-3 mb-md-4 border-bottom">
                <h4 className="card-header-title">Datos Personales</h4>
              </div>

              {/*!-- Body --*/}
              <div className="card-body p-1 p-md-0 mt-0 mt-md-3">
                <form>
                  {/*!-- Form --*/}
                  <div className="row mb-4">
                    <label htmlFor="firstNameLabel" className="col-sm-3 col-form-label form-label">Nombre Completo </label>

                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" name="firstName" id="firstNameLabel" placeholder="Francisco Perez" aria-label="Francisco Perez" defaultValue="Francisco Perez"/>
                      </div>
                    </div>
                  </div>
                  {/*!-- End Form --*/}

                  {/*!-- Form --*/}
                  <div className="row mb-4">
                    <label htmlFor="emailLabel" className="col-sm-3 col-form-label form-label">Email</label>

                    <div className="col-sm-9">
                      <input type="email" className="form-control" name="email" id="emailLabel" placeholder="fran.perez@gmail.com" aria-label="fran.perez@gmail.com" defaultValue="fran.perez@gmail.com"/>
                    </div>
                  </div>
                  {/*!-- End Form --*/}

                  {/*!-- Form --*/}
                  <div className=" row mb-4">
                    <label htmlFor="phoneLabel" className="col-sm-3 col-form-label form-label">Teléfono <span className="form-label-secondary">(Opcional)</span></label>

                        <div className="col-sm-9">
                          <div className="input-group">
                            <input type="text" className="form-control" name="phone" id="phoneLabel" placeholder="+x(xxx)xxx-xx-xx" aria-label="+x(xxx)xxx-xx-xx" defaultValue="+54(11)5618929"/>

                            <div className="tom-select-custom">
                              <select className="js-select form-select" name="phoneSelect" defaultValue="Celular">
                                <option defaultValue="Mobile">Celular</option>
                                <option defaultValue="Home">Casa</option>
                                <option defaultValue="Work">Trabajo</option>
                              </select>
                            </div>
                          </div>

                          {/*!-- Container donde se agregarán los nuevos campos --*/}
                          <div id="addPhoneFieldContainer"></div>

                          <a href="javascript:;" className="js-create-field form-link" id="addPhoneBtn">
                            <i className="bi-plus-circle me-1"></i> Agregar Teléfono
                          </a>
                        </div>
                  </div>
                  {/*!-- End Form --*/}

                  {/*!-- Add Phone Input Field --*/}
                  <div id="addPhoneFieldTemplate" style={{display: "none", position: "relative"}}>
                    <div className="input-group input-group-add-field">
                      <input type="text" className="js-input-mask-dynamic form-control" data-name="additionlPhone" placeholder="+x(xxx)xxx-xx-xx" aria-label="+x(xxx)xxx-xx-xx"/>

                      {/*!-- Select --*/}
                      <div className="tom-select-custom">
                        <select className="form-select" data-name="additionlPhoneSelect" defaultValue="Celular">
                            <option defaultValue="Mobile">Celular</option>
                            <option defaultValue="Home">Casa</option>
                            <option defaultValue="Work">Trabajo</option>
                          <option defaultValue="Direct">Otro</option>
                        </select>
                      </div>
                      {/*!-- End Select --*/}
                    </div>

                    <a className="js-delete-field input-group-add-field-delete" href="javascript:;">
                      <i className="bi-x-lg"></i>
                    </a>
                  </div>
                  {/*!-- End Add Phone Input Field --*/}

                </form>
              </div>
              {/*!-- End Body --*/}

              {/*!-- Footer --*/}
              <div className="card-footer px-0 pt-0 pb-0 mt-3 mt-md-0">
                <div className="d-md-flex justify-content-end gap-3">
                  <a className="btn btn-sm border-0 btn-white w-xs-100 d-none d-md-block" href="javascript:;">Cancelar</a>
                  <a className="btn btn-sm px-4 btn-primary w-xs-100" href="javascript:;">Guardar cambios</a>
                </div>
              </div>
              {/*!-- End Footer --*/}
            </div>
            {/*!-- End Card --*/}

            {/*!-- Card --*/}
            <div id="editAddressCard" className="card border shadow-none p-3 p-lg-5">
              <div className="pt-2 pb-3 mb-3 pt-md-0 pb-md-3 mb-md-4 border-bottom">
                <h4 className="card-header-title">Dirección</h4>
              </div>

              {/*!-- Body --*/}
              <div className="card-body p-1 p-md-0 mt-0 mt-md-3">
                <form>
                  {/*!-- Form --*/}
                  <div className="row mb-4">
                    <label htmlFor="locationLabel" className="col-sm-3 col-form-label form-label">Partido</label>

                    <div className="col-sm-9">
                      {/*!-- Select --*/}
                      <div className="tom-select-custom mb-3">
                          <select className="js-select form-select" id="locationLabel" defaultValue="Buenos Aires">
                            <option label="Buenos Aires"></option>
                              <option defaultValue="AR-B" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Buenos Aires</span></span>'>Buenos Aires</option>
                              <option defaultValue="AR-K" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Catamarca</span></span>'>Catamarca</option>
                              <option defaultValue="AR-H" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Chaco</span></span>'>Chaco</option>
                              <option defaultValue="AR-U" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Chubut</span></span>'>Chubut</option>
                              <option defaultValue="AR-C" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Ciudad Autónoma de Buenos Aires</span></span>'>Ciudad Autónoma de Buenos Aires</option>
                              <option defaultValue="AR-X" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Córdoba</span></span>'>Córdoba</option>
                              <option defaultValue="AR-W" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Corrientes</span></span>'>Corrientes</option>
                              <option defaultValue="AR-E" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Entre Ríos</span></span>'>Entre Ríos</option>
                              <option defaultValue="AR-P" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Formosa</span></span>'>Formosa</option>
                              <option defaultValue="AR-Y" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Jujuy</span></span>'>Jujuy</option>
                              <option defaultValue="AR-L" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">La Pampa</span></span>'>La Pampa</option>
                              <option defaultValue="AR-F" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">La Rioja</span></span>'>La Rioja</option>
                              <option defaultValue="AR-M" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Mendoza</span></span>'>Mendoza</option>
                              <option defaultValue="AR-N" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Misiones</span></span>'>Misiones</option>
                              <option defaultValue="AR-Q" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Neuquén</span></span>'>Neuquén</option>
                              <option defaultValue="AR-R" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Río Negro</span></span>'>Río Negro</option>
                              <option defaultValue="AR-A" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Salta</span></span>'>Salta</option>
                              <option defaultValue="AR-J" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">San Juan</span></span>'>San Juan</option>
                              <option defaultValue="AR-D" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">San Luis</span></span>'>San Luis</option>
                              <option defaultValue="AR-Z" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Santa Cruz</span></span>'>Santa Cruz</option>
                              <option defaultValue="AR-S" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Santa Fe</span></span>'>Santa Fe</option>
                              <option defaultValue="AR-G" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Santiago del Estero</span></span>'>Santiago del Estero</option>
                              <option defaultValue="AR-V" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Tierra del Fuego</span></span>'>Tierra del Fuego</option>
                              <option defaultValue="AR-T" data-option-template='<span className="d-flex align-items-center"><span className="text-truncate">Tucumán</span></span>'>Tucumán</option>
                          </select>
                      </div>
                      {/*!-- End Select --*/}

                      <div className="mb-3">
                        <input type="text" className="form-control" name="city" id="cityLabel" placeholder="Ciudad" aria-label="Ciudad" defaultValue="Morón" />
                      </div>
                      <input type="text" className="form-control" name="state" id="stateLabel" placeholder="Haedo" aria-label="Haedo" defaultValue="Haedo"/>
                    </div>
                  </div>
                  {/*!-- End Form --*/}

                  {/*!-- Form --*/}
                  <div className="row mb-4">
                    <label htmlFor="addressLine1Label" className="col-sm-3 col-form-label form-label">Dirección 1</label>

                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="addressLine1" id="addressLine1Label" placeholder="Escribe aquí tu dirección" aria-label="Escribe aquí tu dirección" defaultValue="Tronador 568, Haedo" />
                    </div>
                  </div>
                  {/*!-- End Form --*/}

                  {/*!-- Form --*/}
                  <div className="row mb-4">
                    <label htmlFor="addressLine2Label" className="col-sm-3 col-form-label form-label">Dirección 2 <span className="form-label-secondary">(Opcional)</span></label>

                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="addressLine2" id="addressLine2Label" placeholder="Escribe aquí otra dirección" aria-label="Escribe aquí otra dirección" />

                      {/*!-- Container For Input Field --*/}
                      <div id="addAddressFieldContainer"></div>

                      <a href="javascript:;" className="form-link">
                        <i className="bi-plus-circle me-1"></i> Agregar dirección
                      </a>
                    </div>
                  </div>
                  {/*!-- End Form --*/}

                  {/*!-- Add Phone Input Field --*/}
                  <div id="addAddressFieldTemplate" style={{display: "none", position: "relative"}}>
                    <div className="input-group-add-field">
                      <input type="text" className="form-control" data-name="addressLine" placeholder="Your address" aria-label="Your address" />
                    </div>

                    <a className="js-delete-field input-group-add-field-delete" href="javascript:;">
                      <i className="bi-x-lg"></i>
                    </a>
                  </div>
                  {/*!-- End Add Phone Input Field --*/}

                  {/*!-- Form --*/}
                  <div className="row mb-4">
                    <label htmlFor="zipCodeLabel" className="col-sm-3 col-form-label form-label">Código Postal </label>

                    <div className="col-sm-9">
                      <input type="text" className="js-input-mask form-control" name="zipCode" id="zipCodeLabel" placeholder="Código Postal" aria-label="Código Postal" defaultValue="1706" />
                    </div>
                  </div>
                  {/*!-- End Form --*/}
                </form>
              </div>
              {/*!-- End Body --*/}

              {/*!-- Footer --*/}
              <div className="card-footer px-0 pt-0 pb-4 mt-3 mt-md-0">
                <div className="d-md-flex justify-content-end gap-3">
                  <a className="btn btn-sm border-0 btn-white w-xs-100 d-none d-md-block" href="javascript:;">Cancelar</a>
                  <a className="btn btn-sm px-4 btn-primary w-xs-100" href="javascript:;">Guardar cambios</a>
                </div>
              </div>
              {/*!-- End Footer --*/}
            </div>
            {/*!-- End Card --*/}


            {/*!-- Card --*/}
            <div className="card border shadow-none p-3 p-lg-5">
              <div className="pt-2 pb-3 mb-3 pt-md-0 pb-md-3 mb-md-4 border-bottom">
                <h4 className="card-header-title">Eliminar mi cuenta</h4>
              </div>

              {/*!-- Body --*/}
              <div className="card-body p-1 p-md-0 mt-0 mt-md-3">
                <p className="card-text">Al eliminar tu cuenta, pierdes el acceso a los servicios de Ketea S.A y eliminamos permanentemente tus datos personales. Puedes cancelar la eliminación durante 14 días.</p>

                <div className="mb-4">
                  {/*!-- Check --*/}
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="deleteAccountCheckbox" />
                    <label className="form-check-label" htmlFor="deleteAccountCheckbox">Confirmo que quiero eliminar mi cuenta.</label>
                  </div>
                  {/*!-- End Check --*/}
                </div>

                <div className="d-flex justify-content-end px-0 pt-0 mt-5 mt-md-0">
                  <button type="submit" className="btn btn-sm px-4 btn-danger">Eliminar</button>
                </div>
              </div>
              {/*!-- End Body --*/}
            </div>
            {/*!-- End Card --*/}
          </div>
    </>
  );
}