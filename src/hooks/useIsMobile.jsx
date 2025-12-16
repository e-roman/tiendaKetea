// src/hooks/useMediaQuery.js
import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint) {
  const query = `(max-width: ${breakpoint}px)`;
  const [matches, setMatches] = useState(
    typeof window !== "undefined"
      ? window.matchMedia(query).matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
