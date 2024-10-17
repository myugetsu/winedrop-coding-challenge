import Fastify from "fastify";
import { wineRoutes } from "./routes/wineRoutes";
import * as dotenv from 'dotenv';

dotenv.config();

console.log('Database URL:', process.env.DATABASE_URL);


(async () => {

  const fastify = Fastify({ logger: true });

  // Register the wine routes
  fastify.register(wineRoutes);

  fastify.get("/hello", async () => {
    return { hello: "world" };
  });

  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
  }
})();
