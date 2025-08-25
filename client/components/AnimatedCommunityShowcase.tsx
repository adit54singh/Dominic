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
    }
  ];

  const [currentCommunities, setCurrentCommunities] = useState<typeof allCommunities>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showRandomCommunities = () => {
      const shuffled = [...allCommunities].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4); // Show 4 communities at a time
      setCurrentCommunities(selected);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000); // Show for 4 seconds
    };

    // Initial display
    showRandomCommunities();

    // Set interval for continuous animation
    const interval = setInterval(showRandomCommunities, 7000); // Change every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const CommunityCard = ({ community, index }: { community: typeof allCommunities[0]; index: number }) => (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 50,
        rotateX: -15,
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        transition: {
          delay: index * 0.15,
          duration: 0.6,
          ease: "easeOut",
        }
      }}
      exit={{ 
        opacity: 0, 
        y: -30,
        scale: 0.95,
        transition: {
          delay: (3 - index) * 0.1,
          duration: 0.4,
        }
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${community.color.split(' ')[1]}20, ${community.color.split(' ')[3]}20)`,
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Main card */}
      <div className="relative bg-card/90 backdrop-blur-lg border border-border/50 rounded-2xl p-6 shadow-2xl">
        {/* Community header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${community.color} flex items-center justify-center text-white shadow-lg`}>
            {community.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
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
                    delay: index * 0.15 + mentorIndex * 0.1,
                    duration: 0.4,
                  }
                }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
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
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="relative py-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 5}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Featured Communities & Top Mentors
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Discover thriving communities and learn from industry experts
          </p>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full mx-auto"
          />
        </motion.div>

        {/* Communities showcase */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {visible && currentCommunities.length > 0 && (
              <motion.div
                key={`communities-${currentCommunities.map(c => c.id).join()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Footer indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
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
            className="text-muted-foreground text-lg"
          >
            Communities rotating to showcase our amazing mentors... ✨
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
