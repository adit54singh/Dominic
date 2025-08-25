import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedDomains() {
  const allTechDomains = [
    "Software Development",
    "Data Science & Analytics", 
    "UI/UX Design",
    "Digital Marketing",
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
    "AI Engineering",
    "Frontend Development",
    "Backend Development",
    "Quality Assurance"
  ];

  const allNonTechDomains = [
    "Fashion Designing",
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
    "Film Making",
    "Graphic Design",
    "Architecture",
    "Pottery & Ceramics",
    "Digital Art",
    "Fashion Styling",
    "Content Creation"
  ];

  const [currentTechDomains, setCurrentTechDomains] = useState<string[]>([]);
  const [currentNonTechDomains, setCurrentNonTechDomains] = useState<string[]>([]);
  const [techVisible, setTechVisible] = useState(true);
  const [nonTechVisible, setNonTechVisible] = useState(true);

  useEffect(() => {
    const showRandomTechDomains = () => {
      const shuffled = [...allTechDomains].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4); // Show exactly 4 tech domains
      setCurrentTechDomains(selected);
      setTechVisible(true);

      setTimeout(() => {
        setTechVisible(false);
      }, 1800); // Show for 1.8 seconds
    };

    const showRandomNonTechDomains = () => {
      const shuffled = [...allNonTechDomains].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4); // Show exactly 4 creative domains
      setCurrentNonTechDomains(selected);
      setNonTechVisible(true);

      setTimeout(() => {
        setNonTechVisible(false);
      }, 1800); // Show for 1.8 seconds
    };

    // Initial display
    showRandomTechDomains();
    showRandomNonTechDomains();

    // Set intervals for fast continuous animation
    const techInterval = setInterval(showRandomTechDomains, 2000); // Change every 2 seconds
    const nonTechInterval = setInterval(showRandomNonTechDomains, 2000); // Change every 2 seconds

    return () => {
      clearInterval(techInterval);
      clearInterval(nonTechInterval);
    };
  }, []);

  // Domain card component with smooth animations
  const DomainCard = ({ 
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
          y: 80,
          scale: 0.8,
          rotateY: -30,
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotateY: 0,
          transition: {
            delay: index * 0.1, // Faster stagger for 2-second refresh
            duration: 0.6, // Faster entrance for quick transitions
            ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease curve
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -60,
          scale: 0.9,
          rotateY: 30,
          transition: {
            delay: (3 - index) * 0.05,
            duration: 0.4, // Faster exit
            ease: "easeInOut",
          }
        }}
        whileHover={{ 
          scale: 1.08,
          y: -12,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="relative group cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Enhanced glowing background effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${color}25, ${color}10)`,
            filter: "blur(30px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3, // Moderate glow
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main card */}
        <div 
          className="relative bg-card/95 backdrop-blur-lg border border-border/60 rounded-3xl p-8 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}08, ${color}04)`,
            borderColor: `${color}25`,
          }}
        >
          {/* Domain icon area */}
          <motion.div 
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br mb-8 flex items-center justify-center text-white shadow-lg mx-auto`}
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}80)`,
            }}
            whileHover={{ 
              scale: 1.15, 
              rotate: 8,
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-2xl font-bold">
              {domain.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </div>
          </motion.div>
          
          {/* Domain name */}
          <h3 className="text-xl font-bold text-center mb-6 group-hover:text-primary transition-all duration-500 leading-tight">
            {domain}
          </h3>
          
          {/* Status and info */}
          <div className="text-center space-y-3">
            {isNonTech ? (
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2">
                  <motion.div 
                    className="w-2 h-2 bg-orange-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-muted-foreground">Coming Soon</span>
                </div>
                <p className="text-xs text-muted-foreground/70">Creative excellence awaits</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Available Now</span>
                </div>
                <p className="text-xs text-muted-foreground/70">{Math.floor(Math.random() * 800) + 200}+ learners active</p>
              </div>
            )}
          </div>

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-transparent opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}60) border-box`,
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "subtract",
            }}
            animate={{
              background: [
                `linear-gradient(0deg, ${color}, ${color}60) border-box`,
                `linear-gradient(90deg, ${color}, ${color}60) border-box`,
                `linear-gradient(180deg, ${color}, ${color}60) border-box`,
                `linear-gradient(270deg, ${color}, ${color}60) border-box`,
                `linear-gradient(360deg, ${color}, ${color}60) border-box`,
              ]
            }}
            transition={{
              duration: 4, // Moderate border animation
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.div>
    );
  };

  const techColors = [
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#10B981", // Emerald
    "#F59E0B", // Amber
  ];

  const nonTechColors = [
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#EC4899", // Pink
    "#F97316", // Orange
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/15 rounded-full"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3, // Moderate speed particles
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + i * 10}%`,
              top: `${25 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-24 pb-12 px-6">
        {/* Header Section - No timing text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-center mb-24 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Learning Domains
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Discover your path in technology and creative fields
          </p>
          
          {/* Simple decorative animation */}
          <motion.div
            animate={{ 
              scaleX: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          />
        </motion.div>

        {/* Tech Domains Section */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.0 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Technology Domains
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build your career in cutting-edge technology fields with expert mentorship
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {techVisible && currentTechDomains.length > 0 && (
                  <motion.div
                    key={`tech-${currentTechDomains.join()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                      {currentTechDomains.map((domain, index) => (
                        <DomainCard
                          key={`${domain}-${index}`}
                          domain={domain}
                          index={index}
                          color={techColors[index % techColors.length]}
                          isNonTech={false}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.0 }}
          className="w-full max-w-4xl mx-auto mb-40"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <div className="flex justify-center -mt-4">
            <div className="bg-background px-8 py-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-accent rounded-full border-t-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Non-Tech Domains Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1.0 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Creative Domains
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Express your creativity and build skills in diverse artistic fields
            </p>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center space-x-2 text-orange-400"
            >
              <span className="text-sm font-medium">✨ Coming Soon</span>
            </motion.div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {nonTechVisible && currentNonTechDomains.length > 0 && (
                  <motion.div
                    key={`nontech-${currentNonTechDomains.join()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                      {currentNonTechDomains.map((domain, index) => (
                        <DomainCard
                          key={`${domain}-${index}`}
                          domain={domain}
                          index={index}
                          color={nonTechColors[index % nonTechColors.length]}
                          isNonTech={true}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.0 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground text-lg mb-4">
            Ready to start your learning journey?
          </p>
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mt-4"
          >
            <span className="text-3xl">🚀</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
