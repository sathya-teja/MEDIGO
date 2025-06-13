import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AppContextProvider from './context/AppContext.jsx';
import { PreloaderProvider } from './components/Preloader.jsx';   // ← add this
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PreloaderProvider >           {/* ← wrap everything */}
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </PreloaderProvider>
    </BrowserRouter>
  </StrictMode>
);
