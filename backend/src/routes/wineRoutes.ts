import { FastifyInstance } from "fastify";
import { wineController } from "../controllers/wineController";

export const wineRoutes = async (app: FastifyInstance) => {
  app.get("/api/wines/best-selling", {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          metric: { type: 'string', enum: ['totalRevenue', 'totalBottles', 'totalOrders'] },
          searchQuery: { type: 'string' },
        },
        required: [],
      },
    },
    handler: wineController.getBestSellingWines,
  });
};
