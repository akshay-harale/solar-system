import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/planets", async (_req, res) => {
    const planets = await storage.getAllPlanets();
    res.json(planets);
  });

  app.get("/api/planets/:id", async (req, res) => {
    const planet = await storage.getPlanet(parseInt(req.params.id));
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.json(planet);
  });

  const httpServer = createServer(app);
  return httpServer;
}
