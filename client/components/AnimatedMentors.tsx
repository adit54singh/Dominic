import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Users,
  Award,
  BookOpen,
  Code,
  Palette,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AnimatedMentors() {
  const allMentors = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Senior React Developer",
      company: "Google",
      domain: "Frontend Development",
      experience: "5+ years",
      rating: 4.9,
      students: 1200,
      bio: "Passionate about building scalable web applications with React and TypeScript. Former startup founder.",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      sessions: 150,
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      avatar: "SC",
    },
    {
      id: "2",
      name: "Dr. Raj Patel",
      title: "ML Engineering Lead",
      company: "Microsoft",
      domain: "Machine Learning",
      experience: "8+ years",
      rating: 5.0,
      students: 1500,
      bio: "PhD in Computer Science. Specializes in deep learning, computer vision, and MLOps at scale.",
      skills: ["Python", "TensorFlow", "PyTorch", "AWS"],
      sessions: 200,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      avatar: "RP",
    },
    {
      id: "3",
      name: "Sophie Wilson",
      title: "Senior Product Designer",
      company: "Airbnb",
      domain: "UI/UX Design",
      experience: "6+ years",
      rating: 4.9,
      students: 750,
      bio: "Design systems expert with experience in user research, prototyping, and design-to-development handoffs.",
      skills: ["Figma", "Sketch", "Principle", "User Research"],
      sessions: 120,
      icon: <Palette className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      avatar: "SW",
    },
    {
      id: "4",
      name: "Michael Ross",
      title: "Serial Entrepreneur",
      company: "3 Successful Exits",
      domain: "Startup & Business",
      experience: "12+ years",
      rating: 5.0,
      students: 600,
      bio: "Built and sold 3 startups. Expert in product strategy, fundraising, and scaling teams from 0 to 100+.",
      skills: ["Strategy", "Fundraising", "Product", "Leadership"],
      sessions: 180,
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      avatar: "MR",
    },
    {
      id: "5",
      name: "Lisa Wang",
      title: "Principal DevOps Engineer",
      company: "Netflix",
      domain: "DevOps & Cloud",
      experience: "7+ years",
      rating: 4.8,
      students: 1000,
      bio: "Infrastructure architect handling millions of daily users. Expert in Kubernetes, AWS, and automation.",
      skills: ["Kubernetes", "AWS", "Docker", "Terraform"],
      sessions: 140,
      icon: <Code className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      avatar: "LW",
    },
    {
      id: "6",
      name: "Carlos Rodriguez",
      title: "Backend Architect",
      company: "Stripe",
      domain: "Backend Development",
      experience: "9+ years",
      rating: 4.9,
      students: 1350,
      bio: "Payment systems expert. Built high-scale distributed systems handling millions of transactions daily.",
      skills: ["Go", "Python", "PostgreSQL", "Redis"],
      sessions: 160,
      icon: <Code className="w-6 h-6" />,
      color: "from-teal-500 to-green-500",
      avatar: "CR",
    },
    {
      id: "7",
      name: "Emma Thompson",
      title: "Data Science Manager",
      company: "Spotify",
      domain: "Data Science",
      experience: "6+ years",
      rating: 4.9,
      students: 1100,
      bio: "Music recommendation algorithms expert. PhD in Statistics with focus on large-scale data analysis.",
      skills: ["Python", "R", "SQL", "Spark"],
      sessions: 135,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      avatar: "ET",
    },
    {
      id: "8",
      name: "Ahmed Hassan",
      title: "Mobile Engineering Lead",
      company: "Instagram",
      domain: "Mobile Development",
      experience: "8+ years",
      rating: 4.9,
      students: 850,
      bio: "iOS and Android expert. Built features used by millions including Stories, Reels, and messaging systems.",
      skills: ["Swift", "Kotlin", "React Native", "Flutter"],
      sessions: 125,
      icon: <Code className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      avatar: "AH",
    },
    {
      id: "9",
      name: "Jennifer Wu",
      title: "Product Manager",
      company: "Uber",
      domain: "Product Management",
      experience: "7+ years",
      rating: 4.8,
      students: 780,
      bio: "Led product teams for rider and driver experiences. Expert in product strategy and user analytics.",
      skills: ["Strategy", "Analytics", "A/B Testing", "Roadmapping"],
      sessions: 110,
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500",
      avatar: "JW",
    },
    {
      id: "10",
      name: "Ryan Cooper",
      title: "Growth Marketing Lead",
      company: "Shopify",
      domain: "Digital Marketing",
      experience: "5+ years",
      rating: 4.8,
      students: 920,
      bio: "Scaled multiple startups from $0 to $10M+ ARR. Expert in performance marketing and growth hacking.",
      skills: ["SEO", "PPC", "Analytics", "Growth"],
      sessions: 95,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500",
      avatar: "RC",
    },
  ];

  const [currentMentors, setCurrentMentors] = useState<typeof allMentors>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showRandomMentors = () => {
      const shuffled = [...allMentors].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4); // Show exactly 4 mentors
      setCurrentMentors(selected);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 1800); // Show for 1.8 seconds
    };

    // Initial display
    showRandomMentors();

    // Set interval for fast continuous animation
    const interval = setInterval(showRandomMentors, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const MentorCard = ({
    mentor,
    index,
  }: {
    mentor: (typeof allMentors)[0];
    index: number;
  }) => (
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
          delay: index * 0.1, // Fast stagger for 2-second refresh
          duration: 0.6, // Fast entrance
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      exit={{
        opacity: 0,
        y: -60,
        scale: 0.9,
        rotateY: 30,
        transition: {
          delay: (3 - index) * 0.05,
          duration: 0.4,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative group cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${mentor.color.split(" ")[1]}25, ${mentor.color.split(" ")[3]}15)`,
          filter: "blur(25px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main card */}
      <div
        className="relative bg-card/95 backdrop-blur-lg border border-border/60 rounded-3xl p-6 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${mentor.color.split(" ")[1]}08, ${mentor.color.split(" ")[3]}04)`,
          borderColor: `${mentor.color.split(" ")[1]}25`,
        }}
      >
        {/* Mentor header */}
        <div className="flex items-center space-x-4 mb-4">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white shadow-lg relative`}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.3 },
            }}
          >
            <Avatar className="w-full h-full">
              <AvatarFallback className="text-lg font-bold bg-transparent text-white">
                {mentor.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-yellow-800" />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold group-hover:text-primary transition-all duration-500 truncate">
              {mentor.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {mentor.title}
            </p>
            <p className="text-xs text-muted-foreground/70 truncate">
              {mentor.company}
            </p>
          </div>
        </div>

        {/* Domain and experience */}
        <div className="mb-4">
          <Badge variant="secondary" className="text-xs mb-2">
            {mentor.domain}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {mentor.experience} experience
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{mentor.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1">
              <Users className="w-3 h-3 text-blue-500" />
              <span className="text-sm font-medium">{mentor.students}</span>
            </div>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1">
              <BookOpen className="w-3 h-3 text-green-500" />
              <span className="text-sm font-medium">{mentor.sessions}</span>
            </div>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-muted-foreground/80 mb-4 line-clamp-2 leading-relaxed">
          {mentor.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {mentor.skills.slice(0, 3).map((skill, skillIndex) => (
            <Badge
              key={skillIndex}
              variant="outline"
              className="text-xs px-2 py-0.5"
            >
              {skill}
            </Badge>
          ))}
          {mentor.skills.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{mentor.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${mentor.color.split(" ")[1]}, ${mentor.color.split(" ")[3]}) border-box`,
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "subtract",
          }}
          animate={{
            background: [
              `linear-gradient(0deg, ${mentor.color.split(" ")[1]}, ${mentor.color.split(" ")[3]}) border-box`,
              `linear-gradient(90deg, ${mentor.color.split(" ")[1]}, ${mentor.color.split(" ")[3]}) border-box`,
              `linear-gradient(180deg, ${mentor.color.split(" ")[1]}, ${mentor.color.split(" ")[3]}) border-box`,
              `linear-gradient(270deg, ${mentor.color.split(" ")[1]}, ${mentor.color.split(" ")[3]}) border-box`,
              `linear-gradient(360deg, ${mentor.color.split(" ")[1]}, ${mentor.color.split(" ")[3]}) border-box`,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
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
            className="absolute w-1 h-1 bg-primary/15 rounded-full"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
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
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-center mb-24 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Expert Mentors
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Learn from industry professionals who've built successful careers
          </p>

          <motion.div
            animate={{
              scaleX: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
          />
        </motion.div>

        {/* Mentors Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.0 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect with Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get 1-on-1 guidance from experts at top companies who are
              passionate about helping you succeed
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="relative min-h-[500px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {visible && currentMentors.length > 0 && (
                  <motion.div
                    key={`mentors-${currentMentors.map((m) => m.id).join()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {currentMentors.map((mentor, index) => (
                        <MentorCard
                          key={`${mentor.id}-${index}`}
                          mentor={mentor}
                          index={index}
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
          transition={{ delay: 1.0, duration: 1.0 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground text-lg mb-4">
            Ready to accelerate your career with expert guidance?
          </p>
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-4"
          >
            <span className="text-3xl">🎯</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
