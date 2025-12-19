import { useState } from "react";

export default function QuantityControl({
  item,
  onIncrease,
  onDecrease,
  min = 1,
}) {
  const [loading, setLoading] = useState(false);

  const handleIncrease = () => {
    setLoading(true);
    setTimeout(() => {
      onIncrease(item);
      setLoading(false);
    }, 300);
  };

  const handleDecrease = () => {
    if (item.quantity <= min) return;
    setLoading(true);
    setTimeout(() => {
      onDecrease(item);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="border rounded btn-i-d d-flex align-items-center justify-content-between w-100">
      <button
        type="button"
        className="btn btn-icon btn-xs px-1 rounded-circle"
        onClick={handleDecrease}
        disabled={loading || item.quantity <= min}
      >
        <h4 className="btn-icon__inner font-normal mb-0">-</h4>
      </button>

      <div className="w-25 d-flex justify-content-center">
        {loading ? (
          <div
            className="spinner-border spinner-border-sm text-secondary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <input
            className="form-control lh-1 border-0 rounded p-0 text-center"
            type="text"
            value={item.quantity}
            readOnly
          />
        )}
      </div>

      <button
        type="button"
        className="btn btn-icon btn-xs px-1 rounded-circle"
        onClick={handleIncrease}
        disabled={loading}
      >
        <h4 className="btn-icon__inner font-normal mb-0">+</h4>
      </button>
    </div>
  );
}
