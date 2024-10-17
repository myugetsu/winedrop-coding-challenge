import { FastifyReply, FastifyRequest } from "fastify";
import { getBestSellingWines } from "../services/wineService";

export const wineController = {
  // Get best-selling wines
  async getBestSellingWines(req: FastifyRequest, reply: FastifyReply) {
    const { metric = "totalRevenue", searchQuery = "" } = req.query as { metric: string; searchQuery: string };

    try {
      const wines = await getBestSellingWines(metric, searchQuery);
      return reply.send(wines);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "An error occurred while fetching wines." });
    }
  },
};

