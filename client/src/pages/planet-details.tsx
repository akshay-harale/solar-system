import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Planet } from "@shared/schema";
import SpaceBackground from "../components/space-background";

export default function PlanetDetails() {
  const [, params] = useRoute("/planet/:id");
  const id = params?.id;

  const { data: planet, isLoading } = useQuery<Planet>({
    queryKey: [`/api/planets/${id}`]
  });

  if (isLoading || !planet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="text-white mb-4">
            <ArrowLeft className="mr-2" /> Back to Solar System
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-black/70 backdrop-blur-sm border-white/20 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={planet.imageUrl} 
                  alt={planet.name}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">{planet.name}</h1>
                <p className="text-xl text-white/90 mb-6">{planet.description}</p>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-bold text-white mb-2">Fun Fact!</h2>
                  <p className="text-white/90">{planet.funFact}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
