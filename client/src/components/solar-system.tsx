import { motion } from "framer-motion";
import { useLocation } from "wouter";
import type { Planet } from "@shared/schema";
import { playSelect } from "../lib/sounds";

interface Props {
  planets: Planet[];
}

export default function SolarSystem({ planets }: Props) {
  const [, setLocation] = useLocation();

  const handlePlanetClick = (id: number) => {
    playSelect();
    setLocation(`/planet/${id}`);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 w-32 h-32 -ml-16 -mt-16">
        <motion.div
          className="w-full h-full rounded-full bg-yellow-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className="absolute left-1/2 top-1/2 cursor-pointer"
          style={{
            width: `${planet.orderFromSun * 100}px`,
            height: `${planet.orderFromSun * 100}px`,
            marginLeft: `-${planet.orderFromSun * 50}px`,
            marginTop: `-${planet.orderFromSun * 50}px`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: planet.orderFromSun * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          onClick={() => handlePlanetClick(planet.id)}
        >
          <motion.div
            className="absolute"
            style={{
              width: `${planet.size / 2}px`,
              height: `${planet.size / 2}px`,
              backgroundColor: planet.color,
              borderRadius: "50%",
              filter: "brightness(1.2)",
            }}
            whileHover={{
              scale: 1.2,
              filter: "brightness(1.5)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}