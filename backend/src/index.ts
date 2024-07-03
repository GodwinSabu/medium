import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  // Variables : Variables
}>();

app.route("/api/vi/user", userRouter)
app.route("/api/vi/blog",blogRouter )

app.use('/api/v1/blog/*', async (c, next) => {
	await next()
  })


// Error handling
app.onError((err, c) => {
  console.error(err);
  return c.text("Internal Server Error", 500);
});

export default app;

//tt
