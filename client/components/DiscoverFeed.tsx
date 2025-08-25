import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  type: "reel" | "post" | "project";
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

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

const getDomainName = (domain: string): string => {
  const domainNames: Record<string, string> = {
    "web-dev": "Web Development",
    "mobile-dev": "Mobile Development", 
    "data-science": "Data Science & AI",
    "design": "UI/UX Design",
    "cybersecurity": "Cybersecurity",
    "game-dev": "Game Development",
    "cloud-computing": "Cloud Computing",
    "blockchain": "Blockchain & Web3",
    "quantum-computing": "Quantum Computing",
    "ar-vr": "AR/VR Development",
    "iot": "IoT & Embedded Systems",
    "robotics": "Robotics & Automation",
    "devops": "DevOps & Infrastructure",
    "software-dev": "Software Development",
  };
  return domainNames[domain] || domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const getDomainIcon = (domain: string) => {
  const icons: Record<string, any> = {
    "web-dev": Code,
    "software-dev": Code,
    "mobile-dev": Smartphone,
    "data-science": Database,
    "design": Palette,
    "cybersecurity": Shield,
    "game-dev": Gamepad,
    "cloud-computing": Cloud,
    "blockchain": Zap,
    "quantum-computing": Cpu,
    "ar-vr": Monitor,
    "iot": Bot,
    "robotics": Bot,
    "devops": Cloud,
  };
  return icons[domain] || Code;
};

// Static sample posts to avoid performance issues
const SAMPLE_POSTS: Post[] = [
  {
    id: "sample-1",
    type: "reel",
    author: {
      name: "Tech Expert",
      title: "Senior Developer",
      avatar: "TE",
      verified: true,
      company: "TechCorp",
      followers: "12.5k",
    },
    content: {
      title: "Day in the life of a developer 🚀",
      description: "Join me for a typical day working with cutting-edge technologies. From morning standups to solving complex challenges!",
      tags: ["Tech Life", "Development", "Career"],
      location: "Tech Hub, India",
      duration: "2:15",
    },
    engagement: {
      likes: 2847,
      comments: 156,
      shares: 89,
      views: 45280,
    },
    timestamp: "2 hours ago",
    domain: "web-dev",
  },
  {
    id: "sample-2",
    type: "post",
    author: {
      name: "Innovation Leader",
      title: "Tech Architect",
      avatar: "IL",
      verified: true,
      company: "Innovation Labs",
      followers: "8.2k",
    },
    content: {
      title: "Breaking: New breakthrough in modern technology! 🎉",
      description: "Just implemented a revolutionary approach that increased performance by 300%! Here's what we learned and how you can apply these principles in your own projects.",
      tags: ["Innovation", "Performance", "Best Practices"],
      location: "Bangalore, India",
    },
    engagement: {
      likes: 5624,
      comments: 342,
      shares: 278,
    },
    timestamp: "4 hours ago",
    domain: "web-dev",
  },
  {
    id: "sample-3",
    type: "project",
    author: {
      name: "Project Leader",
      title: "Tech Specialist",
      avatar: "PL",
      verified: false,
      company: "Open Source Contributor",
      followers: "3.4k",
    },
    content: {
      title: "Revolutionary Tech Project",
      description: "Building an innovative solution that will change how we approach modern development. Join our passionate team!",
      tags: ["Open Source", "Innovation", "Collaboration"],
    },
    project: {
      techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
      teamSize: 5,
      duration: "4 months",
      difficulty: "Intermediate",
      lookingFor: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
      repository: "github.com/tech-project/app",
      openPositions: 3,
    },
    engagement: {
      likes: 234,
      comments: 56,
      shares: 43,
      collaborators: 12,
    },
    timestamp: "6 hours ago",
    domain: "web-dev",
  },
];

export default function DiscoverFeed({
  selectedDomain,
  joinedProjects = [],
  onJoinProject,
}: DiscoverFeedProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  // Use static posts to avoid performance issues
  const posts = useMemo(() => {
    return SAMPLE_POSTS.map(post => ({
      ...post,
      content: {
        ...post.content,
        title: post.content.title.includes("tech") 
          ? post.content.title.replace("tech", getDomainName(selectedDomain).toLowerCase())
          : `${getDomainName(selectedDomain)} - ${post.content.title}`,
        tags: [getDomainName(selectedDomain), ...post.content.tags.slice(1)]
      },
      domain: selectedDomain
    }));
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
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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

  if (!posts.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-sm bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No posts available</h3>
              <p className="text-sm">
                Check back later for more content in the {getDomainName(selectedDomain)} domain.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const DomainIcon = getDomainIcon(selectedDomain);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Domain Header */}
      {selectedDomain && selectedDomain !== "all" && (
        <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DomainIcon className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold">
                  {getDomainName(selectedDomain)} Community
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover latest insights, projects, and opportunities in {getDomainName(selectedDomain).toLowerCase()}
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
              <div className="relative bg-slate-900 aspect-[9/16] max-h-[400px] flex items-center justify-center">
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
                    <Badge variant="secondary">
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
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Looking For */}
                  <div className="mb-3">
                    <div className="text-xs font-medium mb-1">Looking for:</div>
                    <div className="flex flex-wrap gap-1">
                      {post.project.lookingFor.map((role, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Repository */}
                  {post.project.repository && (
                    <div className="flex items-center space-x-2 text-xs">
                      <Github className="w-3 h-3 text-muted-foreground" />
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

                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <MessageCircle className="w-5 h-5 mr-1 hover:text-blue-500 transition-colors" />
                    <span className="text-sm">
                      {formatNumber(post.engagement.comments)}
                    </span>
                  </Button>

                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <Share className="w-5 h-5 mr-1 hover:text-green-500 transition-colors" />
                    <span className="text-sm">
                      {formatNumber(post.engagement.shares)}
                    </span>
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  {post.type === "project" && onJoinProject && (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-xs"
                      disabled={isProjectJoined(post.content.title)}
                      onClick={() => handleJoinProject(post)}
                    >
                      {isProjectJoined(post.content.title) ? "Joined" : "Join Project"}
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

            {/* Engagement Summary */}
            <div className="px-4 pb-4 border-t pt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending in {getDomainName(selectedDomain).toLowerCase()}</span>
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
          </CardContent>
        </Card>
      ))}

      {/* Load More */}
      <div className="text-center py-8">
        <Button variant="outline" className="w-full hover:bg-primary/10 transition-colors">
          Load More Posts
        </Button>
      </div>
    </div>
  );
}
