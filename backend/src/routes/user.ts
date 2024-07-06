import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// import { Hono } from 'hono';
import { sign } from "hono/jwt";
import {signupInput} from "@godwinsabu/medium-common"



// Create the main Hono app
 export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  // Variables : Variables
}>();


userRouter.post("/signup", async (c) => {
    try {

      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const body = await c.req.json();
      const{success} = signupInput.safeParse(body)

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
  
  userRouter.post("/signin", async (c) => {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      
      const body = await c.req.json();
      console.log(body);
  
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
  
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    } catch (e) {
      console.error(e);
      c.status(500);
      return c.json({ error: "Error during signin" });
    }
  });