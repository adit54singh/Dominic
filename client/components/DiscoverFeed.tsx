import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Play,
  CheckCircle,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Eye,
  Github,
  Calendar,
  Target,
  ExternalLink,
  Send,
  ChevronDown,
  ChevronUp,
  Code,
  Database,
  Smartphone,
  Shield,
  Gamepad,
  Cloud,
  Zap,
  Bot,
  Monitor,
  Cpu,
  Palette,
} from "lucide-react";

interface Post {
  id: string;
  type: "reel" | "post" | "carousel" | "project";
  author: {
    name: string;
    title: string;
    avatar: string;
    verified: boolean;
    company: string;
    followers: string;
  };
  content: {
    title: string;
    description: string;
    media?: string;
    tags: string[];
    location?: string;
    duration?: string;
  };
  project?: {
    techStack: string[];
    teamSize: number;
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    lookingFor: string[];
    repository?: string;
    openPositions: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
    collaborators?: number;
  };
  timestamp: string;
  domain: string;
}

interface DiscoverFeedProps {
  selectedDomain: string;
  joinedProjects?: Array<any>;
  onJoinProject?: (project: any) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    case "Intermediate":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    case "Advanced":
      return "bg-red-500/10 text-red-700 dark:text-red-400";
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

const getDomainIcon = (domain: string) => {
  switch (domain) {
    case "web-dev":
    case "software-dev":
      return Code;
    case "mobile-dev":
      return Smartphone;
    case "data-science":
      return Database;
    case "design":
      return Palette;
    case "cybersecurity":
      return Shield;
    case "game-dev":
      return Gamepad;
    case "cloud-computing":
      return Cloud;
    case "blockchain":
      return Zap;
    case "quantum-computing":
      return Cpu;
    case "ar-vr":
      return Monitor;
    case "iot":
    case "robotics":
      return Bot;
    default:
      return Code;
  }
};

export default function DiscoverFeed({
  selectedDomain,
  joinedProjects = [],
  onJoinProject,
}: DiscoverFeedProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  // Dynamic posts generation based on selected domain
  const posts = useMemo((): Post[] => {
    const generateDomainSpecificPosts = (domain: string): Post[] => {
      const DomainIcon = getDomainIcon(domain);
      
      const basePosts: Post[] = [
        {
          id: `${domain}-1`,
          type: "reel",
          author: {
            name: "Tech Expert",
            title: `Senior ${domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Engineer`,
            avatar: "TE",
            verified: true,
            company: "TechCorp",
            followers: "12.5k",
          },
          content: {
            title: `Day in the life: ${domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Developer 🚀`,
            description: `Join me for a typical day working with cutting-edge ${domain.replace(/-/g, ' ')} technologies. From morning standups to solving complex challenges!`,
            media: "reel_placeholder",
            tags: [domain.replace(/-/g, ' '), "Tech Life", "Development", "Career"],
            location: "Tech Hub, India",
            duration: "2:15",
          },
          engagement: {
            likes: Math.floor(Math.random() * 3000) + 1000,
            comments: Math.floor(Math.random() * 200) + 50,
            shares: Math.floor(Math.random() * 100) + 20,
            views: Math.floor(Math.random() * 50000) + 10000,
          },
          timestamp: "2 hours ago",
          domain: domain,
        },
        {
          id: `${domain}-2`,
          type: "post",
          author: {
            name: "Innovation Leader",
            title: `${domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Architect`,
            avatar: "IL",
            verified: true,
            company: "Innovation Labs",
            followers: "8.2k",
          },
          content: {
            title: `Breaking: New breakthrough in ${domain.replace(/-/g, ' ')} technology! 🎉`,
            description: `Just implemented a revolutionary approach in ${domain.replace(/-/g, ' ')} that increased performance by 300%! Here's what we learned and how you can apply these principles in your own projects.`,
            tags: [domain.replace(/-/g, ' '), "Innovation", "Performance", "Best Practices"],
            location: "Bangalore, India",
          },
          engagement: {
            likes: Math.floor(Math.random() * 5000) + 2000,
            comments: Math.floor(Math.random() * 300) + 100,
            shares: Math.floor(Math.random() * 200) + 50,
          },
          timestamp: "4 hours ago",
          domain: domain,
        },
        {
          id: `${domain}-project`,
          type: "project",
          author: {
            name: "Project Leader",
            title: `${domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Specialist`,
            avatar: "PL",
            verified: false,
            company: "Open Source Contributor",
            followers: "3.4k",
          },
          content: {
            title: `Revolutionary ${domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Project`,
            description: `Building an innovative ${domain.replace(/-/g, ' ')} solution that will change how we approach modern development. Join our passionate team!`,
            tags: [domain.replace(/-/g, ' '), "Open Source", "Innovation", "Collaboration"],
          },
          project: {
            techStack: getDomainTechStack(domain),
            teamSize: Math.floor(Math.random() * 8) + 3,
            duration: `${Math.floor(Math.random() * 6) + 2} months`,
            difficulty: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)] as "Beginner" | "Intermediate" | "Advanced",
            lookingFor: getDomainRoles(domain),
            repository: `github.com/${domain}-project/app`,
            openPositions: Math.floor(Math.random() * 5) + 1,
          },
          engagement: {
            likes: Math.floor(Math.random() * 500) + 100,
            comments: Math.floor(Math.random() * 100) + 20,
            shares: Math.floor(Math.random() * 50) + 10,
            collaborators: Math.floor(Math.random() * 20) + 5,
          },
          timestamp: "6 hours ago",
          domain: domain,
        },
      ];

      return basePosts;
    };

    const getDomainTechStack = (domain: string): string[] => {
      const techStacks: Record<string, string[]> = {
        "web-dev": ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
        "mobile-dev": ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        "data-science": ["Python", "TensorFlow", "PyTorch", "Jupyter", "Pandas"],
        "design": ["Figma", "Adobe XD", "Sketch", "Principle", "After Effects"],
        "cybersecurity": ["Kali Linux", "Metasploit", "Wireshark", "OWASP", "Python"],
        "game-dev": ["Unity", "Unreal Engine", "C#", "C++", "Blender"],
        "cloud-computing": ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
        "blockchain": ["Solidity", "Web3.js", "Hardhat", "Ethereum", "Smart Contracts"],
        "quantum-computing": ["Qiskit", "Cirq", "Q#", "Python", "Linear Algebra"],
        "ar-vr": ["Unity", "Unreal Engine", "ARKit", "ARCore", "WebXR"],
        "iot": ["Arduino", "Raspberry Pi", "Python", "C++", "MQTT"],
        "robotics": ["ROS", "Python", "C++", "MATLAB", "Computer Vision"],
        "devops": ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"],
        "software-dev": ["Java", "Python", "React", "Spring Boot", "PostgreSQL"],
      };
      return techStacks[domain] || ["JavaScript", "React", "Node.js", "MongoDB"];
    };

    const getDomainRoles = (domain: string): string[] => {
      const roles: Record<string, string[]> = {
        "web-dev": ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
        "mobile-dev": ["iOS Developer", "Android Developer", "UI/UX Designer"],
        "data-science": ["Data Scientist", "ML Engineer", "Data Analyst"],
        "design": ["UI Designer", "UX Researcher", "Visual Designer"],
        "cybersecurity": ["Security Analyst", "Penetration Tester", "Security Engineer"],
        "game-dev": ["Game Developer", "3D Artist", "Game Designer"],
        "cloud-computing": ["Cloud Architect", "DevOps Engineer", "SRE"],
        "blockchain": ["Blockchain Developer", "Smart Contract Developer", "Web3 Developer"],
        "quantum-computing": ["Quantum Developer", "Research Scientist", "Algorithm Designer"],
        "ar-vr": ["AR/VR Developer", "3D Developer", "Unity Developer"],
        "iot": ["Embedded Developer", "Hardware Engineer", "Firmware Developer"],
        "robotics": ["Robotics Engineer", "Computer Vision Engineer", "Control Systems Engineer"],
        "devops": ["DevOps Engineer", "SRE", "Platform Engineer"],
        "software-dev": ["Full Stack Developer", "Backend Developer", "Software Architect"],
      };
      return roles[domain] || ["Software Developer", "Full Stack Developer"];
    };

    // Generate posts for the selected domain
    if (selectedDomain && selectedDomain !== "all") {
      return generateDomainSpecificPosts(selectedDomain);
    }

    // If no domain selected or "all", show a mix of popular posts
    const allDomains = ["web-dev", "mobile-dev", "data-science", "design", "cybersecurity", "game-dev"];
    const mixedPosts = allDomains.flatMap(domain => generateDomainSpecificPosts(domain).slice(0, 1));
    
    return mixedPosts;
  }, [selectedDomain]);

  const handleLike = useCallback((postId: string) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  }, []);

  const handleSave = useCallback((postId: string) => {
    setSavedPosts((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(postId)) {
        newSaved.delete(postId);
      } else {
        newSaved.add(postId);
      }
      return newSaved;
    });
  }, []);

  const handleToggleComments = useCallback((postId: string) => {
    setShowComments((prev) => {
      const newShow = new Set(prev);
      if (newShow.has(postId)) {
        newShow.delete(postId);
      } else {
        newShow.add(postId);
      }
      return newShow;
    });
  }, []);

  const handleAddComment = useCallback(
    (postId: string) => {
      const comment = newComment[postId];
      if (comment && comment.trim()) {
        console.log("Adding comment:", comment, "to post:", postId);
        setNewComment((prev) => ({ ...prev, [postId]: "" }));
      }
    },
    [newComment],
  );

  const handleCommentChange = useCallback((postId: string, value: string) => {
    setNewComment((prev) => ({ ...prev, [postId]: value }));
  }, []);

  const handleJoinProject = useCallback(
    (post: Post) => {
      if (!onJoinProject || !post.project) return;

      const projectData = {
        id: post.id,
        title: post.content.title,
        description: post.content.description,
        techStack: post.project.techStack,
        teamSize: post.project.teamSize,
        duration: post.project.duration,
        difficulty: post.project.difficulty,
        author: post.author,
        dueDate: new Date(
          Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        progress: 0,
      };

      onJoinProject(projectData);
    },
    [onJoinProject],
  );

  const isProjectJoined = useCallback(
    (postTitle: string) => {
      return joinedProjects.some((jp) => jp.title === postTitle);
    },
    [joinedProjects],
  );

  // This should never happen now with dynamic generation, but keep as fallback
  if (!posts.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-sm bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No posts available</h3>
              <p className="text-sm">
                Check back later for more content in the {selectedDomain}{" "}
                domain.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Domain Header */}
      {selectedDomain && selectedDomain !== "all" && (
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              {React.createElement(getDomainIcon(selectedDomain), {
                className: "w-8 h-8 text-primary"
              })}
              <div>
                <h3 className="text-xl font-bold">
                  {selectedDomain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Community
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover latest insights, projects, and opportunities in {selectedDomain.replace(/-/g, ' ')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {posts.map((post) => (
        <Card
          key={post.id}
          className="border-0 shadow-sm bg-background/80 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          {/* Post Header */}
          <div className="p-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {post.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm">
                      {post.author.name}
                    </span>
                    {post.author.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{post.author.title}</span>
                    <span>•</span>
                    <span>{post.author.company}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <CardContent className="p-0">
            {/* Reel Content */}
            {post.type === "reel" && (
              <div className="relative bg-slate-900 aspect-[9/16] max-h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <div className="relative text-center text-white p-8">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <div className="text-sm font-medium mb-2">
                    {post.content.title}
                  </div>
                  <div className="text-xs opacity-80">
                    {post.content.duration}
                  </div>
                </div>
                {post.content.location && (
                  <div className="absolute top-4 left-4 flex items-center space-x-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                    <MapPin className="w-3 h-3" />
                    <span>{post.content.location}</span>
                  </div>
                )}
                {post.engagement.views && (
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                    <Eye className="w-3 h-3" />
                    <span>{formatNumber(post.engagement.views)} views</span>
                  </div>
                )}
              </div>
            )}

            {/* Post Content */}
            {post.type === "post" && (
              <div className="px-4 pb-3">
                <h3 className="font-semibold text-lg mb-2">
                  {post.content.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {post.content.description}
                </p>
                {post.content.location && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{post.content.location}</span>
                  </div>
                )}
              </div>
            )}

            {/* Project Content */}
            {post.type === "project" && post.project && (
              <div className="px-4 pb-3">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/20 mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg text-primary">
                      {post.content.title}
                    </h3>
                    <Badge
                      className={getDifficultyColor(post.project.difficulty)}
                    >
                      {post.project.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.content.description}
                  </p>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-primary" />
                      <span>{post.project.teamSize} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span>{post.project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3 text-primary" />
                      <span>{post.project.openPositions} openings</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-3">
                    <div className="text-xs font-medium mb-1">Tech Stack:</div>
                    <div className="flex flex-wrap gap-1">
                      {post.project.techStack.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Looking For */}
                  <div className="mb-3">
                    <div className="text-xs font-medium mb-1 flex items-center space-x-2">
                      <span>Looking for:</span>
                      <Badge
                        variant="outline"
                        className="text-xs text-green-600"
                      >
                        Open to Join
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.project.lookingFor.map((role, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-primary/50"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Repository */}
                  {post.project.repository && (
                    <div className="flex items-center space-x-2 text-xs">
                      <GitFork className="w-3 h-3 text-muted-foreground" />
                      <a
                        href={`https://${post.project.repository}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center space-x-1"
                      >
                        <span>{post.project.repository}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-1">
                {post.content.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag.replace(/\s+/g, "")}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="p-0 h-auto hover:scale-105 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 mr-1 transition-colors ${
                        likedPosts.has(post.id)
                          ? "fill-red-500 text-red-500"
                          : "hover:text-red-500"
                      }`}
                    />
                    <span className="text-sm">
                      {formatNumber(post.engagement.likes)}
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleComments(post.id)}
                    className="p-0 h-auto hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="w-5 h-5 mr-1 hover:text-blue-500 transition-colors" />
                    <span className="text-sm">
                      {formatNumber(post.engagement.comments)}
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:scale-105 transition-transform"
                  >
                    <Share className="w-5 h-5 mr-1 hover:text-green-500 transition-colors" />
                    <span className="text-sm">
                      {formatNumber(post.engagement.shares)}
                    </span>
                  </Button>

                  {post.type === "project" && post.engagement.collaborators && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{post.engagement.collaborators} collaborators</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {post.type === "project" && onJoinProject && (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-xs transition-all duration-200"
                      disabled={isProjectJoined(post.content.title)}
                      onClick={() => handleJoinProject(post)}
                    >
                      {isProjectJoined(post.content.title)
                        ? "Joined"
                        : "Join Project"}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSave(post.id)}
                    className="p-0 h-auto hover:scale-105 transition-transform"
                  >
                    <Bookmark
                      className={`w-5 h-5 transition-colors ${
                        savedPosts.has(post.id)
                          ? "fill-current text-primary"
                          : "hover:text-primary"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Engagement Summary */}
            <div className="px-4 pb-4 border-t pt-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1 text-red-500">
                      <Heart className="w-3 h-3" />
                      <span className="font-medium">
                        {formatNumber(post.engagement.likes)} likes
                      </span>
                    </span>
                    <span className="flex items-center space-x-1 text-blue-500">
                      <MessageCircle className="w-3 h-3" />
                      <span className="font-medium">
                        {formatNumber(post.engagement.comments)} comments
                      </span>
                    </span>
                    {post.engagement.views && (
                      <span className="flex items-center space-x-1 text-green-500">
                        <Eye className="w-3 h-3" />
                        <span className="font-medium">
                          {formatNumber(post.engagement.views)} views
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending in {post.domain.replace(/-/g, ' ')}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{post.author.followers} followers</span>
                    </span>
                  </div>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.timestamp}</span>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Load More */}
      <div className="text-center py-8">
        <Button
          variant="outline"
          className="w-full hover:bg-primary/10 transition-colors"
        >
          Load More Posts
        </Button>
      </div>
    </div>
  );
}
