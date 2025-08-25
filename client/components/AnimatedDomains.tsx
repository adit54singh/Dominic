import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedDomains() {
  const techDomains = [
    "Software Development",
    "Data Science & Analytics", 
    "UI/UX Design",
    "Digital Marketing",
    "Content Creation",
    "Machine Learning",
    "Cybersecurity",
    "Mobile App Development",
    "Cloud Computing",
    "Blockchain Technology",
    "Web Development",
    "Game Development",
    "DevOps Engineering",
    "Product Management",
    "Technical Writing",
  ];

  const upcomingNonTechDomains = [
    "Fashion Designing",
    "Travel & Tourism",
    "Fine Arts & Painting",
    "Music Production",
    "Photography",
    "Interior Design",
    "Culinary Arts",
    "Event Planning",
    "Creative Writing",
    "Dance & Choreography",
    "Theater & Drama",
    "Jewelry Design",
    "Graphic Arts",
    "Film Making",
    "Sustainable Living",
  ];

  const [currentTechDomains, setCurrentTechDomains] = useState<string[]>([]);
  const [currentNonTechDomains, setCurrentNonTechDomains] = useState<string[]>([]);
  const [techVisible, setTechVisible] = useState(true);
  const [nonTechVisible, setNonTechVisible] = useState(false);

  useEffect(() => {
    const showRandomTechDomains = () => {
      const shuffled = [...techDomains].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 7); // Always show 7 for hexagon grid
      setCurrentTechDomains(selected);
      setTechVisible(true);

      setTimeout(() => {
        setTechVisible(false);
      }, 3000);
    };

    const showRandomNonTechDomains = () => {
      const shuffled = [...upcomingNonTechDomains].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 7); // Always show 7 for hexagon grid
      setCurrentNonTechDomains(selected);
      setNonTechVisible(true);

      setTimeout(() => {
        setNonTechVisible(false);
      }, 3000);
    };

    // Initial display
    showRandomTechDomains();

    // Stagger the non-tech domains
    const nonTechTimeout = setTimeout(() => {
      showRandomNonTechDomains();
    }, 1500);

    // Set intervals for continuous animation
    const techInterval = setInterval(showRandomTechDomains, 8000);
    const nonTechInterval = setInterval(showRandomNonTechDomains, 8000);

    return () => {
      clearTimeout(nonTechTimeout);
      clearInterval(techInterval);
      clearInterval(nonTechInterval);
    };
  }, []);

  // Hexagon component with James Webb telescope mirror styling
  const HexagonMirror = ({ 
    domain, 
    index, 
    color, 
    isNonTech = false 
  }: { 
    domain: string; 
    index: number; 
    color: string;
    isNonTech?: boolean;
  }) => {
    return (
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.3,
          rotateY: -90,
        }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotateY: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.6,
            ease: "easeOut",
          }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.8,
          rotateY: 90,
          transition: {
            delay: (6 - index) * 0.05,
            duration: 0.4,
          }
        }}
        whileHover={{ 
          scale: 1.1,
          rotateZ: 5,
          transition: { duration: 0.3 }
        }}
        className="relative group perspective-1000"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Hexagonal mirror */}
        <div 
          className="hexagon-mirror relative w-32 h-32 cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}25)`,
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            border: `2px solid ${color}40`,
            boxShadow: `0 0 20px ${color}30, inset 0 0 20px ${color}20`,
          }}
        >
          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${color}30, transparent)`,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
            <div className="text-[10px] font-bold text-white mb-1 leading-tight">
              {domain}
            </div>
            <div className="text-[8px] text-white/70">
              {isNonTech ? "Coming Soon" : `${Math.floor(Math.random() * 500) + 100}+ learners`}
            </div>
          </div>

          {/* Reflection effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${color}40 50%, transparent 70%)`,
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Connecting lines (like James Webb telescope) */}
        {index < 6 && (
          <motion.div
            className="absolute -right-4 top-1/2 w-8 h-0.5 opacity-30"
            style={{ backgroundColor: color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
          />
        )}
      </motion.div>
    );
  };

  // Hexagon grid arrangement (James Webb telescope mirror pattern)
  const HexagonGrid = ({ domains, colors, isNonTech = false }: { 
    domains: string[]; 
    colors: string[];
    isNonTech?: boolean;
  }) => {
    return (
      <div className="relative flex items-center justify-center min-h-[500px]">
        {/* Center hexagon */}
        <div className="absolute z-10">
          <HexagonMirror 
            domain={domains[0]} 
            index={0} 
            color={colors[0]}
            isNonTech={isNonTech}
          />
        </div>
        
        {/* Surrounding hexagons in James Webb pattern */}
        {domains.slice(1, 7).map((domain, index) => {
          const angle = (index * 60) * (Math.PI / 180); // 60 degrees apart
          const radius = 120; // Distance from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={`${domain}-${index}`}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <HexagonMirror 
                domain={domain} 
                index={index + 1} 
                color={colors[(index + 1) % colors.length]}
                isNonTech={isNonTech}
              />
            </div>
          );
        })}

        {/* Background cosmic effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 3}%`,
                top: `${15 + (i % 3) * 20}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  };

  const techColors = [
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
  ];

  const nonTechColors = [
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#EC4899", // Pink
    "#F97316", // Orange
    "#84CC16", // Lime
    "#06B6D4", // Cyan
    "#8B5CF6", // Purple
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent leading-tight">
            Learning Domains
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
            Explore infinite possibilities like the James Webb telescope explores space
          </p>
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-32 h-32 mx-auto mb-8"
            style={{
              background: "conic-gradient(from 0deg, #8B5CF6, #06B6D4, #F59E0B, #EF4444, #8B5CF6)",
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
        </motion.div>

        {/* Tech Domains Section */}
        <div className="mb-32">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Tech Domains Mirror Array
          </motion.h2>

          <div className="relative">
            <AnimatePresence mode="wait">
              {techVisible && currentTechDomains.length > 0 && (
                <motion.div
                  key={`tech-${currentTechDomains.join()}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <HexagonGrid 
                    domains={currentTechDomains} 
                    colors={techColors}
                    isNonTech={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Non-Tech Domains Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"
          >
            Creative Domains Constellation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-gray-400 mb-16 text-xl"
          >
            ✨ Coming Soon - Where creativity meets technology
          </motion.p>

          <div className="relative">
            <AnimatePresence mode="wait">
              {nonTechVisible && currentNonTechDomains.length > 0 && (
                <motion.div
                  key={`nontech-${currentNonTechDomains.join()}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <HexagonGrid 
                    domains={currentNonTechDomains} 
                    colors={nonTechColors}
                    isNonTech={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <motion.p
            animate={{ 
              opacity: [0.5, 1, 0.5],
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-gray-400 text-lg"
          >
            Domains refresh like telescope calibrations... 🔭
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
