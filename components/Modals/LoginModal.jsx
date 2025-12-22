import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { Modal } from "bootstrap";

export default function Login() {
  
const [loading, setLoading] = useState(false);
const [step, setStep] = useState("login");
const [direction, setDirection] = useState("forward");

const safeSetStep = (nextStep, e) => {
  if (e) e.preventDefault();
  if (loading) return;

  setDirection(
    step === "signup" && nextStep === "login" ? "back" : "forward"
  );

  setStep(nextStep);
};

  const { login } = useAuth();

  // Referencias a formularios
  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);
  const resetFormRef = useRef(null);

  const [validatedLogin, setValidatedLogin] = useState(false);
  const [validatedSignup, setValidatedSignup] = useState(false);
  const [validatedReset, setValidatedReset] = useState(false);

  // cerrar modal
const closeModal = () => {
  const modalEl = document.getElementById("signupModal");
  if (!modalEl) return;

  const modal = Modal.getOrCreateInstance(modalEl);
  modal.hide();
};

  // ---------- LOGIN ----------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = loginFormRef.current;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidatedLogin(true);
      return;
    }

    setLoading(true);

    // Simulación de request
    setTimeout(() => {
      login();
      setLoading(false);
      closeModal();
    }, 1000);
  };

  // ---------- SIGNUP ----------
const handleSignupSubmit = async (e) => {
  e.preventDefault();
  const form = signupFormRef.current;

  if (!form.checkValidity()) {
    e.stopPropagation();
    setValidatedSignup(true);
    return;
  }

  setLoading(true);

  setTimeout(() => {
    login();
    setLoading(false);
    closeModal();
  }, 1000);
};


  // ---------- RESET PASSWORD ----------
const handleResetSubmit = (e) => {
  e.preventDefault();
  if (loading) return;

  const form = resetFormRef.current;

  if (!form.checkValidity()) {
    e.stopPropagation();
    setValidatedReset(true);
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    setStep("login");
  }, 1000);
};


  return (
    <div
      className="modal fade modal-style-xs"
      id="signupModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-close">
            <button className="btn-close" type="button" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body modal-log">
           <div
  className={`auth-step auth-step--${step}`}
  data-direction={direction}
>
            {/* LOGIN */}
            {step === "login" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Ingresar</h2>
                </div>

                <form
                  ref={loginFormRef}
                  noValidate
                  className={`needs-validation ${validatedLogin ? "was-validated" : ""}`}
                  onSubmit={handleLoginSubmit}
                >
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Escribe aquí tu email"
                      required
                    />
                    <div className="invalid-feedback">Ingresá un email válido.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Escribe aquí tu contraseña"
                      required
                    />
                    <div className="invalid-feedback">Ingresá tu contraseña.</div>
                  </div>

                  <div className="d-flex justify-content-end mb-4">
                    <a
                      className="form-label-link"
                      href="#"
                      onClick={(e) => safeSetStep("reset-password", e)}
                    >
                      ¿Olvidaste tu contraseña?
                    </a>

                  </div>

                  <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary form-control-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            />
                          </>
                        ) : (
                          "Ingresar"
                        )}
                      </button>
                  </div>

                  <div className="text-center my-3">
                    <p className="divider-text mb-0">O</p>
                  </div>

                  <div className="d-grid mb-4">
                    <button type="button" className="btn btn-white btn-border form-control-lg" disabled={loading}>
                      <img src="../assets/svg/brands/google-icon.svg" width={20} className="me-1" alt="Google" /> Ingresar con Google
                    </button>
                  </div>


                  <div className="text-center mt-5">
                    <p>
                      ¿Aún no tienes una cuenta?{" "}
                      <a
                        href="#"
                        className="link"
                        onClick={(e) => safeSetStep("signup", e)}
                      >
                        Registrarme
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* SIGNUP */}
            {step === "signup" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Registrarme</h2>
                </div>

                <form
                  ref={signupFormRef}
                  noValidate
                  className={`needs-validation ${validatedSignup ? "was-validated" : ""}`}
                  onSubmit={handleSignupSubmit}
                >
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Escribe aquí tu email"
                      required
                    />
                    <div className="invalid-feedback">Ingresá un email válido.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Escribe aquí tu contraseña"
                      required
                    />
                    <div className="invalid-feedback">Ingresá una contraseña.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirmar contraseña</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Escribe nuevamente tu contraseña"
                      required
                    />
                    <div className="invalid-feedback">Confirmá la contraseña.</div>
                  </div>

                  <div className="d-grid mt-6">
                    <button
                      type="submit"
                      className="btn btn-primary form-control-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        "Registrarme"
                      )}
                    </button>
                  </div>

                  <div className="text-center my-4">
                    <p className="divider-text mb-0">O</p>
                  </div>

                  <div className="d-grid">
                    <button type="button" className="btn btn-white btn-border form-control-lg" disabled={loading}>
                      <img src="../assets/svg/brands/google-icon.svg" width={20} className="me-1" alt="Google" /> Registrarme con Google
                    </button>
                  </div>



                  <div className="text-center mt-7">
                  <p>
                    ¿Ya tienes una cuenta?{" "}
                    <a
                      href="#"
                      className="link"
                      onClick={(e) => safeSetStep("login", e)}
                    >
                      Ingresar
                    </a>
                  </p>
                  </div>
                  

                </form>
              </div>
            )}

            {/* RESET PASSWORD */}
            {step === "reset-password" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Recuperar contraseña</h2>
                  <p className="font-14">Ingresá tu email y te enviaremos instrucciones.</p>
                </div>

                <form
                  ref={resetFormRef}
                  noValidate
                  className={`needs-validation ${validatedReset ? "was-validated" : ""}`}
                  onSubmit={handleResetSubmit}
                >
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Escribe aquí tu email"
                      required
                    />
                    <div className="invalid-feedback">Ingresá un email válido.</div>
                  </div>

                  <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary form-control-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                          </>
                        ) : (
                          "Enviar"
                        )}
                    </button>
                  </div>

                  <div className="text-center mt-5 pb-4">
                    <p>
                      ¿Recuerdas tu contraseña?{" "}
                        <a
                          href="#"
                          className="link"
                      onClick={(e) => safeSetStep("login", e)}
                        >
                          Ingresar
                        </a>
                    </p>
                  </div>
                </form>
              </div>
            )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
