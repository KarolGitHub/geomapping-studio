import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
if (mapboxToken) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.crossOrigin = '';
  link.href = `https://api.mapbox.com/styles/v1/mapbox/dark-v11?access_token=${mapboxToken}`;
  document.head.appendChild(link);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
