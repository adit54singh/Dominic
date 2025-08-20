import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedDomains() {
  const domains = [
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
    "Photography & Video",
    "Music Production",
    "Cooking & Food",
    "Travel & Adventure",
    "Fitness & Wellness"
  ];

  const [currentDomains, setCurrentDomains] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const showRandomDomains = () => {
      // Get 4-5 random domains
      const shuffled = [...domains].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 4); // 4-5 domains
      setCurrentDomains(selected);
      setIsVisible(true);
      
      // Hide after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    // Show initial set
    showRandomDomains();
    
    // Repeat every 4 seconds
    const interval = setInterval(showRandomDomains, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Learning Domains
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the fields where our community excels
          </p>
        </motion.div>
        
        <div className="relative h-96 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={currentDomains.join()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5,
                  staggerChildren: 0.1 
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
              >
                {currentDomains.map((domain, index) => (
                  <motion.div
                    key={`${domain}-${index}`}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { delay: index * 0.1 }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -30, 
                      scale: 0.9,
                      transition: { delay: (currentDomains.length - index - 1) * 0.05 }
                    }}
                    className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 shadow-lg"
                  >
                    <div className="text-lg font-semibold text-primary mb-2">
                      {domain}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Join {Math.floor(Math.random() * 3000) + 500}+ learners
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-0 text-center"
          >
            <p className="text-muted-foreground text-sm">
              New domains appear every few seconds...
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
