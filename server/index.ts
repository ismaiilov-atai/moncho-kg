import { app } from './app'
import 'dotenv/config'

Bun.serve({
  fetch: app.fetch
});

console.log('server running');
