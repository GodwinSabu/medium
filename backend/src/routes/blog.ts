import { Hono } from "hono";
import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { verify } from "hono/jwt";

// Create the main Hono app
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      // @ts-ignore
      c.set("userId", user.id);
        await next();
    } else{
      c.status(403);
      return c.json({
        message: "you are not looged in ",
      });
    }
  } catch (e) {
    console.error(e);
    c.status(403);
    return c.json({
      message: "unauthorized token",
    });
  }
});

blogRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({
      message: "Error creating post",
    });
  }
});

blogRouter.put("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log(body);
    
    const authorId = c.get("userId")

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      message: "Updated post",
      post,
    });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({
      message: "Error updating post",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id:id,
      },
    });

    if (!post) {
      c.status(404);
      return c.json({
        message: "Post not found",
      });
    }

    return c.json(post);
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({
      message: "Error fetching post",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({});

    return c.json(posts);
  } catch (e) {
    c.status(404);
    return c.json({
      message: "error while fecthing all blog post ",
    });
  }
});
