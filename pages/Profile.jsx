import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavProfile from "../components/profile/NavProfile";

import AccountAddCardModal from '../components/modals/AccountAddCardModal';
import AccountEditCardModal from "../components/modals/AccountEditCardModal";
import AccountInvoiceReceiptModal from "../components/modals/AccountInvoiceReceiptModal";

import AccountAddress from "../components/profile/AccountAddress";
import AccountNotifications from "../components/profile/AccountNotifications";
import AccountOrders from "../components/profile/AccountOrders";
import AccountSecurity from "../components/profile/AccountSecurity";
import AccountWhishlist from "../components/profile/AccountWhishlist";
import AccountPayment from "../components/profile/AccountPayment";
import PersonalInfo from "../components/profile/PersonalInfo";

export default function MyProfile() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [currentView, setCurrentView] = useState("personalInfo");

  const BREADCRUMB_DATA = {
    personalInfo: { section: "Mi Cuenta", title: "Datos Personales" },
    security: { section: "Mi Cuenta", title: "Seguridad" },
    notifications: { section: "Mi Cuenta", title: "Notificaciones" },

    orders: { section: "Compras", title: "Mis Compras" },
    favorites: { section: "Compras", title: "Favoritos" },

    payment: { section: "Pago", title: "Métodos de Pago" },
    address: { section: "Pago", title: "Dirección" }
  };

  // Actualiza la vista cuando cambia ?view=
  useEffect(() => {
    const view = params.get("view");
    if (view) setCurrentView(view);
  }, [location.search]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "payment":
        return (
          <AccountPayment
            onOpenAddCard={() => setShowAddCard(true)}
            onOpenEditCard={() => setShowEditCard(true)}
            onOpenInvoice={() => setShowInvoiceModal(true)}
          />
        );

      case "personalInfo":
        return <PersonalInfo />;
      case "security":
        return <AccountSecurity />;
      case "notifications":
        return <AccountNotifications />;
      case "orders":
        return <AccountOrders />;
      case "favorites":
        return <AccountWhishlist />;
      case "address":
        return <AccountAddress />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <>
      {/* HEADER CON BREADCRUMB DINÁMICO */}
      <div className="navbar-dark bg-dark">
        <div className="container content-space-1 content-space-b-lg-3">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-none d-lg-block">
                <h1 className="h2 text-white">Mi Cuenta</h1>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-light mb-0">
                  <li className="breadcrumb-item">
                    {BREADCRUMB_DATA[currentView]?.section || "Mi Cuenta"}
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {BREADCRUMB_DATA[currentView]?.title || "Datos Personales"}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="container space-1 space-md-2 mt-lg-n10">
        <div className="row">

          <div className="col-lg-3">
            <NavProfile onSelect={setCurrentView} />
          </div>

          <div className="col-lg-9">{renderView()}</div>

          {/* MODALS */}
          {showAddCard && (
            <AccountAddCardModal onClose={() => setShowAddCard(false)} />
          )}

          {showEditCard && (
            <AccountEditCardModal onClose={() => setShowEditCard(false)} />
          )}

          {showInvoiceModal && (
            <AccountInvoiceReceiptModal onClose={() => setShowInvoiceModal(false)} />
          )}
        </div>
      </div>
    </>
  );
}
