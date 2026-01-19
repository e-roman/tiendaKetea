import { useState } from "react";

export default function FilterList({
  items,
  selected,
  onToggle,
  maxVisible = 8,
}) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded
    ? items
    : items.slice(0, maxVisible);



  return (
    <>
      {visibleItems.map(item => (
        <label key={item.value} className="d-flex gap-2 small">
          <input
            type="checkbox"
            checked={selected.includes(item.value)}
            onChange={() => onToggle(item.value)}
          />
          {item.label} ({item.count})
        </label>
      ))}

      {items.length > maxVisible && (
        <button
          className="btn btn-link p-0 mt-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </>
  );
}
