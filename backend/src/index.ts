import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// import { Hono } from 'hono';
import { sign } from "hono/jwt";



// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  // Variables : Variables
}>();

app.use('/api/v1/blog/*', async (c, next) => {
	await next()
  })

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});
app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
	where:{
		email:body.email
	}
  })
  if (!user) {
	c.status(403);
	return c.json({ error: "user not found" });
}

const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})	

app.get("/api/v1/blog", (c) => {
  // const id = c.req.param('id');
  // console.log(id);
  return c.text(`get blog rousssste with id: `);
});

app.get("/api/v1/blog", async (c) => {
  const body = await c.req.json();
  // Process the blog post data
  return c.json({ message: "blog created", data: body });
});

app.put("/api/v1/blog/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  // Update the blog post with the given id
  return c.json({ message: `blog ${id} updated`, data: body });
});

// Error handling
app.onError((err, c) => {
  console.error(err);
  return c.text("Internal Server Error", 500);
});

export default app;

//tt
