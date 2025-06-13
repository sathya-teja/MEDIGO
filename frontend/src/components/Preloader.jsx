import { useEffect, useState, createContext, useContext } from "react";
import styled from "styled-components";
import Loader from "./Loader.jsx";

/* ---------- Context API ---------- */
const LoaderCtx = createContext({ show() {}, hide() {} });

export function PreloaderProvider({ children, minDuration = 600 }) {
  const [visible, setVisible] = useState(true);
  const [mountTime] = useState(Date.now());          // first paint time

  /* hide after window 'load' + minDuration ---------------------------- */
  useEffect(() => {
    const onLoaded = () => {
      const elapsed = Date.now() - mountTime;
      const wait = Math.max(minDuration - elapsed, 0);
      setTimeout(() => setVisible(false), wait);
    };
    window.addEventListener("load", onLoaded);
    return () => window.removeEventListener("load", onLoaded);
  }, [mountTime, minDuration]);

  /* expose imperative helpers ---------------------------------------- */
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

// ---------------- Overlay for full‑screen loader ----------------
const Overlay = styled.div`
  /* full‑screen overlay styles */
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffff;   /* same grey as Loader */
  z-index: 9999;
  transition: opacity 0.4s ease;
`;
