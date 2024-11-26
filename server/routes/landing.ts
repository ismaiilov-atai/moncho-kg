import {Hono} from 'hono'


export const landing = new Hono();

landing.get('/', c => {
	return c.json({ isAuth: true})
})
