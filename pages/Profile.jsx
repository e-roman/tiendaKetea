import { useState, useEffect, useRef  } from "react";
import { useLocation } from "react-router-dom";

import NavProfile from "@/components/profile/NavProfile";

import AccountAddCardModal from "@/components/Modals/AccountAddCardModal";
import AccountEditCardModal from "@/components/Modals/AccountEditCardModal";
import AccountInvoicetModal from "@/components/Modals/AccountInvoicetModal";

import AccountAddress from "@/components/profile/AccountAddress";
import AccountNotifications from "@/components/profile/AccountNotifications";
import AccountOrders from "@/components/profile/AccountOrders";
import AccountHistoryPayments from "@/components/profile/AccountHistoryPayments";
import AccountNotificaciones from "@/components/profile/AccountNotificaciones";
import AccountSecurity from "@/components/profile/AccountSecurity";
import AccountWhishlist from "@/components/profile/AccountWhishlist";
import AccountPayment from "@/components/profile/AccountPayment";
import PersonalInfo from "@/components/profile/PersonalInfo";

export default function MyProfile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [currentView, setCurrentView] = useState("personalInfo");

  const BREADCRUMB_DATA = {
    personalInfo: { section: "Configuración", title: "Datos Personales" },
    security: { section: "Configuración", title: "Seguridad" },
    notifications: { section: "Configuración", title: "Notificaciones" },

    orders: { section: "Compras", title: "Mis Compras" },
    payments: { section: "Comprobantes", title: "Mis Compras" },
    favorites: { section: "Compras", title: "Favoritos" },
    notificaciones: { section: "Notificaciones", title: "Notificaciones" },

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
      case "payments":
        return <AccountHistoryPayments 
          onOpenInvoice={() => setShowInvoiceModal(true)}
        />;
      case "favorites":
        return <AccountWhishlist />;
      case "notificaciones":
        return <AccountNotificaciones />;
      case "address":
        return <AccountAddress />;
      default:
        return <PersonalInfo />;
    }
  };


  const mobileBtnRef = useRef(null);
useEffect(() => {
  const sidebar = document.getElementById("sidebarNav");
  const btn = mobileBtnRef.current;

  if (!sidebar || !btn) return;

  const onShow = () => btn.classList.add("open");
  const onHide = () => btn.classList.remove("open");

  sidebar.addEventListener("shown.bs.collapse", onShow);
  sidebar.addEventListener("hidden.bs.collapse", onHide);

  return () => {
    sidebar.removeEventListener("shown.bs.collapse", onShow);
    sidebar.removeEventListener("hidden.bs.collapse", onHide);
  };
}, []);




  return (
    <>
    <div className="bg-light">
      {/* HEADER CON BREADCRUMB DINÁMICO */}
      <div className="navbar-dark bg-light">
        <div className="container py-3 content-space-t-lg-1 content-space-b-lg-2">
          <div className="row align-items-center">
            <div className="col d-flex justify-content-between">
              <div className="d-none d-lg-block">
                <h1 className="h2 text-dark font-bold">Mi Cuenta</h1>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-light mb-0">
                  <li className="breadcrumb-item text-dark">
                    {BREADCRUMB_DATA[currentView]?.section || "Mi Cuenta"}
                  </li>
                  <li className="breadcrumb-item text-dark active" aria-current="page">
                    {BREADCRUMB_DATA[currentView]?.title || "Datos Personales"}
                  </li>
                </ol>
              </nav>

              {/*Butotn mobile */}
              <div className="d-block d-lg-none">
                  <div className="d-block d-lg-none">
                  <button
                    ref={mobileBtnRef}
                    className="btn nav-button-mb btn-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarNav"
                    aria-controls="sidebarNav"
                    aria-expanded="false"
                    aria-label="Abrir menú"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="container position-relative space-1 space-md-2 mt-lg-n10">
        <div className="row">

          <div className="col-lg-3">
           <NavProfile currentView={currentView} />
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
            <AccountInvoicetModal onClose={() => setShowInvoiceModal(false)} />
          )}
        </div>
      </div>
    </div>
    </>
  );
}
