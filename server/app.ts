import { HTTPException } from 'hono/http-exception';
// import { landing } from './routes/landing';
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
    return err.getResponse();
  }
  return c.json({ message: err.message }, 500);
});

export type ApiRoutes = typeof app;

