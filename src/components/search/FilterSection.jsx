export default function FilterSection({ title, children }) {
  return (
    <div className="mb-4">
      <p className="fw-semibold mb-2">{title}</p>
      {children}
    </div>
  );
}
