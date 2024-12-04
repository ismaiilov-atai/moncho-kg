import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';
import i18n from './i18n';

import { I18nextProvider } from 'react-i18next';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { Toaster } from './components/ui/toaster';
// Create a client
const queryClient = new QueryClient(); //?

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
