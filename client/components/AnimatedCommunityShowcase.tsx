import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Star, TrendingUp, Award, Crown, Code, Palette, Briefcase, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AnimatedCommunityShowcase() {
  const allCommunities = [
    {
      id: "1",
      name: "React Developers Hub",
      category: "Technology", 
      members: 15420,
      growth: "+25%",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      topMentors: [
        { name: "Sarah Chen", expertise: "React Expert", rating: 4.9, students: 1200 },
        { name: "Alex Kumar", expertise: "Frontend Architect", rating: 4.8, students: 950 },
        { name: "Maria Lopez", expertise: "UI/UX Designer", rating: 4.9, students: 800 }
      ]
    },
    {
      id: "2", 
      name: "AI/ML Innovators",
      category: "Data Science",
      members: 12850,
      growth: "+40%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      topMentors: [
        { name: "Dr. Raj Patel", expertise: "ML Engineer", rating: 5.0, students: 1500 },
        { name: "Emma Thompson", expertise: "Data Scientist", rating: 4.9, students: 1100 },
        { name: "Kevin Zhang", expertise: "AI Researcher", rating: 4.8, students: 900 }
      ]
    },
    {
      id: "3",
      name: "Design Collective",
      category: "Creative",
      members: 9650,
      growth: "+18%", 
      icon: <Palette className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      topMentors: [
        { name: "Sophie Wilson", expertise: "Product Designer", rating: 4.9, students: 750 },
        { name: "James Kim", expertise: "Brand Designer", rating: 4.8, students: 650 },
        { name: "Isabella Garcia", expertise: "Motion Designer", rating: 4.9, students: 580 }
      ]
    },
    {
      id: "4",
      name: "Startup Founders Network",
      category: "Business",
      members: 8420,
      growth: "+30%",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      topMentors: [
        { name: "Michael Ross", expertise: "Serial Entrepreneur", rating: 5.0, students: 600 },
        { name: "Priya Sharma", expertise: "Product Manager", rating: 4.9, students: 520 },
        { name: "David Lee", expertise: "Growth Hacker", rating: 4.8, students: 480 }
      ]
    },
    {
      id: "5",
      name: "Full Stack Academy",
      category: "Technology",
      members: 18750,
      growth: "+22%",
      icon: <Code className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      topMentors: [
        { name: "Carlos Rodriguez", expertise: "Backend Expert", rating: 4.9, students: 1350 },
        { name: "Lisa Wang", expertise: "DevOps Engineer", rating: 4.8, students: 1000 },
        { name: "Ahmed Hassan", expertise: "System Architect", rating: 4.9, students: 850 }
      ]
    },
    {
      id: "6",
      name: "Content Creators Guild",
      category: "Creative",
      members: 6890,
      growth: "+35%",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      topMentors: [
        { name: "Rachel Green", expertise: "Content Strategist", rating: 4.9, students: 450 },
        { name: "Tom Anderson", expertise: "Video Creator", rating: 4.8, students: 380 },
        { name: "Nina Patel", expertise: "Social Media Expert", rating: 4.9, students: 320 }
      ]
    },
    {
      id: "7",
      name: "Mobile Dev Community",
      category: "Technology",
      members: 11200,
      growth: "+32%",
      icon: <Code className="w-6 h-6" />,
      color: "from-teal-500 to-green-500",
      topMentors: [
        { name: "Jennifer Wu", expertise: "iOS Developer", rating: 4.8, students: 780 },
        { name: "Marco Silva", expertise: "React Native Expert", rating: 4.9, students: 690 },
        { name: "Aisha Khan", expertise: "Flutter Developer", rating: 4.7, students: 560 }
      ]
    },
    {
      id: "8",
      name: "Digital Marketing Hub",
      category: "Business",
      members: 9840,
      growth: "+28%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      topMentors: [
        { name: "Ryan Cooper", expertise: "SEO Specialist", rating: 4.8, students: 920 },
        { name: "Lisa Park", expertise: "Social Media Manager", rating: 4.9, students: 840 },
        { name: "Ahmed Ali", expertise: "PPC Expert", rating: 4.7, students: 650 }
      ]
    }
  ];

  const [currentCommunities, setCurrentCommunities] = useState<typeof allCommunities>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showRandomCommunities = () => {
      const shuffled = [...allCommunities].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4); // Always show exactly 4 communities
      setCurrentCommunities(selected);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 1800); // Show for 1.8 seconds
    };

    // Initial display
    showRandomCommunities();

    // Set interval for fast continuous animation
    const interval = setInterval(showRandomCommunities, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const CommunityCard = ({ community, index }: { community: typeof allCommunities[0]; index: number }) => (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: -60,
        scale: 0.9,
      }}
      animate={{ 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: {
          delay: index * 0.1, // Fast stagger for 2-second refresh
          duration: 0.6, // Fast entrance
          ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing
        }
      }}
      exit={{ 
        opacity: 0, 
        x: 60,
        scale: 0.95,
        transition: {
          delay: (3 - index) * 0.05,
          duration: 0.4,
          ease: "easeInOut",
        }
      }}
      whileHover={{ 
        scale: 1.02,
        x: 8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="relative group cursor-pointer w-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Enhanced glowing background */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${community.color.split(' ')[1]}25, ${community.color.split(' ')[3]}15)`,
          filter: "blur(25px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main card */}
      <div className="relative bg-card/95 backdrop-blur-lg border border-border/60 rounded-2xl p-6 shadow-2xl">
        {/* Community header */}
        <div className="flex items-center space-x-4 mb-4">
          <motion.div 
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${community.color} flex items-center justify-center text-white shadow-lg`}
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            {community.icon}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-xl font-bold group-hover:text-primary transition-all duration-500">
              {community.name}
            </h3>
            <div className="flex items-center space-x-3 mt-1">
              <Badge variant="secondary" className="text-xs">
                {community.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {community.members.toLocaleString()}
              </span>
              <span className="text-sm text-green-500 font-medium">
                {community.growth}
              </span>
            </div>
          </div>
        </div>

        {/* Top mentors section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-muted-foreground">Top Mentors</span>
          </div>
          
          <div className="space-y-2">
            {community.topMentors.map((mentor, mentorIndex) => (
              <motion.div
                key={`${mentor.name}-${mentorIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    delay: index * 0.1 + mentorIndex * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }
                }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs font-semibold">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium truncate">{mentor.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">{mentor.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground truncate">{mentor.expertise}</span>
                    <span className="text-xs text-primary">{mentor.students}+ students</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${community.color.split(' ')[1]}, ${community.color.split(' ')[3]}) border-box`,
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "subtract",
          }}
          animate={{
            background: [
              `linear-gradient(0deg, ${community.color.split(' ')[1]}, ${community.color.split(' ')[3]}) border-box`,
              `linear-gradient(90deg, ${community.color.split(' ')[1]}, ${community.color.split(' ')[3]}) border-box`,
              `linear-gradient(180deg, ${community.color.split(' ')[1]}, ${community.color.split(' ')[3]}) border-box`,
              `linear-gradient(270deg, ${community.color.split(' ')[1]}, ${community.color.split(' ')[3]}) border-box`,
              `linear-gradient(360deg, ${community.color.split(' ')[1]}, ${community.color.split(' ')[3]}) border-box`,
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{
              left: `${15 + i * 8}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-24 pb-12 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Learning Communities
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Connect with like-minded learners and industry experts
          </p>
          
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

        {/* Communities showcase - Vertical layout */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Communities & Top Mentors
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover thriving communities and learn from industry experts
            </p>
          </motion.div>

          <div className="relative min-h-[800px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {visible && currentCommunities.length > 0 && (
                <motion.div
                  key={`communities-${currentCommunities.map(c => c.id).join()}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  {/* Vertical layout */}
                  <div className="space-y-8">
                    {currentCommunities.map((community, index) => (
                      <CommunityCard
                        key={`${community.id}-${index}`}
                        community={community}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground text-lg mb-4">
            Ready to join a thriving learning community?
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
            <span className="text-3xl">🌟</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
