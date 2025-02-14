import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <motion.div
      className="fixed inset-0 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1464802686167-b939a6910659')",
          opacity: 0.3
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
    </motion.div>
  );
}
