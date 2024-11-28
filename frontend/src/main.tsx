import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  NotFoundRoute,
  RouterProvider,
  createRouter,
} from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { Route as rootRoute } from './routes/__root';
// Create a client
const queryClient = new QueryClient(); //?

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => '404 Not Found!',
});

// Create a new router instance
const router = createRouter({
  routeTree,
  notFoundRoute,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
