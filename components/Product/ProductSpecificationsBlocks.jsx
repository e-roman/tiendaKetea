// src/components/Produc Detail

import { useEffect } from "react";


export default function ProductSpecificationsBlocks() {


return (

    <>

    {/*!-- Product Description Section --*/}
    <div className="container space-top-2 space-lg-3">
      <div className="row">
        <div className="col-md-6 mb-5 mb-md-0">
          <div className="pe-lg-4">
            <h3 className="h5 font-weight-medium"><i className="bi bi-truck"></i>   Métodos de Envío <br/></h3>
            <p>Actualmente contamos con envío a domicilio a través de Elogística (Capital y GBA) demora entre 3 a 5 días hábiles y Ocasa para el resto del país entre los 4 y 9 días al interior del país y con puntos de retiro PICKIT entre los 6 a 11 días hábiles (vas a recibir un mail cuando puedas retirar tu compra).</p>
          </div>
        </div>

        <div className="col-md-6 mb-5 mb-md-0">
          <h3 className="h5 font-weight-medium">Material and care</h3>

          <div className="row">
            <div className="col-sm-6">
              <ul className="text-secondary pl-3 mb-0">
                <li className="py-1">Main: 100% Cotton</li>
                <li className="py-1">Soft twill</li>
                <li className="py-1">Ribbed, diagonal pattern</li>
                <li className="py-1">Slightly structured</li>
              </ul>
            </div>

            <div className="col-sm-6">
              <ul className="text-secondary pl-3 mb-0">
                <li className="py-1">One size fits all</li>
                <li className="py-1">Imported</li>
                <li className="py-1">Product color: Dark greenish</li>
                <li className="py-1">Product code: #1465791</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
   


    <div className="container">
      <div className="row justify-content-lg-between align-items-lg-center">
        <div className="col-lg-5 space-1 space-lg-2">
          <h3 className="font-weight-medium mb-4">A casual cap with Front originals style</h3>
          <p>This men's hat has low-key Trefoil style with an embroidered logo on the front.</p>
          <p>Made of washed canvas, the hat has a crushable, packable design and an adjustable back strap so you can personalize the fit.</p>
        </div>

        <div className="col-lg-6">
          <div className="bg-img-hero-center h-100 min-height-450 rounded" style={{ backgroundImage: `url("../assets/img/750x750/img3.jpg")` }}></div>
        </div>
      </div>

      <div className="row justify-content-lg-between align-items-lg-center space-top-2 space-top-lg-3">
        <div className="col-lg-5 order-lg-2 space-1 space-lg-2">
          <div className="mb-6">
            <h3 className="font-weight-medium mb-4">A casual cap with Front originals style</h3>
            <p>This men's hat has low-key Trefoil style with an embroidered logo on the front.</p>
            <p>Made of washed canvas, the hat has a crushable, packable design and an adjustable back strap so you can personalize the fit.</p>
          </div>
        </div>

        <div className="col-lg-6 order-lg-1">
          <div className="bg-img-hero-center h-100 min-height-450 rounded" style={{ backgroundImage: `url("../assets/img/750x750/img4.jpg")` }}></div>
        </div>
      </div>
    </div>
 {/*!-- End Product Description Section --*/}


    </>
  );
}