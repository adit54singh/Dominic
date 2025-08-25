import { motion } from "framer-motion";

export default function AnimatedDomains() {
  const techDomains = [
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
  ];

  const nonTechDomains = [
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
  ];

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
          y: 50,
          scale: 0.9,
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: {
            delay: index * 0.15,
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease curve
          }
        }}
        whileHover={{ 
          scale: 1.05,
          y: -8,
          transition: { duration: 0.6, ease: "easeOut" }
        }}
        className="relative group cursor-pointer"
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main card */}
        <div 
          className="relative bg-card/90 backdrop-blur-lg border border-border/50 rounded-2xl p-8 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}08, ${color}04)`,
            borderColor: `${color}20`,
          }}
        >
          {/* Domain icon area */}
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br mb-6 flex items-center justify-center text-white shadow-lg mx-auto`}
               style={{
                 background: `linear-gradient(135deg, ${color}, ${color}80)`,
               }}>
            <div className="text-2xl font-bold">
              {domain.split(' ').map(word => word[0]).join('')}
            </div>
          </div>
          
          {/* Domain name */}
          <h3 className="text-xl font-bold text-center mb-4 group-hover:text-primary transition-all duration-500">
            {domain}
          </h3>
          
          {/* Status indicator */}
          <div className="text-center">
            {isNonTech ? (
              <div className="inline-flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Coming Soon</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Available Now</span>
              </div>
            )}
          </div>

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
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
              duration: 6,
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
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#3B82F6", // Blue
  ];

  const nonTechColors = [
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#EC4899", // Pink
    "#F97316", // Orange
    "#84CC16", // Lime
    "#06B6D4", // Cyan
    "#8B5CF6", // Purple
    "#10B981", // Emerald
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

      {/* Floating particles - slower animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4, // Much slower
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-24 pb-12 px-6">
        {/* Header Section - No rotating prism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-20 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Learning Domains
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Discover your path in technology and creative fields
          </p>
          
          {/* Simple decorative line instead of rotating prism */}
          <motion.div
            animate={{ 
              scaleX: [0.8, 1.2, 0.8],
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
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Technology Domains
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build your career in cutting-edge technology fields with expert mentorship and hands-on projects
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {techDomains.map((domain, index) => (
                <DomainCard
                  key={domain}
                  domain={domain}
                  index={index}
                  color={techColors[index % techColors.length]}
                  isNonTech={false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="w-full max-w-4xl mx-auto mb-32"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <div className="flex justify-center -mt-3">
            <div className="bg-background px-6 py-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-accent rounded-full border-t-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Non-Tech Domains Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Creative Domains
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Express your creativity and build skills in diverse artistic and creative fields
            </p>
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center space-x-2 text-orange-400"
            >
              <span className="text-sm font-medium">✨ Coming Soon</span>
            </motion.div>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {nonTechDomains.map((domain, index) => (
                <DomainCard
                  key={domain}
                  domain={domain}
                  index={index}
                  color={nonTechColors[index % nonTechColors.length]}
                  isNonTech={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground text-lg">
            Ready to start your learning journey?
          </p>
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mt-4"
          >
            <span className="text-2xl">🚀</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
