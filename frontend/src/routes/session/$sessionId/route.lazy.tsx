import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/session/$sessionId')({
  component: RouteComponent,
});

function RouteComponent() {
  const sessionID = Route.useLoaderData();

  return (
    <section className='w-full p-4 relative'>
      <div>hello</div>
    </section>
  );
}
