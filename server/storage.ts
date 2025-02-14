import { planets, type Planet, type InsertPlanet } from "@shared/schema";

export interface IStorage {
  getAllPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
}

export class MemStorage implements IStorage {
  private planets: Map<number, Planet>;

  constructor() {
    this.planets = new Map();
    this.initializePlanets();
  }

  private initializePlanets() {
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
      // Add other planets similarly...
    ];

    initialPlanets.forEach((planet, index) => {
      this.planets.set(index + 1, { ...planet, id: index + 1 });
    });
  }

  async getAllPlanets(): Promise<Planet[]> {
    return Array.from(this.planets.values())
      .sort((a, b) => a.orderFromSun - b.orderFromSun);
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    return this.planets.get(id);
  }
}

export const storage = new MemStorage();
