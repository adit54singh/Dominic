import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Palette,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import DiscoverFeed from "@/components/DiscoverFeed";
import UserProfileView from "@/components/UserProfileView";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeVerticalNav, setActiveVerticalNav] = useState("profile");
  const [selectedDomain, setSelectedDomain] = useState("web-dev");
  const [domainSwitcherOpen, setDomainSwitcherOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);

  // Mock user data (in real app, this would come from auth context)
  const user = {
    name: "Aditya Singh",
    email: "aditya@example.com",
    avatar: "AS",
    joinedDate: "Jan 2024"
  };

  // User's enrolled domains with specific data
  const userDomains = [
    {
      id: "web-dev",
      name: "Web Development",
      icon: Code,
      color: "bg-blue-500",
      progress: 75,
      projectsCompleted: 8,
      mentorshipHours: 30,
      currentProjects: ["E-commerce Platform", "Task Manager"],
      upcomingEvents: [
        { name: "React Advanced Workshop", date: "Tomorrow 6:00 PM" },
        { name: "Full Stack Bootcamp", date: "This Saturday 10:00 AM" }
      ]
    },
    {
      id: "mobile-dev",
      name: "Mobile Development",
      icon: Smartphone,
      color: "bg-green-500",
      progress: 45,
      projectsCompleted: 3,
      mentorshipHours: 15,
      currentProjects: ["Fitness Tracker App"],
      upcomingEvents: [
        { name: "Flutter Masterclass", date: "Wednesday 7:00 PM" },
        { name: "iOS Development Q&A", date: "Friday 5:00 PM" }
      ]
    },
    {
      id: "data-science",
      name: "Data Science",
      icon: Database,
      color: "bg-purple-500",
      progress: 20,
      projectsCompleted: 1,
      mentorshipHours: 8,
      currentProjects: ["Sales Analytics Dashboard"],
      upcomingEvents: [
        { name: "Python for Data Science", date: "Next Monday 4:00 PM" }
      ]
    }
  ];

  const getCurrentDomain = () => {
    return userDomains.find(domain => domain.id === selectedDomain) || userDomains[0];
  };

  // Sample user profiles for Connect section
  const communityProfiles = [
    {
      id: "1",
      name: "Rajesh Kumar",
      title: "Full Stack Developer",
      location: "Bangalore, India",
      avatar: "RK",
      bio: "Passionate about building scalable web applications. Love mentoring juniors and collaborating on open-source projects. Always excited to learn new technologies!",
      achievements: ["🏆 Hackathon Winner 2024", "🚀 Led 5+ successful projects", "⭐ 4.9/5 mentor rating"],
      communities: ["Web Development", "React Enthusiasts", "Open Source Contributors"],
      projects: 12,
      connections: 156,
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      experience: "3 years"
    },
    {
      id: "2",
      name: "Priya Sharma",
      title: "Mobile App Developer",
      location: "Mumbai, India",
      avatar: "PS",
      bio: "Flutter enthusiast with a passion for creating beautiful, user-friendly mobile experiences. Experienced in both iOS and Android development.",
      achievements: ["📱 10+ apps published", "🎯 100k+ downloads", "🌟 Google Play featured"],
      communities: ["Flutter Developers", "Mobile UI/UX", "Startup Builders"],
      projects: 8,
      connections: 89,
      skills: ["Flutter", "Dart", "Firebase", "Swift"],
      experience: "2 years"
    },
    {
      id: "3",
      name: "Arjun Patel",
      title: "Data Scientist",
      location: "Pune, India",
      avatar: "AP",
      bio: "ML engineer passionate about solving real-world problems with AI. Love working on recommendation systems and computer vision projects.",
      achievements: ["🧠 ML model in production", "📊 Kaggle Expert", "🔬 2 research papers"],
      communities: ["Data Science Hub", "AI/ML Researchers", "Python Developers"],
      projects: 6,
      connections: 234,
      skills: ["Python", "TensorFlow", "Scikit-learn", "SQL"],
      experience: "4 years"
    },
    {
      id: "4",
      name: "Sneha Gupta",
      title: "UI/UX Designer",
      location: "Delhi, India",
      avatar: "SG",
      bio: "Creating delightful user experiences through thoughtful design. Specialize in design systems and user research. Always ready to collaborate!",
      achievements: ["🎨 Design system creator", "🏅 UX competition winner", "💡 50+ designs shipped"],
      communities: ["Design Thinkers", "UX Researchers", "Figma Masters"],
      projects: 15,
      connections: 198,
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      experience: "3 years"
    },
    {
      id: "5",
      name: "Karthik Reddy",
      title: "DevOps Engineer",
      location: "Hyderabad, India",
      avatar: "KR",
      bio: "Cloud infrastructure enthusiast. Help teams deploy faster and more reliably. Love automating everything and building robust CI/CD pipelines.",
      achievements: ["☁️ AWS certified", "⚡ 99.9% uptime achieved", "🔧 10+ teams migrated to cloud"],
      communities: ["DevOps India", "Cloud Architects", "Kubernetes Users"],
      projects: 9,
      connections: 167,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      experience: "3 years"
    },
    {
      id: "6",
      name: "Ananya Singh",
      title: "Blockchain Developer",
      location: "Chennai, India",
      avatar: "AS",
      bio: "Building the future of decentralized applications. Passionate about Web3, smart contracts, and creating transparent financial systems.",
      achievements: ["⛓️ 5+ DApps deployed", "🪙 Token economics expert", "🔐 Security audit certified"],
      communities: ["Blockchain Builders", "Web3 Developers", "Crypto Enthusiasts"],
      projects: 7,
      connections: 143,
      skills: ["Solidity", "Web3.js", "Ethereum", "React"],
      experience: "2 years"
    },
    {
      id: "7",
      name: "Rohan Joshi",
      title: "Product Manager",
      location: "Gurgaon, India",
      avatar: "RJ",
      bio: "Bridging the gap between business and technology. Love building products that solve real user problems. Data-driven decision maker.",
      achievements: ["📈 3 successful product launches", "🎯 40% user growth achieved", "🏆 Product of the year 2023"],
      communities: ["Product Managers India", "Startup Ecosystem", "Growth Hackers"],
      projects: 11,
      connections: 289,
      skills: ["Product Strategy", "Analytics", "User Research", "Agile"],
      experience: "4 years"
    },
    {
      id: "8",
      name: "Meera Krishnan",
      title: "Cybersecurity Analyst",
      location: "Kochi, India",
      avatar: "MK",
      bio: "Protecting digital assets and educating teams about security best practices. Ethical hacker with a mission to make the internet safer.",
      achievements: ["🛡️ Prevented 10+ security breaches", "🔍 Bug bounty hunter", "🎓 Security trainer for 500+ developers"],
      communities: ["Cybersecurity India", "Ethical Hackers", "InfoSec Professionals"],
      projects: 5,
      connections: 176,
      skills: ["Penetration Testing", "SIEM", "Risk Assessment", "Python"],
      experience: "3 years"
    }
  ];

  // Generate profile data based on selected domain
  const generateProfileForDomain = () => {
    const currentDomain = getCurrentDomain();
    return {
      id: 'user',
      name: user.name,
      title: selectedDomain === 'web-dev' ? 'Full Stack Developer' :
             selectedDomain === 'mobile-dev' ? 'Mobile App Developer' :
             'Data Scientist',
      company: 'Tech Startup',
      avatar: user.avatar,
      experience: '2 Years',
      leetcodeRank: '#8,142',
      domains: [currentDomain.name],
      projectsCollaborated: currentDomain.projectsCompleted,
      mentorshipHours: currentDomain.mentorshipHours,
      skills: selectedDomain === 'web-dev' ? ['React', 'Node.js', 'TypeScript'] :
              selectedDomain === 'mobile-dev' ? ['Flutter', 'React Native', 'Swift'] :
              ['Python', 'TensorFlow', 'SQL']
    };
  };

  const renderMainContent = () => {
    switch (activeVerticalNav) {
      case "discover":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Discover</h2>
              <p className="text-muted-foreground">
                Get inspired by verified professionals sharing their journey, work culture, and latest projects
              </p>
            </div>
            <DiscoverFeed selectedDomain={selectedDomain} />
          </div>
        );

      case "community":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Community Feed</h2>
            <div className="space-y-4">
              {[
                {
                  author: "Priya Sharma",
                  time: "2 hours ago",
                  content: "Just completed my first React project! Thanks to the amazing mentors in the Web Dev community 🚀",
                  likes: 24,
                  comments: 8
                },
                {
                  author: "Rahul Kumar",
                  time: "4 hours ago", 
                  content: "Looking for study partners for the upcoming coding competition. Anyone interested in team formation?",
                  likes: 18,
                  comments: 12
                },
                {
                  author: "Ananya Patel",
                  time: "6 hours ago",
                  content: "Sharing my latest UI design for a food delivery app. Would love to get feedback from the design community!",
                  likes: 35,
                  comments: 15
                }
              ].map((post, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">{post.author}</span>
                          <span className="text-sm text-muted-foreground">{post.time}</span>
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <button className="flex items-center space-x-1 hover:text-foreground">
                            <Activity className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-foreground">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "domains":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Learning Domains</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Web Development", students: "2.5k", progress: "In Progress" },
                { name: "Mobile Development", students: "1.8k", progress: "Enrolled" },
                { name: "Data Science", students: "3.2k", progress: "Not Enrolled" },
                { name: "UI/UX Design", students: "1.9k", progress: "Not Enrolled" },
                { name: "DevOps", students: "1.4k", progress: "Not Enrolled" },
                { name: "Cybersecurity", students: "2.1k", progress: "Not Enrolled" }
              ].map((domain, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{domain.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{domain.students} students</span>
                        <Badge 
                          variant={domain.progress === "In Progress" ? "default" : 
                                  domain.progress === "Enrolled" ? "secondary" : "outline"}
                        >
                          {domain.progress}
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        variant={domain.progress === "Not Enrolled" ? "default" : "outline"}
                      >
                        {domain.progress === "Not Enrolled" ? "Join Domain" : "Continue Learning"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
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

            {/* Main Navigation - Hidden on mobile, shown on larger screens */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setActiveVerticalNav("profile");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "profile" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
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
                  activeTab === "connect" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Connect</span>
              </button>

              <button
                onClick={() => {
                  setActiveVerticalNav("discover");
                  setActiveTab("discover");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeVerticalNav === "discover" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Discover</span>
              </button>

              <button
                onClick={() => {
                  setActiveVerticalNav("community");
                  setActiveTab("community");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeVerticalNav === "community" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Community</span>
              </button>

              <button
                onClick={() => {
                  setActiveVerticalNav("domains");
                  setActiveTab("domains");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeVerticalNav === "domains" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Domains</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("settings");
                  setActiveVerticalNav("settings");
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "settings" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>

            {/* Right Side - Domain Switcher and User */}
            <div className="flex items-center space-x-4">
              {/* Domain Switcher - Desktop */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setDomainSwitcherOpen(!domainSwitcherOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-900/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-200"
                >
                  <div className={`w-2 h-2 rounded-full ${getCurrentDomain().color} animate-pulse`}></div>
                  <span className="text-sm font-mono">{getCurrentDomain().name}</span>
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform ${domainSwitcherOpen ? 'rotate-180' : ''}`} />
                </button>

                {domainSwitcherOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden z-50 shadow-2xl">
                    {userDomains.map((domain) => (
                      <button
                        key={domain.id}
                        onClick={() => {
                          setSelectedDomain(domain.id);
                          setDomainSwitcherOpen(false);
                        }}
                        className={`w-full p-3 text-left hover:bg-primary/10 transition-all duration-200 border-b border-primary/10 last:border-b-0 ${
                          selectedDomain === domain.id ? 'bg-primary/20' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${domain.color} ${selectedDomain === domain.id ? 'animate-pulse' : ''}`}></div>
                          <div>
                            <div className="font-mono text-xs text-white">{domain.name}</div>
                            <div className="text-xs text-muted-foreground">{domain.progress}% complete</div>
                          </div>
                          {selectedDomain === domain.id && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setDomainSwitcherOpen(!domainSwitcherOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${getCurrentDomain().color} animate-pulse`}></div>
                  <span className="text-sm font-mono hidden sm:block">{getCurrentDomain().name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${domainSwitcherOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-white text-sm">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Mobile Navigation Menu - Full Width */}
          {domainSwitcherOpen && (
            <div className="lg:hidden border-t bg-background/95 backdrop-blur-sm mt-4">
              <div className="px-4 py-4 space-y-4">
                {/* Domain Selection for Mobile */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Select Domain
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {userDomains.map((domain) => (
                      <button
                        key={domain.id}
                        onClick={() => {
                          setSelectedDomain(domain.id);
                          setDomainSwitcherOpen(false);
                        }}
                        className={`p-3 text-left hover:bg-primary/10 rounded-lg border transition-all duration-200 ${
                          selectedDomain === domain.id ? 'bg-primary/20 border-primary/40' : 'border-border'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${domain.color} ${selectedDomain === domain.id ? 'animate-pulse' : ''}`}></div>
                          <div>
                            <div className="font-medium text-sm">{domain.name}</div>
                            <div className="text-xs text-muted-foreground">{domain.progress}% complete</div>
                          </div>
                          {selectedDomain === domain.id && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
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
                        setActiveVerticalNav("profile");
                        setDomainSwitcherOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeTab === "profile" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("connect");
                        setActiveVerticalNav("connect");
                        setDomainSwitcherOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeTab === "connect" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Connect</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveVerticalNav("discover");
                        setActiveTab("discover");
                        setDomainSwitcherOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeVerticalNav === "discover" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                      <span className="text-sm">Discover</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveVerticalNav("community");
                        setActiveTab("community");
                        setDomainSwitcherOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeVerticalNav === "community" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Community</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveVerticalNav("domains");
                        setActiveTab("domains");
                        setDomainSwitcherOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeVerticalNav === "domains" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      <Target className="w-4 h-4" />
                      <span className="text-sm">Domains</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab("settings");
                        setActiveVerticalNav("settings");
                        setDomainSwitcherOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                        activeTab === "settings" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="flex">
        {/* Left Expandable Sidebar */}
        <div
          className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-background/95 backdrop-blur-sm border-r flex flex-col py-6 z-40 transition-all duration-300 ${
            sidebarExpanded ? 'w-72' : 'w-16'
          }`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          {/* User Info */}
          <div className="px-4 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className={`transition-all duration-300 ${sidebarExpanded ? 'w-10 h-10' : 'w-8 h-8'}`}>
                <AvatarFallback className="bg-primary text-white text-sm">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={`transition-all duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0'} overflow-hidden`}>
                <div className="font-semibold whitespace-nowrap">{user.name}</div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Techy Domain Switcher */}
          <div className={`px-4 mb-6 transition-all duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Domain Matrix
            </div>
            <div className="relative">
              <button
                onClick={() => setDomainSwitcherOpen(!domainSwitcherOpen)}
                className="w-full bg-slate-900/50 border border-primary/20 rounded-lg px-3 py-2.5 text-sm text-left hover:border-primary/40 transition-all duration-200 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getCurrentDomain().color.replace('bg-', 'bg-')} animate-pulse`}></div>
                    <span className="font-mono text-xs">{getCurrentDomain().name}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-200 ${domainSwitcherOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {domainSwitcherOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden z-50 shadow-2xl">
                  {userDomains.map((domain, index) => (
                    <button
                      key={domain.id}
                      onClick={() => {
                        setSelectedDomain(domain.id);
                        setDomainSwitcherOpen(false);
                      }}
                      className={`w-full p-3 text-left hover:bg-primary/10 transition-all duration-200 border-b border-primary/10 last:border-b-0 group ${
                        selectedDomain === domain.id ? 'bg-primary/20' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${domain.color} ${selectedDomain === domain.id ? 'animate-pulse' : ''}`}></div>
                        <div>
                          <div className="font-mono text-xs text-white">{domain.name}</div>
                          <div className="text-xs text-muted-foreground">{domain.progress}% complete</div>
                        </div>
                        {selectedDomain === domain.id && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2 px-4 mb-6">
            <button
              onClick={() => {
                setActiveTab("profile");
                setActiveVerticalNav("profile");
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                activeTab === "profile" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span className={`transition-all duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap`}>
                Profile Home
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("connect");
                setActiveVerticalNav("connect");
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                activeTab === "connect" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className={`transition-all duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap`}>
                Connect
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setActiveVerticalNav("settings");
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                activeTab === "settings" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span className={`transition-all duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap`}>
                Settings
              </span>
            </button>
          </div>

          {/* Domain Progress */}
          <div className={`px-4 mb-6 transition-all duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Progress Matrix
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-mono">{getCurrentDomain().name}</span>
                <span className="text-primary font-bold">{getCurrentDomain().progress}%</span>
              </div>
              <div className="w-full bg-slate-900/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 transition-all duration-500 relative"
                  style={{width: `${getCurrentDomain().progress}%`}}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`px-4 mt-auto transition-all duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'ml-72' : 'ml-16'}`}>
          <div className="container mx-auto px-6 py-8">
            {activeTab === "profile" || activeVerticalNav === "profile" ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">
                      {getCurrentDomain().name} Collaboration Hub
                    </h1>
                    <p className="text-muted-foreground">
                      Connect, collaborate, and build amazing projects with peers
                    </p>
                  </div>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="space-y-6">
                      <ProfileCard profile={generateProfileForDomain()} />

                      {/* Domain-Specific Stats */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {getCurrentDomain().name} Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="font-semibold">{getCurrentDomain().progress}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Projects Completed</span>
                            <span className="font-semibold">{getCurrentDomain().projectsCompleted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Mentorship Hours</span>
                            <span className="font-semibold">{getCurrentDomain().mentorshipHours}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    {/* Project Collaboration Content */}
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Activity className="w-5 h-5 text-primary" />
                              <span>My Active Projects</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {getCurrentDomain().currentProjects.length > 0 ? (
                              getCurrentDomain().currentProjects.map((project, index) => (
                                <div key={index} className="p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="font-medium text-sm">{project}</div>
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {index === 0 ? '3 collaborators' : '5 collaborators'} •
                                        {index === 0 ? ' 2 weeks left' : ' 1 month left'}
                                      </div>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                      {index === 0 ? 'Frontend' : 'Full Stack'}
                                    </Badge>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No active projects</p>
                            )}
                            <Button size="sm" className="w-full mt-3">
                              Join New Project
                            </Button>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Calendar className="w-5 h-5 text-orange-500" />
                              <span>Project Deadlines</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-3">
                              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium text-sm text-red-700 dark:text-red-400">E-commerce MVP</div>
                                    <div className="text-xs text-muted-foreground">Due in 3 days</div>
                                  </div>
                                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                                </div>
                              </div>

                              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium text-sm text-yellow-700 dark:text-yellow-400">Mobile App Prototype</div>
                                    <div className="text-xs text-muted-foreground">Due in 1 week</div>
                                  </div>
                                  <Badge variant="outline" className="text-xs border-yellow-500/50">Soon</Badge>
                                </div>
                              </div>

                              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium text-sm text-green-700 dark:text-green-400">Data Pipeline</div>
                                    <div className="text-xs text-muted-foreground">Due in 3 weeks</div>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">On Track</Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Target className="w-5 h-5 text-primary" />
                            <span>Learning Goals Progress</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>React Mastery</span>
                              <span className="text-muted-foreground">75%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: "75%"}}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>LeetCode Practice</span>
                              <span className="text-muted-foreground">60%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-accent h-2 rounded-full" style={{width: "60%"}}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Portfolio Projects</span>
                              <span className="text-muted-foreground">40%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-success h-2 rounded-full" style={{width: "40%"}}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span>Upcoming Events</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">React Workshop</div>
                              <div className="text-xs text-muted-foreground">Tomorrow at 6:00 PM</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-accent/5 rounded-lg">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">Coding Competition</div>
                              <div className="text-xs text-muted-foreground">This Saturday at 10:00 AM</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === "connect" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">Connect with Community</h1>
                    <p className="text-muted-foreground">
                      Discover talented peers ready to collaborate on exciting projects
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Filter by Domain
                    </Button>
                    <Button size="sm">
                      View All
                    </Button>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {communityProfiles.map((profile) => (
                    <Card key={profile.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group w-full">
                      <CardContent className="p-6">
                        {/* Profile Header */}
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {profile.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {profile.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{profile.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                              <span>📍 {profile.location}</span>
                            </p>
                          </div>
                        </div>

                        {/* Bio */}
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {profile.bio}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
                          <div className="text-center">
                            <div className="font-semibold text-sm">{profile.projects}</div>
                            <div className="text-xs text-muted-foreground">Projects</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-sm">{profile.connections}</div>
                            <div className="text-xs text-muted-foreground">Connections</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-sm">{profile.experience}</div>
                            <div className="text-xs text-muted-foreground">Experience</div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Skills</div>
                          <div className="flex flex-wrap gap-1">
                            {profile.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {profile.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{profile.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="mb-4">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Top Achievements</div>
                          <div className="space-y-1">
                            {profile.achievements.slice(0, 2).map((achievement, index) => (
                              <div key={index} className="text-xs bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded">
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Communities */}
                        <div className="mb-4">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Communities</div>
                          <div className="flex flex-wrap gap-1">
                            {profile.communities.slice(0, 2).map((community, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {community}
                              </Badge>
                            ))}
                            {profile.communities.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{profile.communities.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            Connect
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setViewingProfile(profile.id)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center">
                  <Button variant="outline">
                    Load More Profiles
                  </Button>
                </div>
              </div>
            ) : activeTab === "discover" ? (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Discover</h2>
                  <p className="text-muted-foreground">
                    Get inspired by verified professionals sharing their journey, work culture, and latest projects
                  </p>
                </div>
                <DiscoverFeed selectedDomain={selectedDomain} />
              </div>
            ) : activeTab === "settings" ? (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Settings</h1>
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
                      <div className="pt-4 border-t">
                        <Button variant="destructive">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              renderMainContent()
            )}
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {viewingProfile && (
        <UserProfileView
          profile={communityProfiles.find(p => p.id === viewingProfile) || null}
          onClose={() => setViewingProfile(null)}
        />
      )}
    </div>
  );
}
