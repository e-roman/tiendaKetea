import { useState } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { Modal } from "bootstrap"; // necesario para cerrar el modal programáticamente

export default function LoginModal() {
  const [step, setStep] = useState("signup");
  const { login } = useAuth();

  // cerrar el modal manualmente al loguearse
  const closeModal = () => {
    const modalEl = document.getElementById("signupModal");
    const modal = Modal.getInstance(modalEl);
    if (modal) modal.hide();
  };

  // acción de login simulada
  const handleLogin = () => {
    login();
    closeModal();
  };

  return (
    <div
      className="modal fade"
      id="signupModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Cerrar */}
          <div className="modal-close">
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">

            {/* LOGIN */}
            {step === "login" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Ingresar</h2>
                  <p>
                    ¿Aún no tienes una cuenta?{" "}
                    <a href="#" className="link" onClick={() => setStep("signup")}>
                      Registrarme
                    </a>
                  </p>
                </div>

                <div className="d-grid gap-2">
                  <a className="btn btn-white btn-lg" href="#" onClick={handleLogin}>
                    Ingresar con Google
                  </a>

                  <a
                    href="#"
                    className="btn btn-primary btn-lg mt-2"
                    onClick={() => setStep("login-email")}
                  >
                    Ingresar con Email
                  </a>
                </div>
              </div>
            )}

            {/* LOGIN EMAIL */}
            {step === "login-email" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Ingresar</h2>
                  <p>
                    ¿Aún no tienes una cuenta?{" "}
                    <a className="link" href="#" onClick={() => setStep("signup")}>
                      Registrarme
                    </a>
                  </p>
                </div>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Tu Email</label>
                    <input type="email" className="form-control form-control-lg" required />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label className="form-label">Contraseña</label>
                      <a
                        href="#"
                        className="form-label-link"
                        onClick={() => setStep("reset-password")}
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <input type="password" className="form-control form-control-lg" required />
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="button"
                      className="btn btn-primary form-control-lg"
                      onClick={handleLogin}
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SIGNUP */}
            {step === "signup" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Registrarse</h2>
                  <p>
                    ¿Ya tenés cuenta?{" "}
                    <a href="#" className="link" onClick={() => setStep("login")}>
                      Iniciar sesión
                    </a>
                  </p>
                </div>

                <div className="d-grid gap-3">
                  <a className="btn btn-white btn-lg" href="#" onClick={handleLogin}>
                    Registrarme con Google
                  </a>

                  <a
                    href="#"
                    className="btn btn-primary btn-lg"
                    onClick={() => setStep("signup-email")}
                  >
                    Registrarme con Email
                  </a>

                  <div className="text-center small pt-4">
                    Al continuar aceptás nuestros <a href="#">Términos y Condiciones</a>
                  </div>
                </div>
              </div>
            )}

            {/* SIGNUP EMAIL */}
            {step === "signup-email" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Registrarme</h2>
                  <p>
                    ¿Ya tienes una cuenta?{" "}
                    <a href="#" className="link" onClick={() => setStep("login")}>
                      Ingresar
                    </a>
                  </p>
                </div>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Tu email</label>
                    <input type="email" className="form-control form-control-lg" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control form-control-lg" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" className="form-control form-control-lg" required />
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="button"
                      className="btn btn-primary form-control-lg"
                      onClick={handleLogin}
                    >
                      Registrarme
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* RESET PASSWORD */}
            {step === "reset-password" && (
              <div>
                <div className="text-center mb-7">
                  <h2>¿Olvidaste tu contraseña?</h2>
                  <p className="font-14">Ingresá tu email y te enviaremos instrucciones.</p>
                </div>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Tu email</label>
                    <input type="email" className="form-control form-control-lg" required />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary form-control-lg">
                      Enviar
                    </button>
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
