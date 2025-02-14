import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SpaceBackground from "../components/space-background";
import SolarSystem from "../components/solar-system";
import type { Planet } from "@shared/schema";

export default function Home() {
  const { data: planets, isLoading } = useQuery<Planet[]>({
    queryKey: ["/api/planets"]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-4">
        <Card className="w-full max-w-4xl mx-auto p-6">
          <Skeleton className="h-[400px] w-full" />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
          Our Solar System
        </h1>
        <Card className="bg-black/70 backdrop-blur-sm border-white/20">
          <div className="p-6">
            <SolarSystem planets={planets || []} />
          </div>
        </Card>
      </div>
    </div>
  );
}
