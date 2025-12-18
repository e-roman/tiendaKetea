import { useState, useRef } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { Modal } from "bootstrap";

export default function Login() {
  const [step, setStep] = useState("login");
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
    const modal = Modal.getInstance(modalEl);
    if (modal) modal.hide();
  };

  // ---------- LOGIN ----------
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const form = loginFormRef.current;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidatedLogin(true);
      return;
    }

    login();
    closeModal();
  };

  // ---------- SIGNUP ----------
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const form = signupFormRef.current;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidatedSignup(true);
      return;
    }

    // Si es válido → registramos
    login();
    closeModal();
  };

  // ---------- RESET PASSWORD ----------
  const handleResetSubmit = (e) => {
    e.preventDefault();
    const form = resetFormRef.current;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidatedReset(true);
      return;
    }

    // Ir a login luego de resetear
    setStep("login");
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

          <div className="modal-body">

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
                    <a className="form-label-link" href="#" onClick={() => setStep("reset-password")}>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary form-control-lg">
                      Ingresar
                    </button>
                  </div>

                  <div className="text-center my-3">
                    <p className="mb-0">O</p>
                  </div>

                  <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-white btn-border form-control-lg">
                      <img src="../assets/svg/brands/google-icon.svg" width={20} className="mr-1" /> Ingresar con Google
                    </button>
                  </div>


                  <div className="text-center mt-5">
                    <p>
                      ¿Aún no tienes una cuenta?{" "}
                      <a href="#" className="link" onClick={() => setStep("signup")}>
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
                    <button type="submit" className="btn btn-primary form-control-lg">
                      Registrarme
                    </button>
                  </div>

                  <div className="text-center my-3">
                    <p className="mb-0">O</p>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-white btn-border form-control-lg">
                      <img src="../assets/svg/brands/google-icon.svg" width={20} className="mr-1" /> Registrarme con Google
                    </button>
                  </div>



                  <div className="text-center mt-7">
                  <p>
                    ¿Ya tienes una cuenta?{" "}
                    <a href="#" className="link" onClick={() => setStep("login")}>
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
                    <button type="submit" className="btn btn-primary form-control-lg">
                      Enviar
                    </button>
                  </div>

                  <div className="text-center mt-5 pb-4">
                    <p>
                      ¿Recuerdas tu contraseña?{" "}
                      <a href="#" className="link" onClick={() => setStep("login")}>
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
  );
}
