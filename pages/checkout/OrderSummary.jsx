import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OrderSummary() {
  return (
    <>
    <div className="card shadow-none border p-3 p-md-5 mb-3">
      {/* Email */}
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-envelope me-2"></i>
        <span>emr23.apps@gmail.com</span>
      </div>

      <hr />

      {/* Retiro en tienda */}
      <div className="d-flex align-items-start mb-3">
        <i className="bi bi-shop me-2 fs-5"></i>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <strong>Retiras en Wandel Maquinarias · Gratis</strong>
            <button className="btn btn-link p-0">Cambiar</button>
          </div>
          <small>
            Av. Dr. Ricardo Balbín 3625, C1430 AAH, Cdad. Autónoma de Buenos Aires
            Lun a Vie. de 9 a 18 hrs.
          </small>
        </div>
      </div>

      <hr />

      {/* Datos de cobranza */}
      <div className="d-flex align-items-start mb-3">
        <i className="bi bi-card-list me-2 fs-5"></i>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <strong>Datos de cobranza</strong>
            <button className="btn btn-link p-0">Cambiar</button>
          </div>
          <div>
            <p className="mb-1">Emilio Román</p>
            <p className="mb-1">Av. Rivadavia 1845</p>
            <p className="mb-1">CP 1706 - hedo</p>
            <p className="mb-1">Morón, Gran Buenos Aires - +541166719105</p>
          </div>
          <p className="mb-0"><strong>Persona que retirará el pedido</strong> Emilio Román</p>
        </div>
      </div>

      <hr />

      {/* Notas de pedido */}
      <div className="d-flex align-items-center">
        <i className="bi bi-chat-left-text me-2 fs-5"></i>
        <button className="btn btn-link p-0">Agregar</button>
      </div>
    </div>

     <div className="card shadow-none border p-3 p-md-5">

        {/* MÉTODO DE PAGO */}
        <div className="mb-5">
        <h2 className="h4">Método de Pago</h2>
        </div>

        <div className="mb-md-4">
        <label className="form-label">Número de tarjeta *</label>
        <input
            type="text"
            className="form-control"
            name="cardNumber"
            required
        />
        <div className="invalid-feedback">
            Número de tarjeta inválido.
        </div>
        </div>

        <div className="row">
        <div className="col-md-8 mb-3">
            <label className="form-label">Titular *</label>
            <input
            type="text"
            className="form-control"
            name="cardHolder"
            required
            />
            <div className="invalid-feedback">
            Ingresá el nombre del titular.
            </div>
        </div>

        <div className="col-md-2 mb-3">
            <label className="form-label">Venc.</label>
            <input
            type="text"
            className="form-control"
            name="expiration"
            required
            />
            <div className="invalid-feedback">
            Formato inválido.
            </div>
        </div>

        <div className="col-md-2 mb-3">
            <label className="form-label">CVC *</label>
            <input
            type="text"
            className="form-control"
            name="cvc"
            required
            />
            <div className="invalid-feedback">
            CVC inválido.
            </div>
        </div>
        </div>


        {/* BOTÓN FINAL */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mt-md-8">
        <Link to="/cart" className="order-2 order-md-1">
            <small className="bi bi-arrow-left me-1"></small> Regresar a mi Carrito
        </Link>

        <button
            type="submit"
            className="btn btn-primary btn-sm rounded-pill px-6 order-1 order-md-2 mb-5 mb-md-0 mt-5 mt-md-0 btn-checkout"
        >
            Realizar pago
        </button>
        </div>


    </div>

    </>
  );
}
