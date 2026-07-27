export default function Skeleton({ className = "", style, ...props }) {
  return <span className={`skeleton ${className}`} style={style} {...props} />;
}
