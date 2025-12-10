import { useState, useRef } from "react";

export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);

  const mainImageRef = useRef(null);

  const imageList =
    images.length > 0
      ? images
      : [
          "/assets/img/product-detail/detail-1.webp",
          "/assets/img/product-detail/detail-2.webp",
          "/assets/img/product-detail/detail-1.webp",
        ];

  const handleZoomClick = () => {
    setZoomActive(!zoomActive);
    if (!zoomActive && mainImageRef.current) {
      mainImageRef.current.style.transform = "scale(3)";
    } else if (mainImageRef.current) {
      mainImageRef.current.style.transform = "scale(1)";
    }
  };

  const handleMouseMove = (e) => {
    if (!zoomActive || !mainImageRef.current) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const translateX = (container.offsetWidth / 2 - x) * 2;
    const translateY = (container.offsetHeight / 2 - y) * 2;

    mainImageRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(3)`;
  };

  return (
    <div className="wrapper-gallery">
      <div className="badge-discout-in">
        <span className="badge py-1 px-2 bg-warning text-white rounded-1 font-15">
          Mega oferta del mes
        </span>
      </div>

      {/* Thumbnails */}
      <section className="thumbnail">
        {imageList.map((img, index) => (
          <div
            key={img}
            className={`thumbnailBox ${index === activeIndex ? "active" : ""}`}
            onClick={() => {
              setActiveIndex(index);
              setZoomActive(false);
              if (mainImageRef.current) {
                mainImageRef.current.style.transform = "scale(1)";
              }
            }}
          >
            <img src={img} alt="" />
          </div>
        ))}
      </section>

      {/* Main Image */}
      <section
        className="mainImage"
        onClick={handleZoomClick}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={mainImageRef}
          src={imageList[activeIndex]}
          alt=""
          style={{
            transition: "transform 0.2s ease-out",
            cursor: zoomActive ? "zoom-out" : "zoom-in",
          }}
        />
      </section>
    </div>
  );
}
