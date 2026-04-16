import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

console.log('Mapa de Derivación: Inicializando...');

window.onerror = (msg, url, line, col, error) => {
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
    <h2>Error en la aplicación</h2>
    <pre>${msg}</pre>
  </div>`;
  return false;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
