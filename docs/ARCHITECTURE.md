┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React Client  │ ←────── │  Express Server │ ←────── │   PostgreSQL    │
│   (Frontend)    │         │   (Backend)     │         │   Database      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Technology Stack

- **Frontend**: React + TypeScript
  - State Management: React Query
  - Styling: Tailwind CSS
  - Animations: Framer Motion
  - Routing: Wouter
  - UI Components: Radix UI + shadcn/ui

- **Backend**: Express.js
  - Database ORM: Drizzle
  - API Layer: RESTful endpoints
  - Type Safety: Shared TypeScript types

- **Database**: PostgreSQL
  - Schema Management: Drizzle ORM
  - Type Generation: Drizzle + Zod

## Code Organization

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/        # Page-level components
│   │   ├── lib/          # Utility functions and configurations
│   │   └── App.tsx       # Main application component
├── server/                # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Database operations
│   └── db.ts            # Database connection setup
└── shared/               # Shared types and schemas
    └── schema.ts        # Database schema and types
```

## Key Components Walkthrough

### Database Schema (`shared/schema.ts`)
```typescript
// Planet table definition with all necessary fields
export const planets = pgTable("planets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  orderFromSun: integer("order_from_sun").notNull(),
  funFact: text("fun_fact").notNull(),
  color: text("color").notNull(),
  size: integer("size").notNull()
});
```

### Backend API (`server/routes.ts`)
```typescript
// RESTful endpoints for planet data
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
```

### Frontend Components

#### Solar System Visualization (`components/solar-system.tsx`)
- Interactive visualization of planets
- Uses Framer Motion for animations
- Implements planet orbits and scaling

#### Planet Details (`pages/planet-details.tsx`)
- Detailed view of individual planets
- Responsive layout with image and information
- Animated transitions between views

## Data Flow

1. **Initial Load**
   ```
   Client Request → Express Server → PostgreSQL → Client Render
   ```

2. **Planet Selection**
   ```
   User Click → Route Change → API Request → Database Query → UI Update
   ```

## State Management

- **React Query** handles server state:
  - Automatic caching
  - Background refetching
  - Loading states

Example:
```typescript
const { data: planets, isLoading } = useQuery<Planet[]>({
  queryKey: ["/api/planets"]
});