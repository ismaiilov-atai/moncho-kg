import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { I18nextProvider } from 'react-i18next';
import ReactDOM from 'react-dom/client';
import i18n from './i18n';
import React from 'react';
import './index.css';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './components/theme-provider';
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

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
        <ThemeProvider defaultTheme='system' storageKey='theme'>
          <RouterProvider router={router} />
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
