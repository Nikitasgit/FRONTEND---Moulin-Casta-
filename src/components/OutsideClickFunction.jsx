import { useEffect } from "react";
export const outsideClick = (ref, setHook) => {
  useEffect(() => {
    let handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setHook(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [ref]);
};
