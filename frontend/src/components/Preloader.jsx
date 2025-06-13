import { useEffect, useState, createContext, useContext } from "react";
import styled from "styled-components";
import Loader from "./Loader.jsx";

/* ---------- Context API ---------- */
const LoaderCtx = createContext({ show() {}, hide() {} });

export function PreloaderProvider({ children, minDuration = 600 }) {
  const [visible, setVisible] = useState(true);
  const [mountTime] = useState(Date.now()); // time of first render

  /* Improved loader hiding logic */
  useEffect(() => {
    const fallback = setTimeout(() => {
      setVisible(false);
    }, minDuration);

    const onLoaded = () => {
      clearTimeout(fallback);
      const elapsed = Date.now() - mountTime;
      const wait = Math.max(minDuration - elapsed, 0);
      setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      onLoaded();
    } else {
      window.addEventListener("load", onLoaded);
    }

    return () => window.removeEventListener("load", onLoaded);
  }, [mountTime, minDuration]);

  /* expose optional show/hide controls */
  const api = {
    show: () => setVisible(true),
    hide: () => setVisible(false),
  };

  return (
    <LoaderCtx.Provider value={api}>
      {visible && (
        <Overlay role="status" aria-label="Loading">
          <Loader />
        </Overlay>
      )}
      {children}
    </LoaderCtx.Provider>
  );
}

export const usePreloader = () => useContext(LoaderCtx);

/* ---------------- full-screen overlay loader styles ---------------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffff;
  z-index: 9999;
  transition: opacity 0.4s ease;
`;
