export default function ButtonSpinner({ loading, loadingText, children }) {
  if (!loading) return children;

  return (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      />
      {loadingText}
    </>
  );
}
