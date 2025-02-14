import type { Planet } from "@shared/schema";

export const planets: Planet[] = [
  {
    id: 1,
    name: "Mercury",
    description: "The smallest and fastest planet, closest to the Sun!",
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
    orderFromSun: 1,
    funFact: "A year on Mercury is only 88 Earth days!",
    color: "#A0522D",
    size: 38
  },
  // Add other planets...
];
