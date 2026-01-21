// src/components/Produc Detail

import { useEffect } from "react";


export default function ProductSpecificationsBlocks() {


return (

    <>

    {/*!-- Product Description Section --*/}
    <div className="container space-top-2 space-lg-3" id="specifications">
      <div className="row">
        <div className="col-md-6 mb-5 mb-md-0">
          <div className="pe-lg-4">
            <h3 className="h4 font-weight-medium"> Sobre Dolphin S100</h3>
            <p> Dolphin utiliza el flujo de agua multidireccional, que le permite navegar de manera precisa por su piscina.
                El microprocesador avanzado en el robot decide lógicamente qué flujos de agua usar para lograr sus objetivos. 
                El PowerStream le permite al Dolphin que se aferre a las paredes mientras limpia. 
                El resultado es una mayor movilidad y una piscina totalmente limpia. <a href="#" className="font-medium">Descargar manual</a></p>
          </div>
        </div>

        <div className="col-md-6 mb-5 mb-md-0">
          <h3 className="h4 font-weight-medium">Especificaciones técnicas</h3>

          <div className="row">
            <div className="col-sm-6">
              <ul className="text-secondary pl-3 mb-0">
                <li className="pb-1"><span className="text-dark">Metros de la piscina:</span> Hasta 10 Metros</li>
                <li className="pb-1"><span className="text-dark">Longitud del Cable:</span> 15 Metros</li>
                <li className="pb-1"><span className="text-dark">Limpieza de Paredes:</span> Si</li>
                <li className="pb-1"><span className="text-dark">Cepilla línea de flotación:</span> No</li>
              </ul>
            </div>

            <div className="col-sm-6">
              <ul className="text-secondary pl-3 mb-0">
                <li className="pb-1"><span className="text-dark">Ciclo de limpieza:</span> 2 Horas</li>
                <li className="pb-1"><span className="text-dark">Filtración Multicapa:</span> No</li>
                <li className="pb-1"><span className="text-dark">Smartphone APP control:</span> Si</li>
                <li className="pb-1"><span className="text-dark">Motor dual:</span> No</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
   

    <div className="container space-bottom-2 space-bottom-lg-3">
      <div className="row justify-content-lg-between align-items-lg-center">
        <div className="col-lg-5 space-1 space-lg-2">
          <h3 className="font-weight-medium mb-4">Navegación de Prescisión</h3>
          <p>Desarrollado por la tecnología CleverClean™, es impulsado por un avanzado sistema de navegación y software de escaneo. Esto asegura que su piscina se limpia utilizando la ruta más eficiente. </p>
          <p>Este sistema inteligente hace que su robot navegue automáticamente alrededor de los obstáculos y regrese rápidamente a su ruta.</p>
        </div>

        <div className="col-lg-6">
          <div className="bg-img-hero-center h-100 min-height-450 rounded" style={{ backgroundImage: `url("../assets/img/product-detail/0007.jpeg")` }}></div>
        </div>
      </div>

      <div className="row justify-content-lg-between align-items-lg-center space-top-1 space-top-lg-3">
        <div className="col-lg-5 order-lg-2 space-1 space-lg-2">
          <div className="mb-6">
            <h3 className="font-weight-medium mb-4">Filtración fina y ultrafina</h3>
            <p>La aplicación móvil MyDolphin™ Plus pone el control total de su robot directamente en su mano, desde cualquier lugar y en cualquier momento. </p>
            <p>Funciona con nuestra nueva fuente de alimentación conectada a la nube, proporcionando al robot conectividad 24/7 que permite un control remoto avanzado y gestión, servicios dinámicos y notificaciones proactivas. Siempre conectado. Siempre en control.</p>
          </div>
        </div>

        <div className="col-lg-6 order-lg-1">
          <div className="bg-img-hero-center h-100 min-height-450 rounded" style={{ backgroundImage: `url("../assets/img/product-detail/0008.webp")` }}></div>
        </div>
      </div>
    </div>
 {/*!-- End Product Description Section --*/}


    </>
  );
}