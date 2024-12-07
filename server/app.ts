import { HTTPException } from 'hono/http-exception';
import { serveStatic } from 'hono/bun'
import { Hono } from 'hono';
import { auth } from './routes/auth';

export const app = new Hono()
  .basePath('/api')
  .route('/auth', auth)
  .get('*', serveStatic({ root: '/frontend/dist' }))
  .get('*', serveStatic({ path: '/index.html' }));

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }
  return c.json({ message: err.message }, 500);
});

export type ApiRoutes = typeof app;

