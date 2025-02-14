import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import type { Planet } from "@shared/schema";
import { playSelect } from "../lib/sounds";

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    playSelect();
    setLocation(`/planet/${planet.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden bg-black/70 backdrop-blur-sm border-white/20 hover:border-white/40 transition-colors">
        <div className="relative aspect-video">
          <img
            src={planet.imageUrl}
            alt={planet.name}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 50%, ${planet.color}90)`
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
            {planet.name}
          </h3>
          <p className="text-white/90 text-lg leading-relaxed">
            {planet.description}
          </p>
          <div className="mt-4 bg-white/10 rounded-lg p-3">
            <p className="text-white/80 text-sm font-medium">
              Order from Sun: #{planet.orderFromSun}
            </p>
          </div>
          <motion.div
            className="mt-4 text-sm font-medium text-white/60"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            Click to learn more!
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}