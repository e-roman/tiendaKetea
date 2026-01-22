import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  {
    id: 1,
    label: "Datos Personales",
    path: "/checkout",
  },
  {
    id: 2,
    label: "Domicilio y Entrega",
    path: "/checkout/entrega",
  },
  {
    id: 3,
    label: "Pago",
    path: "/checkout/pago",
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
                      step.id
                    )}
                  </span>
                </span>

                <span className="stepper-step-label">
                  <span className="label-desktop">{step.label}</span>
                  <span className="label-mobile">
                    {step.id === 1 && "Datos Pesonales"}
                    {step.id === 2 && "Datos de Envío"}
                    {step.id === 3 && "Pago"}
                  </span>
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
