import { useRef } from "react";

export function useScrollToRef<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const scrollToRef = (behavior: ScrollBehavior = "smooth") => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior });
    }
  };

  return { ref, scrollToRef };
}
