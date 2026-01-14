import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OrderSummary() {



  return (
    <>
    <div className="card shadow-none rounded bg-light-md p-3 py-md-4 px-md-5 mb-3">
      {/* Email */}
      <div className="d-flex align-items-center mb-3 text-black font-15">
        {/* <i className="bi bi-envelope me-2"></i> */}
        <span>franperez@gmail.com</span>
      </div>

      <hr />

      {/* Retiro en tienda */}
      {/* <div className="d-flex align-items-start mb-3 text-black">
        <i className="bi bi-shop me-2 fs-5"></i>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <p className="font-15 font-bold mb-0">Retiras en Tienda Ketea Ramos Mejía · Grátis</p>
            <button className="btn btn-link p-0 font-15 text-black font-medium">Cambiar</button>
          </div>
          <small>
           Coronel Brandsen 2230, Ramos Mejia, Buenos Aires
            Lun a Vie. de 9 a 18 hrs.
          </small>
        </div>
      </div> */}

      {/* Datos de cobranza */}
      <div className="d-flex align-items-start mb-3 text-black font-15 ">
        {/* <i className="bi bi-card-list me-2 fs-5"></i> */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <p className="font-15 font-bold mb-0">Datos de cobranza</p>
            <button className="btn btn-link p-0 font-15 text-black font-medium">Modificar</button>
          </div>
          <div>
            <p className="mb-1">Francisco Perez</p>
            <p className="mb-1">Av. Rivadavia 1845, CP 1706 - Haedo, Morón, Gran Buenos Aires.</p>
          </div>
          <p className="font-15 mb-0 pt-2"><b>Teléfono</b><br/> +541166719105</p>
          <p className="font-15 mb-0 pt-2"><b>Persona que retirará el pedido</b><br/> Francisco Perez</p>
        </div>
      </div>

      <hr />

      {/* Notas de pedido */}
      <div className="d-flex align-items-center justify-content-between text-black font-15 ">
        <div className="d-flex">
          {/* <i className="bi bi-chat-left-text me-2 fs-5"></i> */}
           <p className="font-15 font-bold mb-0">Notas de pedido</p>
        </div>
        <button className="btn btn-link p-0 font-15 text-black font-medium">Agregar</button>
      </div>
    </div>


     <div>
      
        <form
        >
          <div className="card shadow-none mb-0">
            <div className="card-body rounded bg-light-md px-3 pt-5 pb-5 py-md-4 px-md-5">

              {/* DATOS DE FACTURACIÓN */}
              <div className=" mb-0">

                <h2 className="h3 font-bold mb-4">
                  Datos de entrega
                </h2>

                <div className="row">
                  <div className="col-md-6 mb-3 mb-md-4">
                    <label className="form-label">Nombre *</label>
                    <input type="text" className="form-control" required />
                    <div className="invalid-feedback">
                      Ingresá tu nombre.
                    </div>
                  </div>

                  <div className="col-md-6 mb-3 mb-md-4">
                    <label className="form-label">Apellido *</label>
                    <input type="text" className="form-control" required />
                    <div className="invalid-feedback">
                      Ingresá tu apellido.
                    </div>
                  </div>

                  <div className="col-md-6 mb-3 mb-md-4">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-control" required />
                    <div className="invalid-feedback">
                      Ingresá un email válido.
                    </div>
                  </div>

                  <div className="col-md-6 mb-3 mb-md-4">
                    <label className="form-label">Teléfono *</label>
                    <input type="text" className="form-control" required />
                    <div className="invalid-feedback">
                      Ingresá tu teléfono.
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Calle *</label>
                    <input type="text" className="form-control" required />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label className="form-label">Número *</label>
                    <input type="text" className="form-control" required />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label className="form-label">Depto.</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label className="form-label">Código Postal.</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 pt-3">
                    <label className="d-flex align-items-center gap-2 mb-3">
                      <input type="checkbox" className="form-check-input mt-0" />
                      <p className="mb-0 text-body-secondary">
                        Mi información de facturación y envío es la misma.
                      </p>
                    </label>
                  </div>
                </div>



              </div>

            </div>
          </div>



        </form>
  
      </div>   





    <div className="mt-1">


        {/* BOTÓN FINAL */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mt-md-8">
        <Link to="/cart" className="order-2 order-md-1">
            <small className="bi bi-arrow-left me-1"></small> Regresar a mi Carrito
        </Link>

        <Link
          to="/order-complete"
          className="btn btn-primary btn-sm px-6 order-1 order-md-2 mb-5 mb-md-0 mt-5 mt-md-0 btn-checkout"
        >
          Realizar pago
        </Link>
        </div>


    </div>

    </>
  );
}
