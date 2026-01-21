import React, { useState } from "react";
import { Link } from "react-router-dom";

// Subcomponents
const SearchBar = ({ value, onChange }) => (
  <div className="pb-3 mb-2 pb-md-5 mb-md-4">
    <form className="input-group input-group-merge">
      <div className="input-group-prepend input-group-text">
        <i className="bi-search"></i>
      </div>
      <input
        type="search"
        className="form-control"
        placeholder="Buscar pedido por número de orden"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  </div>
);

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "entregados", label: "Entregados" },
    { id: "pendientes", label: "Pendientes" },
    { id: "cancelados", label: "Cancelados" }
  ];

  return (
    <ul className="nav nav-segment tabs-buyers nav-fill mb-4 mb-md-7" role="tablist">
      {tabs.map((tab) => (
        <li key={tab.id} className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

const OrderCard = ({ order }) => (
  <li className="card card-bordered shadow-none mb-3 p-3 p-md-0">
    <div className="card-body p-1 p-md-5">
      <div className="row">
        <div className="col-6 col-md mb-3 mb-md-0">
          <small className="card-subtitle font-medium mb-0">Total</small>
          <small className="text-dark fw-semi-bold">{order.total}</small>
        </div>

        <div className="col-6 col-md mb-3 mb-md-0">
          <small className="card-subtitle font-medium mb-0">Nombre</small>
          <small className="text-dark fw-semi-bold">{order.nombre}</small>
        </div>

        <div className="col-6 col-md">
          <small className="card-subtitle font-medium mb-0">N.º orden</small>
          <small className="text-dark fw-semi-bold">{order.id}</small>
        </div>

        <div className="col-6 col-md">
          <small className="card-subtitle font-medium mb-0">Fecha</small>
          <small className="text-dark fw-semi-bold">{order.fecha}</small>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-8">
          <h5>¡Pedido entregado!</h5>

          <div className="row gx-2 gx-md-10 my-4 my-md-0">
            {order.imgs.map((src, idx) => (
              <div className="col" key={idx}>
                <img className="img-fluid" src={src} alt="Producto" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-grid gap-2">
            <button className="btn btn-white btn-sm">
              <i className="bi-basket small me-2"></i> Ver pedido
            </button>
            <button className="btn btn-white btn-sm">
              <i className="bi-truck small me-2"></i> Código de seguimiento
            </button>
            <button className="btn btn-white btn-sm">
              <i className="bi-arrow-counterclockwise small me-2"></i> Devolver
            </button>
            <button className="btn btn-primary btn-sm">Volver a comprar</button>
          </div>
        </div>
      </div>
    </div>
  </li>
);

const EmptyState = ({ text }) => (
  <div className="text-center content-space-1">
    <img className="avatar avatar-xl mb-3" src="../assets/svg/illustrations/empty-cart.svg" alt="Sin datos" />
    <p className="card-text">{text}</p>
    <Link className="btn btn-primary btn-sm px-4" to="/">Ir a comprar</Link>
  </div>
);

// Main component
export default function OrdersModule() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("entregados");
  const [orders] = useState([
    {
      id: "555888111",
      total: "$2.520.00",
      nombre: "Carlos Gomez",
      fecha: "12 mayo, 2024",
      imgs: [
        "../assets/img/products/dolphin-s100.png",
        "../assets/img/products/bomba-calor-inverter-1.png"
      ]
    },
    {
      id: "456853648",
      total: "$103.00",
      nombre: "Francisco Perez",
      fecha: "30 abril, 2023",
      imgs: [
        "../assets/img/products/granulado.png",
        "../assets/img/products/valvula-6-vias-vulcano.png",
        "../assets/img/products/kit-limpieza-piscina-completo.png"
      ]
    }
  ]);

  const filteredOrders = orders.filter((o) =>
    o.nombre.toLowerCase().includes(search.toLowerCase()) ||
    o.id.includes(search)
  );

  return (
    <div className="card border shadow-none p-2 p-lg-5">
      <SearchBar value={search} onChange={setSearch} />

      <div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "entregados" && (
          <>
            {filteredOrders.length > 0 ? (
              <ul className="list-unstyled mb-5">
                {filteredOrders.map((o) => (
                  <OrderCard key={o.id} order={o} />
                ))}
              </ul>
            ) : (
              <EmptyState text="No se encontraron pedidos" />
            )}
          </>
        )}

        {activeTab === "pendientes" && (
          <EmptyState text="No hay pedidos pendientes" />
        )}

        {activeTab === "cancelados" && (
          <EmptyState text="No hay pedidos cancelados" />
        )}
      </div>
    </div>
  );
}
