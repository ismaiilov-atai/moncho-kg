import { insertUserSchema } from '../db/schema/user_schema';
import { usersTable } from '../db/schema/user_schema';
import { HTTPException } from 'hono/http-exception';
import { eq } from 'drizzle-orm';
import type { z } from 'zod';
import { Hono } from 'hono'
import { db } from '../db';

type NewUser = z.infer<typeof insertUserSchema>

export const landing = new Hono()
	.get('/', c => {
		return c.json({ isAuth: true })
	})
	.post('/', async c => {
		const body = await c.req.json();
		const validUser = insertUserSchema.parse(body)
		const createdUser = await insertUser(validUser);
		return c.json(createdUser);
	})
	.delete('/:id{[0-9]+}', async c => {
		const { id } = c.req.param();
		const deletedID = await deleteUser(Number(id));
		if (deletedID.length <= 0) throw new HTTPException(404, { message: `User with #${id} does not exist!` });
		return c.json(deletedID);
	});


export const insertUser = async (user: NewUser): Promise<NewUser> => {
	const newUser = await db
		.insert(usersTable)
		.values(user)
		.returning();

	return newUser[0];
}

export const deleteUser = async (id: number): Promise<{ id: number }[]> => {
	return await db
		.delete(usersTable)
		.where(eq(usersTable.id, id))
		.returning({ id: usersTable.id })
}