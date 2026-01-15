export default function PageLoader({ visible }) {
  if (!visible) return null;

  return (
    <div className="page-loader">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
}
