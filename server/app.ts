import { refreshToken } from './middlewares/refreshToken'
import { HTTPException } from 'hono/http-exception'
import type { JwtVariables } from 'hono/jwt'
import { serveStatic } from 'hono/bun'
import { except } from 'hono/combine'
import { auth } from './routes/auth'
import { logger } from 'hono/logger'
import { user } from './routes/user'
import { jwt } from 'hono/jwt'
import { Hono } from 'hono'
import 'dotenv/config'


type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

const apiRoutes = app.basePath('/api')
  .all(logger())
  .use('/*', except('/api/auth', refreshToken, (c, next) => {
    const jwtMiddleware = jwt({
      secret: process.env.JWT_SECRET || '',
    })
    return jwtMiddleware(c, next)
  }))
  .route('/user', user)
  .route('/auth', auth)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }
  return c.json({ message: err.message }, 500);
});

export default app;
export type ApiRoutes = typeof apiRoutes;

