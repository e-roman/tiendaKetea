// src/components/search/FilterList.jsx
import { useState } from "react";

export default function FilterList({
  items,
  selected,
  onToggle,
  maxVisible = 8
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, maxVisible);

  return (
    <>
      <div className="d-flex flex-column gap-1">
        {visibleItems.map(item => (
          <label
            key={item.value}
            className="form-check font-medium small text-dark d-flex align-items-center"
          >
            <input
              className="form-check-input text-dark me-2"
              type="checkbox"
              checked={selected.includes(item.value)}
              onChange={() => onToggle(item.value)}
            />
            <span>
              {item.label}
              <span className="text-dark ms-1">
                ({item.count})
              </span>
            </span>
          </label>
        ))}
      </div>

      {items.length > maxVisible && (
        <button
          type="button"
          className="btn btn-link p-0 mt-1 font-15"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </>
  );
}
