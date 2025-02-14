git clone <repository-url>
cd solar-system-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your PostgreSQL database connection string:
```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
```

4. Initialize the database:
```bash
npm run db:push
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

The application will be running with hot-reload enabled for development.

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend
- `/shared` - Shared types and schemas
- `/client/src/components` - React components
- `/client/src/pages` - Page components
- `/client/src/lib` - Utility functions and configurations

## Database Schema

The application uses a PostgreSQL database with the following schema:

```typescript
planets {
  id: serial (primary key)
  name: text
  description: text
  imageUrl: text
  orderFromSun: integer
  funFact: text
  color: text
  size: integer
}