import { useState, useEffect, useMemo } from "react";
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
  const [currentNonTechDomains, setCurrentNonTechDomains] = useState<string[]>(
    [],
  );
  const [techVisible, setTechVisible] = useState(true);
  const [nonTechVisible, setNonTechVisible] = useState(false);

  useEffect(() => {
    const showRandomTechDomains = () => {
      const shuffled = [...techDomains].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.floor(Math.random() * 3) + 5); // 5-7 domains
      setCurrentTechDomains(selected);
      setTechVisible(true);

      setTimeout(() => {
        setTechVisible(false);
      }, 2000);
    };

    const showRandomNonTechDomains = () => {
      const shuffled = [...upcomingNonTechDomains].sort(
        () => 0.5 - Math.random(),
      );
      const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 4); // 4-5 domains
      setCurrentNonTechDomains(selected);
      setNonTechVisible(true);

      setTimeout(() => {
        setNonTechVisible(false);
      }, 2000);
    };

    // Initial display
    showRandomTechDomains();

    // Stagger the non-tech domains to appear after tech domains
    const nonTechTimeout = setTimeout(() => {
      showRandomNonTechDomains();
    }, 1200);

    // Set intervals for continuous animation with faster refresh
    const techInterval = setInterval(showRandomTechDomains, 6000);
    const nonTechInterval = setInterval(showRandomNonTechDomains, 6000);

    return () => {
      clearTimeout(nonTechTimeout);
      clearInterval(techInterval);
      clearInterval(nonTechInterval);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 relative">
      {/* Optimized background particles - reduced count and complexity */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            style={{
              left: `${20 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-24 pb-12 px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Learning Domains
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-6 font-light">
            Discover endless possibilities in tech and beyond
          </p>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          />
        </motion.div>

        {/* Tech Domains Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
          >
            Tech Domains
          </motion.h2>

          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {techVisible && currentTechDomains.length > 0 && (
                <motion.div
                  key={`tech-${currentTechDomains.join()}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl mx-auto"
                >
                  {currentTechDomains.map((domain, index) => (
                    <motion.div
                      key={`${domain}-${index}`}
                      initial={{
                        opacity: 0,
                        y: 40,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                        transition: {
                          delay: (currentTechDomains.length - index - 1) * 0.02,
                          duration: 0.2,
                        },
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.15 },
                      }}
                      className="group bg-background/90 backdrop-blur-lg border border-primary/30 rounded-2xl p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      }}
                    >
                      <div className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                        {domain}
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        {Math.floor(Math.random() * 3000) + 500}+ learners
                      </div>
                      <div className="w-full h-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: "0%" }}
                          animate={{ width: `${60 + Math.random() * 40}%` }}
                          transition={{
                            delay: index * 0.05 + 0.2,
                            duration: 0.6,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Upcoming Non-Tech Domains Section */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent"
          >
            Upcoming Non-Tech Domains
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-muted-foreground mb-12 text-lg"
          >
            ✨ Coming Soon - Creative fields where passion meets learning
          </motion.p>

          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {nonTechVisible && currentNonTechDomains.length > 0 && (
                <motion.div
                  key={`nontech-${currentNonTechDomains.join()}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl mx-auto"
                >
                  {currentNonTechDomains.map((domain, index) => (
                    <motion.div
                      key={`${domain}-${index}`}
                      initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? -30 : 30,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.08,
                          duration: 0.4,
                          ease: "easeOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        transition: {
                          delay:
                            (currentNonTechDomains.length - index - 1) * 0.03,
                          duration: 0.25,
                        },
                      }}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.15 },
                      }}
                      className="group bg-gradient-to-br from-accent/20 to-orange-500/20 backdrop-blur-lg border border-accent/40 rounded-2xl p-8 shadow-2xl hover:shadow-accent/20 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="text-xl font-bold text-accent mb-3 group-hover:text-orange-400 transition-colors">
                          {domain}
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Coming soon...
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                            New
                          </span>
                          <span className="text-xs text-muted-foreground">
                            🎨 Creative
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground text-lg"
          >
            Domains refresh faster... ✨
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
