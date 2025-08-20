import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Star,
  Target,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Flame,
  Plus,
  ExternalLink,
  Activity,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  MessageCircle,
  Camera,
  Edit,
  Trophy,
  Upload,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import FollowingProjectsFeed from "@/components/FollowingProjectsFeed";
import { generateSampleProfiles } from "@/components/ProfileCard";

export default function UserProfile() {
  const { userId } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userOnboardingData, setUserOnboardingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Check if this is another user's profile (has userId param)
  const isOtherUserProfile = !!userId;

  // Generate sample profiles for other users
  const sampleProfiles = generateSampleProfiles();
  const targetProfile = userId
    ? sampleProfiles.find((p) => p.id === userId)
    : null;

  // Load user onboarding data from localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = localStorage.getItem("userOnboardingData");
        if (savedData) {
          setUserOnboardingData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Function to get user data - either current user or target profile
  const getUserData = () => {
    if (isOtherUserProfile && targetProfile) {
      return {
        name: targetProfile.name,
        title: targetProfile.title,
        level: Math.floor(Math.random() * 15) + 5,
        avatar: targetProfile.avatar,
        location: [
          "Mumbai, India",
          "Delhi, India",
          "Bangalore, India",
          "Pune, India",
          "Chennai, India",
        ][Math.floor(Math.random() * 5)],
        joinedDate: [
          "March 2023",
          "January 2023",
          "June 2022",
          "September 2023",
          "November 2022",
        ][Math.floor(Math.random() * 5)],
        streak: Math.floor(Math.random() * 30) + 5,
        github: targetProfile.name.toLowerCase().replace(" ", ""),
        linkedin: targetProfile.name.toLowerCase().replace(" ", "-"),
        bio: `Passionate developer specializing in ${targetProfile.domains.join(", ")}. ${targetProfile.experience} of experience in building scalable applications and working with modern technologies.`,
        overallProgress: targetProfile.rating * 20,
        activeGoals: Math.floor(Math.random() * 5) + 2,
        completedGoals: Math.floor(Math.random() * 20) + 5,
        stats: {
          totalCollaborations: targetProfile.projectsCollaborated,
          rating: targetProfile.rating,
          activeProjects: Math.floor(Math.random() * 4) + 1,
          testimonials: Math.floor(Math.random() * 25) + 5,
        },
        weeklyStats: {
          focusTime: Math.floor(Math.random() * 30) + 10 + "h",
          tasksDone: Math.floor(Math.random() * 20) + 5,
          milestones: Math.floor(Math.random() * 5) + 1,
          weeklyProgress: Math.floor(Math.random() * 20) + 5,
        },
        skills: targetProfile.skills,
        domains: targetProfile.domains,
        currentProjects: [
          {
            name: `${targetProfile.domains[0]} Project Alpha`,
            progress: Math.floor(Math.random() * 50) + 50,
            status: "In Progress",
            priority: "High",
            dueDate: "Dec 15, 2024",
            skills: targetProfile.skills.slice(0, 3),
          },
          {
            name: `${targetProfile.company} Integration`,
            progress: Math.floor(Math.random() * 40) + 20,
            status: "Planning",
            priority: "Medium",
            dueDate: "Jan 20, 2025",
            skills: targetProfile.skills.slice(1, 4),
          },
        ],
        recentCollaborations: [
          {
            name: "Rajesh Kumar",
            project: "E-commerce Platform",
            rating: 5,
            feedback: "Excellent frontend work and great communication",
            time: "2 days ago",
          },
          {
            name: "Priya Sharma",
            project: "Mobile Banking App",
            rating: 4,
            feedback: "Strong technical skills, delivered on time",
            time: "1 week ago",
          },
        ],
      };
    }

    // Default current user data
    return {
      name: "Aditya Singh",
      title: "Goal-Driven Developer | React Specialist | Community Mentor",
      level: 12,
      avatar: "AS",
      location: "Mumbai, India",
      joinedDate: "March 2023",
      streak: 15,
      github: "adityasingh",
      linkedin: "aditya-singh-dev",
      bio: "Passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Love building scalable applications and mentoring upcoming developers.",
      overallProgress: 68,
      activeGoals: 3,
      completedGoals: 12,
      stats: {
        totalCollaborations: 24,
        rating: 4.8,
        activeProjects: 3,
        testimonials: 18,
      },
      weeklyStats: {
        focusTime: "28h",
        tasksDone: 15,
        milestones: 3,
        weeklyProgress: 12,
      },
      currentProjects: [
        {
          name: "E-commerce Dashboard",
          progress: 75,
          status: "In Progress",
          priority: "High",
          dueDate: "Dec 15, 2024",
          skills: ["React", "TypeScript", "Tailwind"],
        },
        {
          name: "Mobile Learning App",
          progress: 45,
          status: "In Progress",
          priority: "Medium",
          dueDate: "Jan 20, 2025",
          skills: ["React Native", "Node.js", "MongoDB"],
        },
        {
          name: "AI Chat Platform",
          progress: 30,
          status: "Planning",
          priority: "Low",
          dueDate: "Feb 10, 2025",
          skills: ["Python", "FastAPI", "OpenAI"],
        },
      ],
      recentCollaborations: [
        {
          name: "Rajesh Kumar",
          project: "E-commerce Platform",
          rating: 5,
          feedback: "Excellent frontend work and great communication",
          time: "2 days ago",
        },
        {
          name: "Priya Sharma",
          project: "Mobile Banking App",
          rating: 4,
          feedback: "Strong technical skills, delivered on time",
          time: "1 week ago",
        },
        {
          name: "Arjun Patel",
          project: "Data Analytics Dashboard",
          rating: 5,
          feedback: "Outstanding problem-solving abilities",
          time: "2 weeks ago",
        },
      ],
    };
  };

  const user = getUserData();

  const handleConnect = () => {
    setIsConnected(!isConnected);
    // In real app, this would make an API call to connect/disconnect
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold hidden sm:block">Dominic</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/community"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Community
              </Link>
              <Link
                to="/mentors"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Mentors
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
              >
                <Bell className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-300 hover:text-white"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* User Avatar */}
              <div className="hidden md:flex items-center space-x-2">
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800 mt-4 pt-4">
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  to="/community"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                >
                  Community
                </Link>
                <Link
                  to="/mentors"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                >
                  Mentors
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl animate-in slide-up duration-500">
        {/* Profile Header Section */}
        <div className="animate-in slide-up duration-500 delay-100 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Profile Photo */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-gray-600">
                    <AvatarFallback className="bg-primary text-white text-4xl font-bold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <Badge className="bg-green-600 hover:bg-green-700">
                          <Star className="w-3 h-3 mr-1" />
                          Level {user.level}
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-300 mb-3">{user.title}</p>
                      <p className="text-gray-400 leading-relaxed max-w-2xl">
                        {user.bio}
                      </p>
                    </div>
                    {isOtherUserProfile ? (
                      <Button
                        onClick={handleConnect}
                        className={
                          isConnected
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-primary hover:bg-primary/90"
                        }
                      >
                        {isConnected ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Connected
                          </>
                        ) : (
                          <>
                            <Users className="w-4 h-4 mr-2" />
                            Connect
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button className="bg-primary hover:bg-primary/90">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {user.joinedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {user.streak}-day streak
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://github.com/${user.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href={`https://linkedin.com/in/${user.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collaboration Stats Section */}
        <div className="animate-in slide-up duration-500 delay-200 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {user.stats.totalCollaborations}
                </div>
                <div className="text-sm text-gray-400">
                  Total Collaborations
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {user.stats.rating}
                </div>
                <div className="text-sm text-gray-400">Rating</div>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(user.stats.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {user.stats.activeProjects}
                </div>
                <div className="text-sm text-gray-400">Active Projects</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {user.stats.testimonials}
                </div>
                <div className="text-sm text-gray-400">Testimonials</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Two Column Layout: Activity & Projects */}
        <div className="animate-in slide-up duration-500 delay-300 mb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Activity Overview */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* This Week Stats */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    This Week
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {user.weeklyStats.focusTime}
                      </div>
                      <div className="text-xs text-gray-400">Focus Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {user.weeklyStats.tasksDone}
                      </div>
                      <div className="text-xs text-gray-400">Tasks Done</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {user.weeklyStats.milestones}
                      </div>
                      <div className="text-xs text-gray-400">Milestones</div>
                    </div>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      Weekly Progress
                    </span>
                    <span className="text-sm font-bold text-green-400">
                      +{user.weeklyStats.weeklyProgress}%
                    </span>
                  </div>
                  <Progress value={75} className="h-2 bg-gray-700" />
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-gray-400">
                    Recent Activity
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        id: 1,
                        action: "Priya Sharma connected with you",
                        time: "30 minutes ago",
                        type: "connection",
                        icon: "👋",
                      },
                      {
                        id: 2,
                        action: "Rahul Kumar liked your profile",
                        time: "1 hour ago",
                        type: "like",
                        icon: "❤️",
                      },
                      {
                        id: 3,
                        action: "Completed React Advanced Patterns",
                        time: "2 hours ago",
                        type: "completed",
                      },
                      {
                        id: 4,
                        action: "Anjali Patel wants to collaborate",
                        time: "4 hours ago",
                        type: "collaboration",
                        icon: "🤝",
                      },
                      {
                        id: 5,
                        action: "Started TypeScript Deep Dive",
                        time: "5 hours ago",
                        type: "started",
                      },
                      {
                        id: 6,
                        action: "3 new people viewed your profile",
                        time: "6 hours ago",
                        type: "views",
                        icon: "👀",
                      },
                      {
                        id: 7,
                        action: "Mentored 3 junior developers",
                        time: "1 day ago",
                        type: "mentor",
                      },
                    ].slice(0, 5).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg transition-colors hover:bg-gray-700/70"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "completed"
                              ? "bg-green-400"
                              : activity.type === "started"
                                ? "bg-blue-400"
                                : "bg-orange-400"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {activity.action}
                          </div>
                          <div className="text-xs text-gray-400">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: Current Projects */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    Current Projects
                  </CardTitle>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-1" />
                    New Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.currentProjects.map((project, index) => (
                  <Card
                    key={index}
                    className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                project.status === "In Progress"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {project.status}
                            </Badge>
                            <Badge
                              variant={
                                project.priority === "High"
                                  ? "destructive"
                                  : project.priority === "Medium"
                                    ? "default"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {project.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            {project.progress}%
                          </div>
                          <div className="text-xs text-gray-400">
                            Due {project.dueDate}
                          </div>
                        </div>
                      </div>

                      <Progress value={project.progress} className="h-2 mb-3" />

                      <div>
                        <div className="text-xs text-gray-400 mb-2">
                          Skills Working With:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="outline"
                              className="text-xs bg-gray-600 border-gray-500"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Sections: Following Projects & Recent Collaborations */}
        <div className="animate-in slide-up duration-500 delay-400">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Projects from People You Follow */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Projects from People You Follow
                  <Badge variant="secondary" className="text-xs animate-pulse">
                    Live Updates
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto custom-scrollbar">
                <FollowingProjectsFeed selectedDomain="design" />
              </CardContent>
            </Card>

            {/* Recent Collaborations */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-yellow-500" />
                  Recent Collaboration Ratings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.recentCollaborations.map((collab, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-primary transition-all duration-300 hover:scale-[1.02] hover:bg-gray-700 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-semibold">
                              {collab.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {collab.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {collab.project}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 italic mb-2">
                            "{collab.feedback}"
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < collab.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              {collab.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
