import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/session/$sessionId')({
  loader: async ({ params }) => {
    return params.sessionId;
  },
});
