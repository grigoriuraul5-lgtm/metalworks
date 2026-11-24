import { renderToString } from 'react-dom/server';
import { getRoutes, NOT_FOUND_ROUTE } from './routes.jsx';

export { getRoutes, NOT_FOUND_ROUTE };
export * as site from './siteConfig.js';
export { POSTS } from './content/blog.js';
export { KRAFT_PRODUCTS } from './data/kraftFeedProducts.js';
export { SOMIERE_SPECS, SOMIERE_FAQ, SOMIERE_PATH, SOMIERE_PDF } from './pages/SomierePage.jsx';
export { DEBITARE_FAQ, DEBITARE_PATH } from './pages/DebitarePage.jsx';

export function render(route) {
  const { Component } = route;
  return renderToString(<Component {...(route.props || {})} />);
}
