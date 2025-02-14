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
      {
        name: "Earth",
        description: "Our home planet, the only known planet with life!",
        imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
        orderFromSun: 3,
        funFact: "Earth is the only planet not named after a god or goddess!",
        color: "#4169E1",
        size: 100
      },
      {
        name: "Mars",
        description: "The Red Planet, named after the Roman god of war!",
        imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
        orderFromSun: 4,
        funFact: "Mars has the largest volcano in the solar system - Olympus Mons!",
        color: "#CD5C5C",
        size: 53
      },
      {
        name: "Jupiter",
        description: "The largest planet in our solar system!",
        imageUrl: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3",
        orderFromSun: 5,
        funFact: "Jupiter's Great Red Spot is a giant storm that's been raging for over 400 years!",
        color: "#DAA520",
        size: 300
      },
      {
        name: "Saturn",
        description: "The planet famous for its beautiful rings!",
        imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
        orderFromSun: 6,
        funFact: "Saturn's rings are made mostly of ice and rock, and they're only about 30 feet thick!",
        color: "#F4A460",
        size: 250
      },
      {
        name: "Uranus",
        description: "The ice giant that spins on its side!",
        imageUrl: "https://images.unsplash.com/photo-1614314107768-6018061e5e3c",
        orderFromSun: 7,
        funFact: "Uranus rotates sideways, making its seasons last for 20 Earth years!",
        color: "#87CEEB",
        size: 160
      },
      {
        name: "Neptune",
        description: "The windiest planet in our solar system!",
        imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
        orderFromSun: 8,
        funFact: "Neptune's winds can reach speeds of 1,200 mph, the fastest in the solar system!",
        color: "#4169E1",
        size: 155
      }
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