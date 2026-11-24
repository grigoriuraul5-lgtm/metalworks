import React from 'react';
import ReactDOM from 'react-dom/client';
import { matchRoute } from './routes.jsx';
import './index.css';
import './scrollReveal';
import './parallax';

const route = matchRoute(window.location.pathname);
const { Component } = route;
const app = (
  <React.StrictMode>
    <Component {...(route.props || {})} />
  </React.StrictMode>
);

const rootEl = document.getElementById('root');
// Paginile sunt pre-generate ca HTML (pentru Google și motoarele AI);
// React doar „preia" HTML-ul existent. În `npm run dev` pornește de la zero.
if (rootEl.firstElementChild) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}
