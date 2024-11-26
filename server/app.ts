import { landing } from './routes/landing';
import { serveStatic } from 'hono/bun'
import { Hono } from 'hono';

const app = new Hono();

app.route('/api/landing', landing);
app.get('/api', (c) => c.text('Hello Bun!'));

app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
