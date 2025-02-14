import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const planets = pgTable("planets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  orderFromSun: integer("order_from_sun").notNull(),
  funFact: text("fun_fact").notNull(),
  color: text("color").notNull(),
  size: integer("size").notNull() // relative size for visualization
});

export const insertPlanetSchema = createInsertSchema(planets).pick({
  name: true,
  description: true,
  imageUrl: true,
  orderFromSun: true,
  funFact: true,
  color: true,
  size: true
});

export type InsertPlanet = z.infer<typeof insertPlanetSchema>;
export type Planet = typeof planets.$inferSelect;
