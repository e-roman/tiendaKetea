import { useState } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { Modal } from "bootstrap"; // necesario para cerrar el modal programáticamente

export default function LoginModal() {
  const [step, setStep] = useState("login");
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

            {/* LOGIN EMAIL */}
            {step === "login" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Ingresar</h2>
                </div>

                <form>
                  <div className="mb-3">
                    {/* <label className="form-label">Email</label> */}
                    <input type="email" placeholder="Escribe aquí tu email" className="form-control form-control-lg" required />
                  </div>

                  <div className="mb-3">
                    <input type="password" placeholder="Escribe aquí tu contraseña" className="form-control form-control-lg" required />
                  </div>

                    <div className="d-flex justify-content-end">
                      {/* <label className="form-label">Contraseña</label> */}
                      <a
                        href="#"
                        className="form-label-link"
                        onClick={() => setStep("reset-password")}
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>


                  <div className="d-grid my-4">
                    <button
                      type="button"
                      className="btn btn-primary form-control-lg"
                      onClick={handleLogin}
                    >
                      Ingresar
                    </button>
                  </div>

                  <div className="text-center">
                    <p>
                      ¿Aún no tienes una cuenta?{" "}
                      <a className="link" href="#" onClick={() => setStep("signup")}>
                        Registrarme
                      </a>
                    </p>
                  </div>

                  <div className="text-center py-3">
                    <span className="u-divider u-divider--xs u-divider--text mb-4">OR</span>
                  </div>

                  <div className="d-flex gap-3 mb-3">
                    <a className="btn btn-white w-100 btn-lg" href="#" onClick={handleLogin}>
                      <i class="bi bi-facebook"></i> Ingresar con Facebook
                    </a>
                    <a className="btn btn-white w-100 btn-lg" href="#" onClick={handleLogin}>
                      <i class="bi bi-google"></i> Ingresar con Google
                    </a>
                  </div>



                </form>
              </div>
            )}

            {/* SIGNUP EMAIL */}
            {step === "signup" && (
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
                    <label className="form-label">Email</label>
                    <input type="email" placeholder="Escribe aquí tu email" className="form-control form-control-lg" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" placeholder="Escribe aquí tu contraseña" className="form-control form-control-lg" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" placeholder="Escribe nuevamente tu contraseña" className="form-control form-control-lg" required />
                  </div>

                  <div className="d-grid my-4">
                    <button
                      type="button"
                      className="btn btn-primary form-control-lg"
                      onClick={handleLogin}
                    >
                      Registrarme
                    </button>
                  </div>

                  <div className="text-center">
                    <p>
                      ¿Ya tienes una cuenta? {" "}
                      <a className="link" href="#" onClick={() => setStep("login")}>
                        Ingresar
                      </a>
                    </p>
                  </div>

                  <div className="text-center py-3">
                    <span className="u-divider u-divider--xs u-divider--text mb-4">OR</span>
                  </div>

                  <div className="d-flex gap-3 mb-3">
                    <a className="btn btn-white w-100 btn-lg" href="#" onClick={handleLogin}>
                      <i class="bi bi-facebook"></i> Ingresar con Facebook
                    </a>
                    <a className="btn btn-white w-100 btn-lg" href="#" onClick={handleLogin}>
                      <i class="bi bi-google"></i> Ingresar con Google
                    </a>
                  </div>


                  
                </form>
              </div>
            )}

            {/* RESET PASSWORD */}
            {step === "reset-password" && (
              <div>
                <div className="text-center mb-7">
                  <h2>Recuperar Contraseña</h2>
                  <p className="font-14">Ingresá tu email y te enviaremos instrucciones.</p>
                </div>

                <form>
                  <div className="mb-3">
                    <input type="email" className="form-control form-control-lg" placeholder="Escribe aquí tu email" required />
                  </div>

                  <div className="d-grid">
                    <a className="btn btn-primary form-control-lg" href="#" onClick={() => setStep("login")}>
                      Enviar
                    </a>
                  </div>

                  <div className="text-center py-4">
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
