import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import useIsMobile from "@/hooks/useIsMobile";

/* =============================
  CONTENIDO DE CADA PESTAÑA
============================= */
function DescriptionContent({ details }) {
  return (
    <div className="product-info-description">
      {details.description.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      {details.sections.map(section => (
        <div key={section.title} className="mt-4">
          <h3 className="h5 font-bold d-flex align-items-center gap-2 mb-3">
            {section.icon && <i className={`bi ${section.icon} text-primary`} />}
            {section.title}
          </h3>
          <ul className="product-info-list">
            {section.items.map((item, i) => (
              <li key={i}>
                {item.label && <span className="font-bold">{item.label}{item.text ? ": " : ""}</span>}
                {item.text}
                {item.subitems && (
                  <ul className="mt-1">
                    {item.subitems.map(s => <li key={s}>{s}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {(details.includes.length > 0 || details.notIncluded.length > 0) && (
        <div className="row g-3 mt-2">
          {details.includes.length > 0 && (
            <div className="col-md-6">
              <div className="product-info-box h-100">
                <p className="font-bold mb-2">Qué incluye</p>
                <ul className="list-unstyled mb-0">
                  {details.includes.map(x => (
                    <li key={x} className="d-flex gap-2 mb-1">
                      <i className="bi bi-check-circle-fill text-success" />{x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {details.notIncluded.length > 0 && (
            <div className="col-md-6">
              <div className="product-info-box h-100">
                <p className="font-bold mb-2">No incluye</p>
                <ul className="list-unstyled mb-0">
                  {details.notIncluded.map(x => (
                    <li key={x} className="d-flex gap-2 mb-1">
                      <i className="bi bi-x-circle text-muted" />{x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {details.tips.length > 0 && (
        <div className="product-info-tip mt-4">
          <p className="font-bold mb-2">
            <i className="bi bi-info-circle me-2" />Consejos prácticos
          </p>
          <ul className="mb-0">
            {details.tips.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function SpecsContent({ details }) {
  return (
    <div className="row g-4">
      {details.specs.map(group => (
        <div key={group.group} className={details.specs.length > 1 ? "col-lg-6" : "col-12"}>
          <p className="font-bold mb-2">{group.group}</p>
          <table className="table product-specs-table mb-0">
            <tbody>
              {group.items.map(item => (
                <tr key={item.label}>
                  <th scope="row">{item.label}</th>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function ResourcesContent({ details }) {
  return (
    <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
      {details.resources.map(r => (
        <li key={r.label}>
          <a href={r.url} className="product-resource-link" download>
            <i className="bi bi-file-earmark-pdf fs-4" />
            <span className="flex-grow-1">
              <span className="d-block font-bold text-dark">{r.label}</span>
              <small className="text-muted">{r.type}</small>
            </span>
            <i className="bi bi-download" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function FaqContent({ details }) {
  return (
    <Accordion flush className="product-faq">
      {details.faq.map((item, i) => (
        <Accordion.Item eventKey={String(i)} key={item.q}>
          <Accordion.Header>{item.q}</Accordion.Header>
          <Accordion.Body>{item.a}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

function WarrantyContent({ details }) {
  return (
    <div className="d-flex gap-3 align-items-start">
      <i className="bi bi-shield-check text-primary" style={{ fontSize: "2.5rem" }} />
      <div>
        {details.warrantyMonths && (
          <p className="h5 font-bold mb-1">{details.warrantyMonths} meses de garantía oficial</p>
        )}
        <p className="mb-0">{details.warrantyText}</p>
      </div>
    </div>
  );
}

/* =============================
  PESTAÑAS (desktop) / ACORDEÓN (mobile)
  Una pestaña sin contenido no se muestra
============================= */
export default function ProductInfoTabs({ details }) {
  const isMobile = useIsMobile(768);

  const tabs = [
    {
      key: "description",
      label: "Descripción",
      show: details.description.length > 0 || details.sections.length > 0,
      Content: DescriptionContent
    },
    { key: "specs", label: "Especificaciones", show: details.specs.some(g => g.items.length), Content: SpecsContent },
    { key: "resources", label: "Recursos y descargas", show: details.resources.length > 0, Content: ResourcesContent },
    { key: "faq", label: "Preguntas frecuentes", show: details.faq.length > 0, Content: FaqContent },
    { key: "warranty", label: "Garantía y soporte", show: true, Content: WarrantyContent }
  ].filter(t => t.show);

  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find(t => t.key === active) || tabs[0];

  if (isMobile) {
    return (
      <Accordion defaultActiveKey={tabs[0].key} className="product-info-accordion">
        {tabs.map(tab => (
          <Accordion.Item eventKey={tab.key} key={tab.key}>
            <Accordion.Header>{tab.label}</Accordion.Header>
            <Accordion.Body>
              <tab.Content details={details} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }

  return (
    <>
      <ul className="nav product-info-tabs mb-4" role="tablist">
        {tabs.map(t => (
          <li className="nav-item" key={t.key} role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={t.key === current.key}
              className={`nav-link ${t.key === current.key ? "active" : ""}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      <div role="tabpanel">
        <current.Content details={details} />
      </div>
    </>
  );
}
