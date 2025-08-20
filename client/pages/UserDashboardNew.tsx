import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BookOpen,
  User,
  Users,
  Settings,
  Search,
  MessageCircle,
  Target,
  Bell,
  LogOut,
  Edit,
  Trophy,
  Calendar,
  Activity,
  Code,
  Smartphone,
  Database,
  ChevronDown,
  Menu,
  X,
  Star,
  GitBranch,
  Zap,
  Award,
  Palette,
  Camera,
  Utensils,
  Plane,
  Music,
  Briefcase,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  MapPin,
  Flame,
  Github,
  Linkedin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import DiscoverFeed from "@/components/DiscoverFeed";
import UserProfileView from "@/components/UserProfileView";
import FollowingProjectsFeed from "@/components/FollowingProjectsFeed";
import EditProfile from "@/components/EditProfile";
import ConnectSection from "@/components/ConnectSection";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeVerticalNav, setActiveVerticalNav] = useState("profile");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domainSwitcherOpen, setDomainSwitcherOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userOnboardingData, setUserOnboardingData] = useState<any>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [joinedProjects, setJoinedProjects] = useState<Array<any>>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(
    new Set(),
  );
  const [userActivity, setUserActivity] = useState<Array<any>>([]);
  const [discoveryTimeSpent, setDiscoveryTimeSpent] = useState(0); // in minutes
  const [discoverySessionStart, setDiscoverySessionStart] = useState<Date | null>(null);
  const [projectsCompleted, setProjectsCompleted] = useState(0);
  const [viewingCommunity, setViewingCommunity] = useState<string | null>(null);
  const [communityPosts, setCommunityPosts] = useState<Array<any>>([]);

  // Load user onboarding data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("userOnboardingData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserOnboardingData(data);
      // Set first domain as default selected domain
      if (data.domains && data.domains.length > 0) {
        setSelectedDomain(data.domains[0]);
      }
    }

    // Load saved joined projects, communities, and activity
    const savedJoinedProjects = localStorage.getItem("joinedProjects");
    if (savedJoinedProjects) {
      setJoinedProjects(JSON.parse(savedJoinedProjects));
    }

    const savedJoinedCommunities = localStorage.getItem("joinedCommunities");
    if (savedJoinedCommunities) {
      setJoinedCommunities(new Set(JSON.parse(savedJoinedCommunities)));
    }

    const savedUserActivity = localStorage.getItem("userActivity");
    if (savedUserActivity) {
      setUserActivity(JSON.parse(savedUserActivity));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("joinedProjects", JSON.stringify(joinedProjects));
  }, [joinedProjects]);

  useEffect(() => {
    localStorage.setItem(
      "joinedCommunities",
      JSON.stringify(Array.from(joinedCommunities)),
    );
  }, [joinedCommunities]);

  useEffect(() => {
    localStorage.setItem("userActivity", JSON.stringify(userActivity));
  }, [userActivity]);

  // Function to add activity - moved here to avoid temporal dead zone
  const addActivity = (activity: any) => {
    const newActivity = {
      ...activity,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    };
    setUserActivity((prev) => [newActivity, ...prev].slice(0, 10)); // Keep only last 10 activities
  };

  // Save discovery time to localStorage
  useEffect(() => {
    localStorage.setItem("discoveryTimeSpent", discoveryTimeSpent.toString());
  }, [discoveryTimeSpent]);

  // Load discovery time from localStorage
  useEffect(() => {
    const savedDiscoveryTime = localStorage.getItem("discoveryTimeSpent");
    if (savedDiscoveryTime) {
      setDiscoveryTimeSpent(parseInt(savedDiscoveryTime));
    }
    const savedProjectsCompleted = localStorage.getItem("projectsCompleted");
    if (savedProjectsCompleted) {
      setProjectsCompleted(parseInt(savedProjectsCompleted));
    }
  }, []);

  // Track time spent in discovery section
  useEffect(() => {
    if (activeTab === 'discover') {
      setDiscoverySessionStart(new Date());
    } else if (discoverySessionStart && activeTab !== 'discover') {
      const sessionEnd = new Date();
      const sessionTime = Math.floor((sessionEnd.getTime() - discoverySessionStart.getTime()) / 60000); // minutes
      if (sessionTime > 0) {
        setDiscoveryTimeSpent(prev => prev + sessionTime);
        addActivity({
          type: "discovery_time",
          action: `Spent ${sessionTime} minutes in Discovery`,
          details: `Explored posts and content for ${sessionTime} minutes`,
        });
      }
      setDiscoverySessionStart(null);
    }
  }, [activeTab, discoverySessionStart, addActivity]);

  // Real-time profile updates - watch for changes in userOnboardingData
  useEffect(() => {
    if (userOnboardingData) {
      // Update selected domain if current one is no longer available
      if (userOnboardingData.domains && userOnboardingData.domains.length > 0) {
        if (!userOnboardingData.domains.includes(selectedDomain)) {
          setSelectedDomain(userOnboardingData.domains[0]);
        }
      }

      // Save updated data to localStorage for persistence
      localStorage.setItem(
        "userOnboardingData",
        JSON.stringify(userOnboardingData),
      );
    }
  }, [userOnboardingData, selectedDomain]);

  // Function to join a project
  const joinProject = (project: any) => {
    const joinedProject = {
      ...project,
      joinedAt: new Date().toISOString(),
      id: project.id || Date.now().toString(),
    };
    setJoinedProjects((prev) => [...prev, joinedProject]);
    addActivity({
      type: "project_joined",
      action: `Joined project: ${project.title}`,
      details: project.description,
      projectId: joinedProject.id,
    });
  };

  // Function to complete a project
  const completeProject = (projectId: string) => {
    setProjectsCompleted(prev => {
      const newCount = prev + 1;
      localStorage.setItem("projectsCompleted", newCount.toString());
      return newCount;
    });
    addActivity({
      type: "project_completed",
      action: "Completed a project",
      details: "Successfully finished project collaboration",
    });
  };

  // Calculate activity level based on discovery time and project completion
  const calculateActivityLevel = () => {
    const discoveryScore = Math.min(discoveryTimeSpent / 60, 50); // Max 50 points for 60+ minutes
    const projectScore = projectsCompleted * 15; // 15 points per completed project
    const followingScore = followedUsers.size * 2; // 2 points per person followed
    const communityScore = joinedCommunities.size * 5; // 5 points per community

    const totalScore = discoveryScore + projectScore + followingScore + communityScore;
    const activityPercentage = Math.min(Math.round(totalScore), 100);

    return {
      percentage: activityPercentage,
      label: activityPercentage >= 80 ? "Very Active" :
             activityPercentage >= 60 ? "Active" :
             activityPercentage >= 40 ? "Moderate" :
             activityPercentage >= 20 ? "Getting Started" : "New",
      color: activityPercentage >= 80 ? "text-green-500" :
             activityPercentage >= 60 ? "text-blue-500" :
             activityPercentage >= 40 ? "text-yellow-500" :
             activityPercentage >= 20 ? "text-orange-500" : "text-gray-500"
    };
  };

  // Function to join a community
  const joinCommunity = (communityId: string, communityName: string) => {
    setJoinedCommunities((prev) => new Set([...prev, communityId]));
    addActivity({
      type: "community_joined",
      action: `Joined community: ${communityName}`,
      details: `Now part of ${communityName} community`,
      communityId,
    });
  };

  // Function to leave a community
  const leaveCommunity = (communityId: string, communityName: string) => {
    setJoinedCommunities((prev) => {
      const newSet = new Set(prev);
      newSet.delete(communityId);
      return newSet;
    });
    addActivity({
      type: "community_left",
      action: `Left community: ${communityName}`,
      details: `No longer part of ${communityName} community`,
      communityId,
    });
  };

  // User data - updated from userOnboardingData when available
  const user = {
    name: userOnboardingData?.name || "Aditya Singh",
    email: userOnboardingData?.email || "aditya@example.com",
    avatar:
      userOnboardingData?.avatar ||
      userOnboardingData?.name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase() ||
      "AS",
    joinedDate: "Jan 2024",
    title: userOnboardingData?.title || "",
    company: userOnboardingData?.company || "Tech Startup",
    location: userOnboardingData?.location || "Mumbai, India",
    bio: userOnboardingData?.bio || "",
  };

  // Define domain mappings
  const domainMappings = {
    "software-dev": {
      name: "Software Development",
      icon: Code,
      color: "bg-blue-500",
    },
    "web-dev": { name: "Web Development", icon: Code, color: "bg-cyan-500" },
    "mobile-dev": {
      name: "Mobile Development",
      icon: Smartphone,
      color: "bg-green-500",
    },
    "data-science": {
      name: "Data Science & AI",
      icon: Database,
      color: "bg-purple-500",
    },
    design: { name: "UI/UX Design", icon: Palette, color: "bg-red-500" },
    "cloud-computing": {
      name: "Cloud Computing",
      icon: Code,
      color: "bg-sky-500",
    },
    blockchain: {
      name: "Blockchain & Web3",
      icon: Code,
      color: "bg-amber-500",
    },
    devops: {
      name: "DevOps & Infrastructure",
      icon: Code,
      color: "bg-orange-500",
    },
    cybersecurity: { name: "Cybersecurity", icon: Code, color: "bg-red-600" },
    "game-dev": { name: "Game Development", icon: Code, color: "bg-pink-500" },
    iot: {
      name: "IoT & Embedded Systems",
      icon: Code,
      color: "bg-emerald-600",
    },
    robotics: {
      name: "Robotics & Automation",
      icon: Code,
      color: "bg-indigo-600",
    },
    "ar-vr": { name: "AR/VR Development", icon: Code, color: "bg-violet-600" },
    "quantum-computing": {
      name: "Quantum Computing",
      icon: Code,
      color: "bg-rose-600",
    },
  };

  // Create user domains based on onboarding data
  const userDomains =
    userOnboardingData?.domains?.map((domainId: string) => {
      const mapping = domainMappings[domainId as keyof typeof domainMappings];
      const progress = Math.floor(Math.random() * 80) + 20; // Random progress for demo
      const projectsCompleted = Math.floor(Math.random() * 10) + 1;
      const mentorshipHours = Math.floor(Math.random() * 50) + 10;

      return {
        id: domainId,
        name: mapping?.name || domainId,
        icon: mapping?.icon || Code,
        color: mapping?.color || "bg-blue-500",
        progress,
        projectsCompleted,
        mentorshipHours,
        currentProjects: userOnboardingData?.projects?.map(
          (project: any, index: number) => ({
            name: project.name || `Project ${index + 1}`,
            description: project.description || "A collaborative project",
            skills: project.techStack
              ? project.techStack.split(", ")
              : userOnboardingData?.skills?.slice(0, 3) || [],
            collaborators: Math.floor(Math.random() * 5) + 2,
            timeLeft: index === 0 ? "2 weeks left" : "1 month left",
            type: domainId.includes("web")
              ? "Frontend"
              : domainId.includes("mobile")
                ? "Mobile"
                : "Full Stack",
          }),
        ) || [
          {
            name: `Sample ${mapping?.name || "Tech"} Project`,
            description: `Working on exciting ${mapping?.name?.toLowerCase() || "technology"} solutions`,
            skills: userOnboardingData?.skills?.slice(0, 3) || [
              "JavaScript",
              "React",
            ],
            collaborators: 3,
            timeLeft: "2 weeks left",
            type: "Project",
          },
        ],
        upcomingEvents: [
          { name: `${mapping?.name} Workshop`, date: "Tomorrow 6:00 PM" },
          { name: `Advanced ${mapping?.name}`, date: "This Saturday 10:00 AM" },
        ],
      };
    }) || [];

  const getCurrentDomain = () => {
    if (!userDomains || userDomains.length === 0) {
      // Fallback domain if no onboarding data
      return {
        id: "general",
        name: "General",
        icon: Code,
        color: "bg-blue-500",
        progress: 0,
        projectsCompleted: 0,
        mentorshipHours: 0,
        currentProjects: [],
        upcomingEvents: [],
      };
    }
    return (
      userDomains.find((domain) => domain.id === selectedDomain) ||
      userDomains[0]
    );
  };

  // Generate profile data based on onboarding data and selected domain
  const generateProfileForDomain = () => {
    const currentDomain = getCurrentDomain();

    const getUserTitle = () => {
      const isTechDomain = [
        "software-dev",
        "web-dev",
        "mobile-dev",
        "data-science",
        "design",
      ].includes(selectedDomain);

      if (isTechDomain) {
        if (selectedDomain === "web-dev" || selectedDomain === "software-dev") {
          return userOnboardingData?.experience === "advanced"
            ? "Senior Software Engineer"
            : userOnboardingData?.experience === "intermediate"
              ? "Software Engineer"
              : "Junior Developer";
        }
        if (selectedDomain === "data-science") return "Data Scientist";
        if (selectedDomain === "design") return "UI/UX Designer";
        if (selectedDomain === "mobile-dev") return "Mobile App Developer";
        return "Tech Professional";
      } else {
        if (selectedDomain === "content-creation") return "Content Creator";
        if (selectedDomain === "cooking-food") return "Food Enthusiast";
        if (selectedDomain === "travel") return "Travel Blogger";
        if (selectedDomain === "music-arts") return "Artist";
        if (selectedDomain === "business") return "Entrepreneur";
        if (selectedDomain === "academics") return "Academic";
        return "Creative Professional";
      }
    };

    return {
      id: "user",
      name: user.name,
      title: user.title || getUserTitle(),
      company: user.company,
      avatar: user.avatar,
      experience:
        userOnboardingData?.experience === "beginner"
          ? "< 1 Year"
          : userOnboardingData?.experience === "intermediate"
            ? "1-3 Years"
            : userOnboardingData?.experience === "advanced"
              ? "3+ Years"
              : "2 Years",
      leetcodeRank:
        userOnboardingData?.leetcodeRank ||
        userOnboardingData?.gfgRank ||
        "#--",
      domains: [currentDomain.name],
      projectsCollaborated: currentDomain.projectsCompleted,
      rating: 4.8, // Default rating for user profile
      skills: userOnboardingData?.skills?.slice(0, 3) || [
        "JavaScript",
        "React",
        "Node.js",
      ],
    };
  };

  // Sample user profiles for Connect section (expanded)
  const communityProfiles = [
    {
      id: "1",
      name: "Rajesh Kumar",
      title: "Full Stack Developer",
      location: "Bangalore, India",
      avatar: "RK",
      bio: "Passionate about building scalable web applications. Love mentoring juniors and collaborating on open-source projects. Always excited to learn new technologies!",
      description:
        "Senior developer with 5+ years of experience in building production-ready applications. Currently working on microservices architecture and leading a team of 8 developers at TechCorp.",
      achievements: [
        "���� Hackathon Winner 2024",
        "🚀 Led 5+ successful projects",
        "⭐ 4.9/5 mentor rating",
      ],
      communities: [
        { name: "Web Development Hub", role: "Core Member", members: "2.3k" },
        { name: "React Enthusiasts", role: "Moderator", members: "1.8k" },
        {
          name: "Open Source Contributors",
          role: "Active Contributor",
          members: "950",
        },
      ],
      projects: 12,
      connections: 156,
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      experience: "3 years",
      currentFocus: "Microservices & DevOps",
      availability: "Available for mentoring",
    },
    {
      id: "2",
      name: "Priya Sharma",
      title: "Mobile App Developer",
      location: "Mumbai, India",
      avatar: "PS",
      bio: "Flutter enthusiast with a passion for creating beautiful, user-friendly mobile experiences. Experienced in both iOS and Android development.",
      description:
        "Mobile development specialist who has published 15+ apps on Play Store and App Store. Expert in cross-platform development and UI/UX design principles.",
      achievements: [
        "📱 10+ apps published",
        "🎯 100k+ downloads",
        "🌟 Google Play featured",
      ],
      communities: [
        {
          name: "Flutter Developers India",
          role: "Community Lead",
          members: "3.1k",
        },
        {
          name: "Mobile UI/UX Designers",
          role: "Active Member",
          members: "1.2k",
        },
        { name: "Startup Builders Network", role: "Mentor", members: "780" },
      ],
      projects: 8,
      connections: 89,
      skills: ["Flutter", "Dart", "Firebase", "Swift"],
      experience: "2 years",
      currentFocus: "Cross-platform Development",
      availability: "Open to collaborations",
    },
    {
      id: "3",
      name: "Arjun Patel",
      title: "Data Scientist",
      location: "Pune, India",
      avatar: "AP",
      bio: "ML engineer passionate about solving real-world problems with AI. Love working on recommendation systems and computer vision projects.",
      description:
        "AI/ML researcher with focus on computer vision and NLP. Currently working on recommendation systems that serve 50M+ users. Published researcher with 3 papers.",
      achievements: [
        "🧠 ML model in production",
        "📊 Kaggle Expert",
        "🔬 2 research papers",
      ],
      communities: [
        {
          name: "Data Science Hub India",
          role: "Technical Lead",
          members: "4.2k",
        },
        {
          name: "AI/ML Researchers",
          role: "Research Contributor",
          members: "2.7k",
        },
        { name: "Python Developers", role: "Core Member", members: "5.8k" },
      ],
      projects: 6,
      connections: 234,
      skills: ["Python", "TensorFlow", "Scikit-learn", "SQL"],
      experience: "4 years",
      currentFocus: "Computer Vision & NLP",
      availability: "Looking for research collaborations",
    },
    {
      id: "4",
      name: "Vikash Kumar",
      title: "DevOps Engineer",
      location: "Delhi, India",
      avatar: "VK",
      bio: "Cloud infrastructure specialist passionate about automation and scalability. Love working with Kubernetes, Docker, and CI/CD pipelines.",
      description:
        "DevOps engineer with 4+ years of experience in building scalable cloud infrastructure. Currently managing infrastructure for multiple microservices serving 10M+ users.",
      achievements: [
        "☁️ AWS Certified Solutions Architect",
        "🚀 Reduced deployment time by 80%",
        "⚡ 99.9% uptime achieved",
      ],
      communities: [
        {
          name: "DevOps Engineers India",
          role: "Core Member",
          members: "4.5k",
        },
        {
          name: "Cloud Native Developers",
          role: "Technical Lead",
          members: "2.1k",
        },
        {
          name: "Kubernetes Community",
          role: "Active Contributor",
          members: "6.7k",
        },
      ],
      projects: 15,
      connections: 203,
      skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
      experience: "4 years",
      currentFocus: "Cloud Native Architecture",
      availability: "Available for consulting",
    },
    {
      id: "5",
      name: "Neha Agarwal",
      title: "Product Designer",
      location: "Hyderabad, India",
      avatar: "NA",
      bio: "UX/UI designer focused on creating intuitive and accessible user experiences. Love conducting user research and turning insights into beautiful designs.",
      description:
        "Product designer with expertise in user research, interaction design, and prototyping. Led design for 3 successful product launches with 90% user satisfaction.",
      achievements: [
        "🎨 Designed award-winning mobile app",
        "📊 Improved user engagement by 65%",
        "👥 Led design team of 5",
      ],
      communities: [
        {
          name: "UX Designers India",
          role: "Community Manager",
          members: "3.8k",
        },
        { name: "Product Design Hub", role: "Mentor", members: "2.4k" },
        {
          name: "Design Systems Coalition",
          role: "Active Member",
          members: "1.9k",
        },
      ],
      projects: 9,
      connections: 145,
      skills: ["Figma", "Sketch", "Principle", "After Effects"],
      experience: "3 years",
      currentFocus: "Design Systems & Accessibility",
      availability: "Open to freelance projects",
    },
    {
      id: "6",
      name: "Rohit Mehta",
      title: "Blockchain Developer",
      location: "Pune, India",
      avatar: "RM",
      bio: "Web3 enthusiast building the future of decentralized applications. Experienced in smart contracts, DeFi protocols, and dApp development.",
      description:
        "Blockchain developer specializing in Ethereum and Solidity. Built 5+ DeFi protocols with $50M+ TVL. Active contributor to open-source Web3 projects.",
      achievements: [
        "⛓️ Built DeFi protocol with $50M TVL",
        "🏆 ETHIndia hackathon winner",
        "📝 Published 10+ smart contracts",
      ],
      communities: [
        {
          name: "Blockchain Developers India",
          role: "Technical Advisor",
          members: "5.2k",
        },
        { name: "DeFi Builders", role: "Core Contributor", members: "3.6k" },
        { name: "Web3 Innovators", role: "Community Leader", members: "4.1k" },
      ],
      projects: 7,
      connections: 178,
      skills: ["Solidity", "Web3.js", "Hardhat", "Rust"],
      experience: "2 years",
      currentFocus: "Layer 2 Solutions & DeFi",
      availability: "Looking for co-founders",
    },
    {
      id: "7",
      name: "Ananya Sharma",
      title: "QA Automation Engineer",
      location: "Chennai, India",
      avatar: "AS",
      bio: "Quality assurance specialist passionate about test automation and ensuring bug-free user experiences. Expert in building comprehensive testing frameworks.",
      description:
        "QA engineer with 5+ years of experience in manual and automated testing. Built testing frameworks that reduced testing time by 70% and improved release quality.",
      achievements: [
        "🧪 Automated 95% of test cases",
        "🐛 Found 500+ critical bugs",
        "⚡ Reduced testing time by 70%",
      ],
      communities: [
        {
          name: "QA Engineers Network",
          role: "Senior Member",
          members: "2.8k",
        },
        {
          name: "Test Automation Guild",
          role: "Workshop Lead",
          members: "1.7k",
        },
        { name: "Software Testing Community", role: "Mentor", members: "3.2k" },
      ],
      projects: 11,
      connections: 167,
      skills: ["Selenium", "Cypress", "Jest", "TestNG"],
      experience: "5 years",
      currentFocus: "AI-Driven Testing",
      availability: "Available for mentoring",
    },
    {
      id: "8",
      name: "Karthik Reddy",
      title: "Machine Learning Engineer",
      location: "Bangalore, India",
      avatar: "KR",
      bio: "ML engineer working on computer vision and NLP projects. Love building AI solutions that solve real-world problems and make a positive impact.",
      description:
        "ML engineer with expertise in deep learning, computer vision, and NLP. Deployed 10+ ML models in production serving millions of users with 95% accuracy.",
      achievements: [
        "🤖 Deployed 10+ ML models in production",
        "📊 Achieved 95% model accuracy",
        "🏅 Kaggle Grandmaster",
      ],
      communities: [
        {
          name: "AI/ML Engineers India",
          role: "Research Lead",
          members: "6.3k",
        },
        {
          name: "Deep Learning Community",
          role: "Technical Writer",
          members: "4.7k",
        },
        {
          name: "Computer Vision Hub",
          role: "Project Maintainer",
          members: "2.9k",
        },
      ],
      projects: 13,
      connections: 289,
      skills: ["PyTorch", "TensorFlow", "OpenCV", "Scikit-learn"],
      experience: "4 years",
      currentFocus: "Computer Vision & Edge AI",
      availability: "Open to research collaborations",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const renderMainContent = () => {
    if (activeTab === "edit-profile" || activeVerticalNav === "edit-profile") {
      return (
        <EditProfile
          onBack={() => {
            setActiveTab("profile");
            setActiveVerticalNav("profile");
          }}
          onSave={(profile) => {
            // Update user onboarding data
            setUserOnboardingData((prevData) => ({
              ...prevData,
              ...profile,
              userProjects: profile.projects,
            }));

            // Show success message and go back to profile
            addActivity({
              type: "profile_updated",
              action: "Updated profile information",
              details: "Profile changes have been saved successfully",
              timestamp: new Date().toISOString(),
            });

            setActiveTab("profile");
            setActiveVerticalNav("profile");
          }}
        />
      );
    } else if (activeTab === "profile" || activeVerticalNav === "profile") {
      return (
        <div className="space-y-12 animate-in slide-in-from-top-4 duration-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {getCurrentDomain().name} Collaboration Hub
              </h1>
              <p className="text-muted-foreground">
                Connect, collaborate, and build amazing projects with peers
              </p>
            </div>
          </div>

          {/* Section 1: New Profile Header */}
          <div className="animate-in slide-in-from-top-4 duration-500 mb-12">
            <Card className="bg-card border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Profile Photo */}
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-4 border-border">
                      {userOnboardingData?.avatar ? (
                        <img
                          src={userOnboardingData.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                          {user.avatar}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => {
                        setActiveTab("edit-profile");
                        setActiveVerticalNav("edit-profile");
                      }}
                    >
                      <Edit className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Profile Details with enhanced spacing */}
                  <div className="flex-1 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-3">
                          <h1 className="text-2xl sm:text-3xl font-bold">
                            {user.name}
                          </h1>
                          <Badge className="bg-green-600 hover:bg-green-700">
                            <Star className="w-3 h-3 mr-1" />
                            Level{" "}
                            {getCurrentDomain().progress > 80
                              ? "12"
                              : getCurrentDomain().progress > 50
                                ? "8"
                                : "5"}
                          </Badge>
                        </div>
                        <p className="text-lg text-muted-foreground mb-4">
                          {generateProfileForDomain().title} |{" "}
                          {getCurrentDomain().name} Specialist | Community
                          Mentor
                        </p>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
                          {user.bio ||
                            `Passionate about ${getCurrentDomain().name.toLowerCase()} with expertise in modern technologies. Love building scalable solutions and mentoring upcoming developers in the community.`}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Joined {user.joinedDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        15-day streak
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 2: Collaboration Stats */}
          <div className="animate-in slide-in-from-top-4 duration-500 delay-100 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    {joinedProjects.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Joined Projects
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    4.8
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Rating
                  </div>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    {followedUsers.size}
                  </div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-500 mb-2">
                    {joinedCommunities.size}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Communities
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 3: Enhanced Activity Overview & Project Deadlines */}
          <div className="animate-in slide-in-from-top-4 duration-500 delay-200">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Enhanced Activity Overview */}
              <Card className="transform transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-primary animate-pulse" />
                    <span>Activity Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* This Week Stats */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Activity Summary
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">
                          {joinedProjects.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Projects Joined
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">
                          {followedUsers.size}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          People Following
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-500">
                          {joinedCommunities.size}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Communities
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real Activity Timeline */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground">
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      {userActivity.length > 0 ? (
                        userActivity.slice(0, 5).map((activity, index) => {
                          const timeAgo = new Date(
                            activity.timestamp,
                          ).toLocaleString();
                          return (
                            <div
                              key={activity.id}
                              className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg transition-colors hover:bg-muted/50"
                            >
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  activity.type === "project_joined"
                                    ? "bg-green-500"
                                    : activity.type === "community_joined"
                                      ? "bg-blue-500"
                                      : activity.type === "community_left"
                                        ? "bg-red-500"
                                        : activity.type === "follow"
                                          ? "bg-purple-500"
                                          : "bg-cyan-500"
                                }`}
                              />
                              <div className="flex-1">
                                <div className="text-sm font-medium">
                                  {activity.action}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {activity.details}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {timeAgo}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          <div className="text-sm">No recent activity</div>
                          <div className="text-xs mt-1">
                            Start joining projects and communities to see your
                            activity here!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Activity Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        Activity Level
                      </span>
                      <span className={`text-sm font-bold ${calculateActivityLevel().color}`}>
                        {calculateActivityLevel().label}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${calculateActivityLevel().percentage}%`,
                        }}
                      ></div>
                    </div>

                    {/* Activity Breakdown */}
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Discovery time:</span>
                        <span>{Math.floor(discoveryTimeSpent)} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projects completed:</span>
                        <span>{projectsCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overall score:</span>
                        <span>{calculateActivityLevel().percentage}/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Project Deadlines */}
              <Card className="transform transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-500 animate-pulse" />
                    <span>Project Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {joinedProjects.length > 0 ? (
                    joinedProjects.map((project, index) => {
                      const dueDate = new Date(project.dueDate);
                      const now = new Date();
                      const daysLeft = Math.ceil(
                        (dueDate.getTime() - now.getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      const priority =
                        daysLeft <= 7
                          ? "High"
                          : daysLeft <= 30
                            ? "Medium"
                            : "Low";

                      return (
                        <div
                          key={project.id}
                          className={`p-4 rounded-lg border transform transition-all duration-200 hover:scale-[1.02] ${
                            priority === "High"
                              ? "bg-red-500/10 border-red-500/20 hover:bg-red-500/15"
                              : priority === "Medium"
                                ? "bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/15"
                                : "bg-green-500/10 border-green-500/20 hover:bg-green-500/15"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-sm">
                                  {project.title}
                                </div>
                                <Badge
                                  variant={
                                    priority === "High"
                                      ? "destructive"
                                      : priority === "Medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                                {project.description}
                              </p>
                              <div className="text-xs text-muted-foreground mb-2">
                                Due: {dueDate.toLocaleDateString()} (
                                {daysLeft > 0
                                  ? `${daysLeft} days left`
                                  : "Overdue"}
                                )
                              </div>

                              {/* Skills Used */}
                              <div className="flex flex-wrap gap-1 mb-2">
                                {project.techStack?.map(
                                  (skill: string, skillIndex: number) => (
                                    <Badge
                                      key={skillIndex}
                                      variant="outline"
                                      className="text-xs px-2 py-0.5 bg-primary/10 border-primary/30 text-primary"
                                    >
                                      {skill}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-muted-foreground">
                              Progress
                            </span>
                            <span className="text-xs font-semibold">
                              {project.progress || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No joined projects yet</p>
                      <p className="text-sm mt-2">
                        Join projects from the Connect or Discover sections to
                        see them here!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 5: Projects from People You Follow - Full Width */}
          <div className="animate-in slide-in-from-right-4 duration-700 delay-400">
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Projects from People You Follow</span>
                  <Badge variant="secondary" className="text-xs animate-pulse">
                    Live Updates
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto custom-scrollbar">
                <FollowingProjectsFeed
                  selectedDomain={selectedDomain}
                  followedUsers={followedUsers}
                  joinedProjects={joinedProjects}
                  onJoinProject={joinProject}
                />
              </CardContent>
            </Card>
          </div>

          {/* Section 6: Enhanced Recent Collaboration Ratings - Full Width */}
          <div className="animate-in slide-in-from-left-4 duration-700 delay-600">
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Recent Collaboration Ratings</span>
                    <Badge className="bg-green-600 hover:bg-green-700">
                      4.8/5 Average
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 15) + 8} total reviews
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Rajesh Kumar",
                      project: "E-commerce Platform",
                      rating: 5,
                      feedback:
                        "Excellent frontend work and great communication. Delivered high-quality code and was very responsive to feedback.",
                      time: "2 days ago",
                      role: "Senior Developer",
                      skills: ["React", "TypeScript"],
                      duration: "3 weeks",
                    },
                    {
                      name: "Priya Sharma",
                      project: "Mobile Banking App",
                      rating: 4,
                      feedback:
                        "Strong technical skills, delivered on time. Great problem-solving approach and clean code structure.",
                      time: "1 week ago",
                      role: "Tech Lead",
                      skills: ["React Native", "Node.js"],
                      duration: "2 weeks",
                    },
                    {
                      name: "Arjun Patel",
                      project: "Data Analytics Dashboard",
                      rating: 5,
                      feedback:
                        "Outstanding problem-solving abilities and attention to detail. Excellent collaboration skills.",
                      time: "2 weeks ago",
                      role: "Data Scientist",
                      skills: ["Python", "Chart.js"],
                      duration: "4 weeks",
                    },
                    {
                      name: "Meera Singh",
                      project: "Learning Management System",
                      rating: 5,
                      feedback:
                        "Innovative solutions and great teamwork. Always ready to help and share knowledge with the team.",
                      time: "3 weeks ago",
                      role: "Product Manager",
                      skills: ["Vue.js", "Firebase"],
                      duration: "5 weeks",
                    },
                  ].map((collab, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border border-border/50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/30 cursor-pointer group"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {collab.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {collab.name}
                            </div>
                            <div className="flex items-center">
                              {renderStars(collab.rating)}
                              <span className="ml-1 text-xs font-semibold text-yellow-600">
                                {collab.rating}.0
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">
                            {collab.role}
                          </div>
                          <div className="text-xs font-medium text-primary">
                            {collab.project}
                          </div>
                        </div>
                      </div>

                      <blockquote className="text-sm text-muted-foreground italic leading-relaxed mb-4 pl-4 border-l-2 border-primary/30">
                        "{collab.feedback}"
                      </blockquote>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {collab.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="text-xs bg-primary/10 text-primary border-primary/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                        \n{" "}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Duration: {collab.duration}</span>
                        <span>{collab.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Reviews Button */}
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View All Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else if (activeTab === "connect") {
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Connect with Community
              </h1>
              <p className="text-muted-foreground">
                Discover talented peers ready to collaborate on exciting
                projects
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Filter by Domain
              </Button>
              <Button size="sm">View All</Button>
            </div>
          </div>

          <ConnectSection onActivity={addActivity} />
        </div>
      );
    } else if (activeTab === "discover") {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Discover</h2>
            <p className="text-muted-foreground">
              Get inspired by verified professionals sharing their journey, work
              culture, and collaborative projects you can join
            </p>
          </div>
          <DiscoverFeed
            selectedDomain={selectedDomain}
            joinedProjects={joinedProjects}
            onJoinProject={joinProject}
          />
        </div>
      );
    } else if (activeTab === "community") {
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Community Hub</h1>
              <p className="text-muted-foreground">
                Connect with like-minded learners and join active communities in
                your domains
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Browse All
              </Button>
              <Button size="sm">
                <Users className="w-4 h-4 mr-2" />
                Create Community
              </Button>
            </div>
          </div>

          {/* Your Communities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Your Communities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userDomains?.map((domain, index) => (
                  <Card
                    key={domain.id}
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`w-10 h-10 ${domain.color} rounded-lg flex items-center justify-center`}
                        >
                          <domain.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {domain.name} Hub
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 5000) + 1000} members
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Connect with {domain.name.toLowerCase()} enthusiasts and
                        share knowledge
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setViewingCommunity(domain.id);
                            setActiveTab("community-hub");
                            setActiveVerticalNav("community-hub");
                          }}
                        >
                          View Hub
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>
                      Complete onboarding to join communities related to your
                      domains!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trending Communities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span>Trending Communities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "AI/ML Researchers",
                    members: "12.3k",
                    growth: "+24%",
                    color: "bg-purple-500",
                    icon: Database,
                  },
                  {
                    name: "React Developers",
                    members: "8.7k",
                    growth: "+18%",
                    color: "bg-blue-500",
                    icon: Code,
                  },
                  {
                    name: "Content Creators",
                    members: "6.2k",
                    growth: "+32%",
                    color: "bg-pink-500",
                    icon: Camera,
                  },
                  {
                    name: "Startup Founders",
                    members: "4.1k",
                    growth: "+15%",
                    color: "bg-yellow-500",
                    icon: Briefcase,
                  },
                  {
                    name: "Food Bloggers",
                    members: "3.8k",
                    growth: "+28%",
                    color: "bg-orange-500",
                    icon: Utensils,
                  },
                  {
                    name: "Travel Enthusiasts",
                    members: "5.4k",
                    growth: "+21%",
                    color: "bg-emerald-500",
                    icon: Plane,
                  },
                ].map((community, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`w-10 h-10 ${community.color} rounded-lg flex items-center justify-center`}
                        >
                          <community.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {community.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {community.members} members
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="text-xs text-green-600"
                        >
                          {community.growth} this week
                        </Badge>
                        <Button
                          variant={
                            joinedCommunities.has(`trending_${index}`)
                              ? "outline"
                              : "ghost"
                          }
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            const communityId = `trending_${index}`;
                            if (joinedCommunities.has(communityId)) {
                              leaveCommunity(communityId, community.name);
                            } else {
                              joinCommunity(communityId, community.name);
                            }
                          }}
                        >
                          {joinedCommunities.has(`trending_${index}`)
                            ? "Leave"
                            : "Join"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span>Upcoming Community Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Web3 Developer Meetup",
                    community: "Blockchain Developers",
                    date: "Tomorrow 7:00 PM",
                    attendees: 245,
                    type: "Virtual",
                  },
                  {
                    title: "AI Ethics Discussion",
                    community: "AI/ML Researchers",
                    date: "Friday 6:00 PM",
                    attendees: 180,
                    type: "Hybrid",
                  },
                  {
                    title: "Content Creation Workshop",
                    community: "Content Creators",
                    date: "Saturday 2:00 PM",
                    attendees: 320,
                    type: "Virtual",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {event.community} • {event.date} • {event.attendees}{" "}
                        attending
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Join Event
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    } else if (activeTab === "community-hub" && viewingCommunity) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveTab("community");
                  setActiveVerticalNav("community");
                }}
              >
                ← Back to Communities
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {userDomains?.find((d) => d.id === viewingCommunity)?.name ||
                    "Community"}{" "}
                  Hub
                </h1>
                <p className="text-muted-foreground">
                  Connect and collaborate with the{" "}
                  {userDomains
                    ?.find((d) => d.id === viewingCommunity)
                    ?.name.toLowerCase()}{" "}
                  community
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Community Hub Content */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Community Info */}
            <div className="lg:col-span-1 space-y-4">
              {/* Community Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {Math.floor(Math.random() * 100) + 50}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active Today
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">
                        {Math.floor(Math.random() * 20) + 10}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Projects Shared
                      </div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">
                        {followedUsers.size}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        People You Follow
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Followed Members */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    People You Follow ({followedUsers.size})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Array.from(followedUsers)
                    .slice(0, 5)
                    .map((userId) => {
                      // You can expand this to show actual user data
                      return (
                        <div
                          key={userId}
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary text-white text-xs">
                              {userId === "1"
                                ? "RK"
                                : userId === "2"
                                  ? "PS"
                                  : "AP"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {userId === "1"
                                ? "Rajesh Kumar"
                                : userId === "2"
                                  ? "Priya Sharma"
                                  : "Arjun Patel"}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {userId === "1"
                                ? "Full Stack Developer"
                                : userId === "2"
                                  ? "Data Scientist"
                                  : "Mobile Developer"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {followedUsers.size === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      No followed users yet
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["React 18", "TypeScript", "Next.js", "Tailwind CSS"].map(
                    (topic, index) => (
                      <div
                        key={index}
                        className="text-xs text-primary hover:underline cursor-pointer p-2 rounded hover:bg-primary/5"
                      >
                        #{topic}
                      </div>
                    ),
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Post Creation */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">
                    Share with the community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-white">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      className="flex-1 justify-start text-muted-foreground"
                      onClick={() => {
                        // This will be handled by the enhanced posting system
                        const newPost = {
                          id: Date.now().toString(),
                          author: {
                            id: "user",
                            name: user.name,
                            title: generateProfileForDomain().title,
                            avatar: user.avatar,
                            isFollowed: false,
                          },
                          content: "What's on your mind?",
                          timestamp: new Date().toLocaleString(),
                          likes: 0,
                          comments: 0,
                          shares: 0,
                          isLiked: false,
                        };
                        setCommunityPosts((prev) => [newPost, ...prev]);
                        addActivity({
                          type: "community_post",
                          action: `Posted in ${userDomains?.find((d) => d.id === viewingCommunity)?.name || "Community"}`,
                          details: "Shared a new post with the community",
                          communityId: viewingCommunity,
                        });
                      }}
                    >
                      What's on your mind?
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Posts Feed */}
              <div className="space-y-4">
                {communityPosts.length > 0 ? (
                  communityPosts.map((post) => (
                    <Card key={post.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-white">
                              {post.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold text-sm">
                                    {post.author.name}
                                  </span>
                                  {post.author.isFollowed && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Following
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {post.author.title} • {post.timestamp}
                                </div>
                              </div>
                              {post.author.id === "user" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCommunityPosts((prev) =>
                                      prev.filter((p) => p.id !== post.id),
                                    );
                                  }}
                                  className="text-destructive hover:text-destructive"
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm mb-3 leading-relaxed">
                          {post.content}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto text-xs"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto text-xs"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto text-xs"
                            >
                              <Share className="w-4 h-4 mr-1" />
                              {post.shares}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="font-semibold mb-2">No posts yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Be the first to share something with the{" "}
                        {userDomains
                          ?.find((d) => d.id === viewingCommunity)
                          ?.name.toLowerCase()}{" "}
                        community!
                      </p>
                      <Button
                        onClick={() => {
                          const welcomePost = {
                            id: Date.now().toString(),
                            author: {
                              id: "user",
                              name: user.name,
                              title: generateProfileForDomain().title,
                              avatar: user.avatar,
                              isFollowed: false,
                            },
                            content: `Hello ${userDomains?.find((d) => d.id === viewingCommunity)?.name} community! Excited to connect and collaborate with everyone here. 👋`,
                            timestamp: new Date().toLocaleString(),
                            likes: 0,
                            comments: 0,
                            shares: 0,
                            isLiked: false,
                          };
                          setCommunityPosts([welcomePost]);
                          addActivity({
                            type: "community_post",
                            action: `First post in ${userDomains?.find((d) => d.id === viewingCommunity)?.name || "Community"}`,
                            details: "Introduced yourself to the community",
                            communityId: viewingCommunity,
                          });
                        }}
                      >
                        Create First Post
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "settings") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
                <div className="pt-4 border-t space-y-3">
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Enhanced Top Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold hidden sm:block">Dominic</span>
            </Link>

            {/* Main Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setActiveVerticalNav("profile");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "profile"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("connect");
                  setActiveVerticalNav("connect");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "connect"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Connect</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("discover");
                  setActiveVerticalNav("discover");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "discover"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Discover</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("community");
                  setActiveVerticalNav("community");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "community"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Community</span>
              </button>

              {viewingCommunity && (
                <button
                  onClick={() => {
                    setActiveTab("community-hub");
                    setActiveVerticalNav("community-hub");
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === "community-hub"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>
                    {userDomains?.find((d) => d.id === viewingCommunity)
                      ?.name || "Community"}{" "}
                    Hub
                  </span>
                </button>
              )}
            </div>

            {/* Right Side - Domain Switcher and User */}
            <div className="flex items-center space-x-4">
              {/* Domain Switcher Logo - Desktop */}
              {userDomains && userDomains.length > 0 && (
                <div className="hidden md:block relative">
                  {/* Logo button */}
                  <button
                    onClick={() => setDomainSwitcherOpen(!domainSwitcherOpen)}
                    className="flex items-center space-x-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary/20 hover:border-primary/50"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${getCurrentDomain().color} animate-pulse`}
                    ></div>
                    <div className="text-xs font-mono font-semibold text-primary">
                      {getCurrentDomain()
                        .name.split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Switch Domain
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${domainSwitcherOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown that appears on click */}
                  {domainSwitcherOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden z-[60] shadow-2xl animate-in slide-in-from-top-2 duration-300">
                      <div className="p-3 border-b border-primary/10">
                        <div className="text-sm font-semibold text-primary">
                          Switch Domain
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Choose your active learning domain
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {userDomains.map((domain, index) => (
                          <button
                            key={domain.id}
                            onClick={() => {
                              setSelectedDomain(domain.id);
                              setDomainSwitcherOpen(false);
                            }}
                            className={`w-full p-3 text-left hover:bg-primary/10 transition-all duration-200 border-b border-primary/5 last:border-b-0 ${
                              selectedDomain === domain.id
                                ? "bg-primary/15"
                                : ""
                            } transform hover:scale-[1.02]`}
                            style={{
                              animationDelay: `${index * 50}ms`,
                              transform: "translateZ(0)", // Force hardware acceleration
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-4 h-4 rounded-full ${domain.color} ${selectedDomain === domain.id ? "animate-pulse" : ""} flex items-center justify-center`}
                              >
                                <domain.icon className="w-2 h-2 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {domain.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {domain.progress}% complete
                                </div>
                                {userOnboardingData && (
                                  <div className="text-xs text-primary mt-1">
                                    Skills:{" "}
                                    {userOnboardingData.skills
                                      ?.slice(0, 2)
                                      .join(", ") || "None"}
                                  </div>
                                )}
                              </div>
                              {selectedDomain === domain.id && (
                                <div className="ml-auto flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                                  <CheckCircle className="w-4 h-4 text-primary" />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Click outside to close */}
                  {domainSwitcherOpen && (
                    <div
                      className="fixed inset-0 z-[55]"
                      onClick={() => setDomainSwitcherOpen(false)}
                    ></div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg"
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </button>
              </div>

              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>

              {/* User Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-muted/50 transition-all duration-200"
                >
                  <Avatar className="w-8 h-8">
                    {userOnboardingData?.avatar ? (
                      <img
                        src={userOnboardingData.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {user.avatar}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <ChevronDown
                    className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden z-[60] shadow-2xl animate-in slide-in-from-top-2 duration-300">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-primary/10">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          {userOnboardingData?.avatar ? (
                            <img
                              src={userOnboardingData.avatar}
                              alt="Profile"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <AvatarFallback className="bg-primary text-white">
                              {user.avatar}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-semibold text-sm">
                            {user.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.email}
                          </div>
                          {userOnboardingData && (
                            <div className="text-xs text-primary mt-1">
                              {userOnboardingData.experience} •{" "}
                              {userOnboardingData.domains?.length || 0} domains
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      >
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm">View Profile</span>
                      </Link>

                      <button
                        onClick={() => {
                          setActiveTab("edit-profile");
                          setActiveVerticalNav("edit-profile");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4 text-primary" />
                        <span className="text-sm">Edit Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("settings");
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4 text-primary" />
                        <span className="text-sm">Account Settings</span>
                      </button>

                      <div className="border-t border-primary/10 my-2"></div>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-destructive/10 rounded-lg transition-colors duration-200 text-destructive">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Click outside to close */}
                {userDropdownOpen && (
                  <div
                    className="fixed inset-0 z-[55]"
                    onClick={() => setUserDropdownOpen(false)}
                  ></div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t bg-background/95 backdrop-blur-sm mt-4">
              <div className="px-4 py-4 space-y-4">
                {/* Domain Selection for Mobile */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Select Domain
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {userDomains?.map((domain) => (
                      <button
                        key={domain.id}
                        onClick={() => {
                          setSelectedDomain(domain.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`p-3 text-left hover:bg-primary/10 rounded-lg border transition-all duration-200 ${
                          selectedDomain === domain.id
                            ? "bg-primary/20 border-primary/40"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${domain.color} ${selectedDomain === domain.id ? "animate-pulse" : ""}`}
                          ></div>
                          <div>
                            <div className="font-medium text-sm">
                              {domain.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {domain.progress}% complete
                            </div>
                            {userOnboardingData && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {userOnboardingData.experience
                                  ? `${userOnboardingData.experience} level`
                                  : ""}
                                {userOnboardingData.leetcodeRank &&
                                  ` • LeetCode: ${userOnboardingData.leetcodeRank}`}
                                {userOnboardingData.gfgRank &&
                                  ` • GFG: ${userOnboardingData.gfgRank}`}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    )) || (
                      <div className="text-center text-muted-foreground p-4">
                        <p className="text-sm">
                          Complete onboarding to see your domains
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation for Mobile */}
                <div className="border-t pt-4">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Navigation
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActiveTab("profile");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeTab === "profile"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("connect");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeTab === "connect"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Connect</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("discover");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeTab === "discover"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      <span className="text-sm">Discover</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("community");
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeTab === "community"
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Community</span>
                    </button>

                    {viewingCommunity && (
                      <button
                        onClick={() => {
                          setActiveTab("community-hub");
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                          activeTab === "community-hub"
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {userDomains?.find((d) => d.id === viewingCommunity)
                            ?.name || "Community"}{" "}
                          Hub
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content - Full Width */}
      <div className="w-full">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {renderMainContent()}
        </div>
      </div>

      {/* User Profile Modal */}
      {viewingProfile && (
        <UserProfileView
          profile={
            communityProfiles.find((p) => p.id === viewingProfile) || null
          }
          onClose={() => setViewingProfile(null)}
        />
      )}
    </div>
  );
}
