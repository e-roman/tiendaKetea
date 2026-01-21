import { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";

export default function DiscountMethod() {

  return (
    <div
      className="modal fade"
      id="paymentsMethods"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog m-0 w-100 modal-xl modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-close">
            <button className="btn-close" type="button" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body p-3 p-md-3">

                <div className="payment-methods">

                {/* Tabs métodos */}
                {/* <div className="payment-tabs">
                    <button className="active">Pago Nube <span>10% OFF</span></button>
                    <button>Cuotas</button>
                    <button>Mercado Pago</button>
                    <button>MODO</button>
                    <button>NAVE</button>
                </div> */}

                {/* Tarjetas de crédito */}
                <section className="payment-section pt-0">
                    <h4 className="pb-2">Tarjetas de crédito</h4>

                    <div className="card shadow-none border">
                        <div className="card-body py-3 px-3">
                            <h5 className="payment-total pb-2">
                                Total en 1 pago: <span className="font-medium">$1.249.000</span> con todas las tarjetas.
                            </h5>

                            <div className="installments d-md-flex">
                            <div className="installment d-md-flex py-2 px-3 rounded-1 bg-light">
                                <div className="col1-pay"><span className="font-bold">2</span> cuotas de <span className="font-medium">$624.500</span> sin interés</div>
                                <div className="font-14">CFT: 0,00% | TEA: 0,00%</div>
                                <div className="installment-total"><span className="font-bold text-dark pe-2">Total</span> $1.249.000</div>
                            </div>

                            <div className="installment d-md-flex py-2 px-3 rounded-1">
                                <div className="col1-pay"><span className="font-bold">3</span> cuotas de <span className="font-medium">$416.333,33</span> sin interés</div>
                                <div className="font-14">CFT: 0,00% | TEA: 0,00%</div>
                                <div className="installment-total"><span className="font-bold text-dark pe-2">Total</span> $1.249.000</div>
                            </div>

                            <div className="installment d-md-flex py-2 px-3 rounded-1 bg-light">
                                <div className="col1-pay"><span className="font-bold">6</span> cuotas de <span className="font-medium">$208.166,66</span> sin interés</div>
                                <div className="font-14">CFT: 0,00% | TEA: 0,00%</div>
                                <div className="installment-total"><span className="font-bold text-dark pe-2">Total</span> $1.249.000</div>
                            </div>
                            </div>


                            <div className="card-logos mt-4">
                            <img src="../assets/img/cards/visa.svg" alt="Visa" />
                            <img src="../assets/img/cards/mastercard.svg" alt="Mastercard" />
                            <img src="../assets/img/cards/amex.svg" alt="Amex" />
                            <img src="../assets/img/cards/argencard.svg" alt="argencard"/>
                            <img src="../assets/img/cards/naranja.svg" alt="naranja" />
                            <img src="../assets/img/cards/cencosud.svg" alt="cencosud" />
                            <img src="../assets/img/cards/nativa.svg" alt="Nativa" />
                            <img src="../assets/img/cards/cabal.svg" alt="Cabal" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Débito */}
                <section className="payment-section">
                    <h4 className="pb-2">Tarjetas de débito</h4>
                    <div className="card shadow-none border">
                        <div className="card-body py-3 px-3">
                            <div className="card-logos mb-3">
                            <img src="../assets/img/cards/visa.svg" alt="Visa" />
                            <img src="../assets/img/cards/mastercard.svg" alt="Mastercard" />
                            <img src="../assets/img/cards/cabal.svg" alt="Cabal" />
                            </div>

                            <h5 className="payment-total">
                                Total: <span className="font-medium">$1.249.000</span>
                            </h5>
                        </div>
                    </div>
                </section>

                {/* Transferencia */}
                <section className="payment-section pb-0">
                    <h4 className="pb-2">Transferencia o depósito</h4>
                    <div className="card shadow-none border">
                        <div className="card-body py-3 px-3">
                            <div className="card-logos">
                            <img src="../assets/img/cards/banelco.svg" alt="banelco" />
                            <img src="../assets/img/cards/link.svg" alt="link" />
                            <img src="../assets/img/cards/provincia.svg" alt="provincia" />
                            </div>

                            <p className="discount mt-2  text-dark py-2">
                                <span className="font-bold">10% de descuento</span> pagando con Transferencia o depósito
                            </p>

                            <div className="payment-total">
                                <h4 className="mb-0"><del className="pe-2 text-dark">$1.249.000</del> <span className="font-medium">$1.124.100</span></h4>
                            </div>

                            <small className="text-dark">
                            El descuento se aplicará sobre el precio del producto (sin envío).
                            </small>
                        </div>
                    </div>

                </section>

                </div>


          </div>


        </div>
      </div>
    </div>
  );
}
