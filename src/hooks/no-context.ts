import { useEffect } from "react";

export const useNoContext = () => {
  useEffect(() => {
    if (import.meta.env.DEV) return;
    const listener = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", listener);
    return () => {
      document.removeEventListener("contextmenu", listener);
    };
  }, []);
};
