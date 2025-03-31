import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ThemeProvider } from './components/theme-provider';
import { routeTree } from './routeTree.gen';
import ReactDOM from 'react-dom/client';
import i18n from './i18n';
import React from 'react';
import './index.css';
// Import the generated route tree
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
  context: { queryClient, translation: undefined },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { t } = useTranslation();
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n} defaultNS={'translation'}>
          <ThemeProvider defaultTheme='system' storageKey='theme'>
            <RouterProvider router={router} context={{ translation: t }} />
          </ThemeProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
