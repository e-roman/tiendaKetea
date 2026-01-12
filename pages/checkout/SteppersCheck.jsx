import { useLocation, useNavigate } from "react-router-dom";


const steps = [
  {
    id: 1,
    label: "Mi Carrito",
    path: "/cart",
    icon: "bi-cart"
  },
  {
    id: 2,
    label: "Datos de envío",
    path: "/checkout",
    icon: "bi-truck"
  },
  {
    id: 3,
    label: "Método de pago",
    path: "/checkout/payment",
    icon: "bi-credit-card"
  },
];


export default function SteppersCheck() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="stepper">
      <ol className="stepper-steps">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li key={step.id} className="stepper-step">
              <button
                type="button"
                className={`stepper-step-button
                  ${isComplete ? "complete" : ""}
                  ${isActive ? "active" : ""}`}
                onClick={() => {
                  if (isComplete) navigate(step.path);
                }}
                disabled={!isComplete}
              >
                <span className="stepper-step-indicator">
                  <span className="stepper-step-indicator-text">
                    {isComplete ? (
                      <i className="bi bi-check" />
                    ) : (
                      <i className={`bi ${step.icon}`} />
                    )}
                  </span>
                </span>

                <span className="stepper-step-label">
                  {step.label}
                </span>
              </button>

              {index < steps.length - 1 && (
                <span className="stepper-step-connector" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

