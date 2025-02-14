import { planets, type Planet, type InsertPlanet } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getAllPlanets(): Promise<Planet[]> {
    const planetList = await db.select().from(planets)
      .orderBy(planets.orderFromSun);
    return planetList;
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    const [planet] = await db.select().from(planets)
      .where(eq(planets.id, id));
    return planet || undefined;
  }

  // Initialize database with sample planets
  async initializePlanets() {
    const initialPlanets: InsertPlanet[] = [
      {
        name: "Mercury",
        description: "The smallest and fastest planet, closest to the Sun!",
        imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
        orderFromSun: 1,
        funFact: "A year on Mercury is only 88 Earth days!",
        color: "#A0522D",
        size: 38
      },
      {
        name: "Venus",
        description: "The hottest planet in our solar system!",
        imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
        orderFromSun: 2,
        funFact: "Venus spins backward compared to most planets!",
        color: "#DEB887",
        size: 95
      },
      // Add other planets...
    ];

    for (const planet of initialPlanets) {
      const existing = await db.select()
        .from(planets)
        .where(eq(planets.name, planet.name));

      if (existing.length === 0) {
        await db.insert(planets).values(planet);
      }
    }
  }
}

export const storage = new DatabaseStorage();

// Initialize planets when the file is imported
storage.initializePlanets().catch(console.error);