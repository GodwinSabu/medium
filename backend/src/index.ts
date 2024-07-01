import { Hono } from 'hono';

// Create the main Hono app
const app = new Hono();

app.post('/api/v1/signup', (c) => {
	return c.text('signup route');
});

app.post('/api/v1/signin', (c) => {
	return c.text('signin route');
});

app.get('/api/v1/blog', (c) => {
	// const id = c.req.param('id');
	// console.log(id);
	return c.text(`get blog rousssste with id: `);
});

app.get('/api/v1/blog', async (c) => {
	const body = await c.req.json();
	// Process the blog post data
	return c.json({ message: 'blog created', data: body });
});

app.put('/api/v1/blog/:id', async (c) => {
	const id = c.req.param('id');
	const body = await c.req.json();
	// Update the blog post with the given id
	return c.json({ message: `blog ${id} updated`, data: body });
});

// Error handling
app.onError((err, c) => {
	console.error(err);
	return c.text('Internal Server Error', 500);
});

export default app;



//tt