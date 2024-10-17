import Fastify from "fastify";
import { wineRoutes } from "./routes/wineRoutes";
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {

  const fastify = Fastify({ logger: true });

  // Register the wine routes
  fastify.register(wineRoutes);

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
  }
})();
