import ProductInfoTabs from "./ProductInfoTabs";

export default function ProductSpecificationsBlocks({ details }) {
  return (
    <>
      {/* INFORMACIÓN DEL PRODUCTO */}
      <div className="container space-top-2 space-lg-3" id="specifications">
        <div className="row">
          <div className="col-12">
            <ProductInfoTabs details={details} />
          </div>
        </div>
      </div>

      {/* BLOQUES DESTACADOS (imagen + texto) */}
      <div className="container space-bottom-2 space-bottom-lg-3">
        {details.featureBlocks.map((block, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={block.title}
              className={`row justify-content-lg-between align-items-lg-center ${i > 0 ? "space-top-1 space-top-lg-3" : ""}`}
            >
              <div className={`col-lg-5 space-1 space-lg-2 ${reversed ? "order-lg-2" : ""}`}>
                <h3 className="font-weight-medium mb-4">{block.title}</h3>
                {block.text.map((p, j) => <p key={j}>{p}</p>)}
              </div>

              <div className={`col-lg-6 ${reversed ? "order-lg-1" : ""}`}>
                <div
                  className="bg-img-hero-center h-100 min-height-450 rounded"
                  style={{ backgroundImage: `url("${block.image}")` }}
                />
              </div>
            </div>
          );
        })}

        <div id="SimilarsProfucts"></div>
      </div>
    </>
  );
}
