import { HTTPException } from 'hono/http-exception';
import { landing } from './routes/landing';
import { serveStatic } from 'hono/bun'
import { Hono } from 'hono';

export const app = new Hono()
  .basePath('/api')
  .route('/landing', landing)
  .get('*', serveStatic({ root: './frontend/dist' }))
  .get('*', serveStatic({ path: './frontend/dist/index.html' }));

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ message: err.message }, 500);
});

export type ApiRoutes = typeof app;

