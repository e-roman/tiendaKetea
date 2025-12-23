export default function Suscribe() {
  return (
    <>
    <div className="bg-light">
      <div className="container content-space-2">
        <div className="w-md-75 w-lg-60 text-center mx-md-auto">
          <div className="row justify-content-lg-between">
           
            <div className="mb-5">
              <h1 className="font-bold">Suscribirse</h1>              
              <p>Recibí todas nuestras Ofertas y Recomendaciones</p>
            </div>

            <form>
              <div className="input-card input-card-pill shadow-none input-card-sm border mb-3 p-1 input-subscribe">
                <div className="input-card-form">
                  <label htmlFor="subscribeForm" className="form-label visually-hidden">Enter email</label>
                  <input type="text" className="form-control" id="subscribeForm" placeholder="Enter email"  />
                </div>
                <button type="button" className="btn btn-primary btn-sm rounded-pill">Suscribirse</button>
              </div>
            </form>

            <p className="small">Puedes darte de baja en cualquier momento. <a href="#">Politica de Privacidad</a></p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}