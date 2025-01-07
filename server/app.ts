import { JwtTokenExpired, JwtTokenInvalid } from 'hono/utils/jwt/types'
import { jwtMiddleware } from './middlewares/jwtMiddleware'
import { refreshToken } from './middlewares/refreshToken'
import { cronerJobCreator } from './utils/croner-job'
import { HTTPException } from 'hono/http-exception'
import { feedDayWithSlots } from './utils/day'
import type { JwtVariables } from 'hono/jwt'
import { checkout } from './routes/checkout'
import { reserve } from './routes/reserve'
import { serveStatic } from 'hono/bun'
import { except } from 'hono/combine'
import { auth } from './routes/auth'
import { logger } from 'hono/logger'
import { user } from './routes/user'
import { home } from './routes/home'
import { Hono } from 'hono'
import 'dotenv/config'


type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

const apiRoutes = app.basePath('/api')
  .all(logger())
  .use('/*', except(['/api/auth', 'api/checkout-session'], refreshToken, jwtMiddleware))
  .route('/auth', auth)
  .route('/user', user)
  .route('/days', home)
  .route('/checkout-session', checkout)
  .route('/reserve', reserve)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

cronerJobCreator('0 0 * * * *', async () => {
  await feedDayWithSlots()
  console.log('here croner at 00:00')
})

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ success: false, err }, err.status)
  }
  if (err instanceof JwtTokenInvalid || JwtTokenExpired) return c.json({ success: false, err }, 401)
  return c.json({ success: false, err }, 500)
})

export default app
export type ApiRoutes = typeof apiRoutes;

