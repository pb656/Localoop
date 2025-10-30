import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ab8570d3/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-ab8570d3/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm email since email server hasn't been configured
    });

    if (error) {
      console.error("Sign up error:", error);
      return c.json({ message: error.message }, 400);
    }

    // Store user data with initial LoopCredits
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      loopCredits: 100, // Welcome bonus
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, userId: data.user.id });
  } catch (error: any) {
    console.error("Sign up error:", error);
    return c.json({ message: error.message || "Sign up failed" }, 500);
  }
});

// Get user data
app.get("/make-server-ab8570d3/user/:userId", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const userId = c.req.param("userId");
    
    if (user.id !== userId) {
      return c.json({ message: "Forbidden" }, 403);
    }

    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json(userData);
  } catch (error: any) {
    console.error("Get user error:", error);
    return c.json({ message: error.message || "Failed to get user" }, 500);
  }
});

// Purchase LoopCredits
app.post("/make-server-ab8570d3/purchase-credits", async (c) => {
  try {
    const { userId, credits, packageId } = await c.req.json();

    const userData = await kv.get(`user:${userId}`);
    
    if (!userData) {
      return c.json({ message: "User not found" }, 404);
    }

    // Update user's LoopCredits
    userData.loopCredits = (userData.loopCredits || 0) + credits;
    
    await kv.set(`user:${userId}`, userData);

    // Log transaction
    const transactionId = `tx:${userId}:${Date.now()}`;
    await kv.set(transactionId, {
      userId,
      type: "purchase",
      credits,
      packageId,
      timestamp: new Date().toISOString(),
    });

    return c.json({ success: true, newBalance: userData.loopCredits });
  } catch (error: any) {
    console.error("Purchase credits error:", error);
    return c.json({ message: error.message || "Failed to purchase credits" }, 500);
  }
});

Deno.serve(app.fetch);