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
  Verified,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Eye,
  GitFork,
  Calendar,
  Target,
  ExternalLink,
  Send,
  ChevronDown,
  ChevronUp,
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
    duration?: string; // for reels
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
    views?: number; // for reels
    collaborators?: number; // for projects
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

export default function DiscoverFeed({
  selectedDomain,
  joinedProjects = [],
  onJoinProject,
}: DiscoverFeedProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  // Memoized posts generation to prevent unnecessary re-renders
  const posts = useMemo((): Post[] => {
    const allPosts: Post[] = [
      {
        id: "1",
        type: "reel",
        author: {
          name: "Rajesh Kumar",
          title: "Senior SDE at Google",
          avatar: "RK",
          verified: true,
          company: "Google",
          followers: "12.5k",
        },
        content: {
          title: "Day in the life at Google Bangalore 🏢",
          description:
            "From morning standups to late night coding sessions, here's what a typical day looks like at one of the world's top tech companies. The culture here is amazing! #GoogleLife #TechLife",
          media: "reel_placeholder",
          tags: ["Google", "Work Culture", "Tech Life", "Bangalore"],
          location: "Google, Bangalore",
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
        id: "2",
        type: "post",
        author: {
          name: "Priya Sharma",
          title: "Flutter Developer at Paytm",
          avatar: "PS",
          verified: true,
          company: "Paytm",
          followers: "8.2k",
        },
        content: {
          title: "From College Dropout to Senior Developer 🚀",
          description:
            "My journey wasn't conventional. Dropped out in 2nd year, taught myself to code, failed 20+ interviews, but never gave up. Today I'm leading a team of 8 developers at Paytm. Your background doesn't define your future! AMA in comments 💪",
          tags: ["Success Story", "Self Taught", "Motivation", "Flutter"],
          location: "Mumbai",
        },
        engagement: {
          likes: 5624,
          comments: 342,
          shares: 278,
        },
        timestamp: "4 hours ago",
        domain: "mobile-dev",
      },
      {
        id: "3",
        type: "carousel",
        author: {
          name: "Arjun Patel",
          title: "ML Engineer at Microsoft",
          avatar: "AP",
          verified: true,
          company: "Microsoft",
          followers: "15.8k",
        },
        content: {
          title: "Building my first ML model that's now serving 10M+ users! 🤖",
          description:
            "Started as a college project, refined it over 6 months, and now it's powering Microsoft's recommendation engine. Here's the complete breakdown of the architecture, challenges faced, and lessons learned.",
          tags: ["Machine Learning", "Microsoft", "AI", "Success Story"],
          location: "Hyderabad",
        },
        engagement: {
          likes: 3429,
          comments: 198,
          shares: 156,
        },
        timestamp: "6 hours ago",
        domain: "data-science",
      },
      {
        id: "4",
        type: "reel",
        author: {
          name: "Sneha Gupta",
          title: "Senior UX Designer at Figma",
          avatar: "SG",
          verified: true,
          company: "Figma",
          followers: "9.7k",
        },
        content: {
          title: "Design process behind Figma's latest feature ✨",
          description:
            "Take a peek into how we design at Figma! From user research to prototyping to final implementation. The collaboration between design and engineering teams is incredible here 🎨",
          media: "reel_placeholder",
          tags: ["UX Design", "Figma", "Design Process", "Behind The Scenes"],
          location: "San Francisco (Remote)",
          duration: "1:45",
        },
        engagement: {
          likes: 4156,
          comments: 203,
          shares: 124,
          views: 28490,
        },
        timestamp: "8 hours ago",
        domain: "design",
      },
      {
        id: "5",
        type: "post",
        author: {
          name: "Karthik Reddy",
          title: "DevOps Lead at Swiggy",
          avatar: "KR",
          verified: true,
          company: "Swiggy",
          followers: "6.3k",
        },
        content: {
          title: "How we handle 50 million orders during peak hours 📊",
          description:
            "Behind the scenes of Swiggy's infrastructure during IPL finals! Our systems processed 50M orders without a single downtime. Here's the complete architecture breakdown, monitoring setup, and crisis management strategies we used.",
          tags: ["DevOps", "Scale", "Infrastructure", "Swiggy"],
          location: "Bangalore",
        },
        engagement: {
          likes: 2876,
          comments: 167,
          shares: 298,
        },
        timestamp: "12 hours ago",
        domain: "web-dev",
      },
      {
        id: "p1",
        type: "project",
        author: {
          name: "Vikash Kumar",
          title: "Full Stack Developer",
          avatar: "VK",
          verified: false,
          company: "Startup Founder",
          followers: "2.1k",
        },
        content: {
          title: "EcoTracker - Carbon Footprint Monitoring App",
          description:
            "Building a comprehensive app to help individuals and businesses track their carbon footprint. Features include real-time monitoring, AI-powered suggestions, and community challenges. Join us in making the world greener!",
          tags: ["Environment", "Mobile App", "AI", "Sustainability"],
        },
        project: {
          techStack: ["React Native", "Node.js", "TensorFlow", "MongoDB"],
          teamSize: 5,
          duration: "4 months",
          difficulty: "Intermediate",
          lookingFor: ["UI/UX Designer", "Data Scientist", "DevOps Engineer"],
          repository: "github.com/ecotracker/app",
          openPositions: 3,
        },
        engagement: {
          likes: 234,
          comments: 56,
          shares: 43,
          collaborators: 12,
        },
        timestamp: "6 hours ago",
        domain: "mobile-dev",
      },
      {
        id: "p2",
        type: "project",
        author: {
          name: "Sanya Patel",
          title: "AI/ML Engineer",
          avatar: "SP",
          verified: false,
          company: "Freelancer",
          followers: "3.4k",
        },
        content: {
          title: "MediBot - AI Healthcare Assistant",
          description:
            "Developing an AI-powered chatbot to provide preliminary health advice and appointment scheduling. Using NLP and medical knowledge graphs to assist users. Looking for passionate developers to join!",
          tags: ["Healthcare", "AI", "Chatbot", "NLP"],
        },
        project: {
          techStack: ["Python", "TensorFlow", "NLTK", "FastAPI", "React"],
          teamSize: 6,
          duration: "6 months",
          difficulty: "Advanced",
          lookingFor: [
            "Backend Developer",
            "Frontend Developer",
            "Medical Expert",
          ],
          repository: "github.com/medibot/ai-assistant",
          openPositions: 3,
        },
        engagement: {
          likes: 345,
          comments: 78,
          shares: 52,
          collaborators: 18,
        },
        timestamp: "12 hours ago",
        domain: "data-science",
      },
      {
        id: "p3",
        type: "project",
        author: {
          name: "Rahul Sharma",
          title: "Web Developer",
          avatar: "RS",
          verified: false,
          company: "Student",
          followers: "856",
        },
        content: {
          title: "StudySync - Collaborative Learning Platform",
          description:
            "Creating a platform where students can form study groups, share notes, take quizzes together, and track progress. Think Discord meets Google Classroom with gamification elements!",
          tags: ["Education", "Collaboration", "Gamification", "Web App"],
        },
        project: {
          techStack: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
          teamSize: 4,
          duration: "3 months",
          difficulty: "Beginner",
          lookingFor: ["Frontend Developer", "UI/UX Designer"],
          repository: "github.com/studysync/platform",
          openPositions: 2,
        },
        engagement: {
          likes: 189,
          comments: 34,
          shares: 28,
          collaborators: 8,
        },
        timestamp: "1 day ago",
        domain: "web-dev",
      },
    ];

    // Filter by domain efficiently
    if (selectedDomain === "all") {
      return allPosts;
    }

    return allPosts.filter((post) => {
      if (post.domain === selectedDomain) return true;
      
      // Cross-domain compatibility
      if (selectedDomain === "web-dev" && ["design", "security"].includes(post.domain)) {
        return true;
      }
      if (selectedDomain === "mobile-dev" && post.domain === "design") {
        return true;
      }
      if (selectedDomain === "data-science" && post.domain === "business") {
        return true;
      }
      
      return false;
    });
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

  const handleAddComment = useCallback((postId: string) => {
    const comment = newComment[postId];
    if (comment && comment.trim()) {
      console.log("Adding comment:", comment, "to post:", postId);
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    }
  }, [newComment]);

  const handleCommentChange = useCallback((postId: string, value: string) => {
    setNewComment((prev) => ({ ...prev, [postId]: value }));
  }, []);

  const handleJoinProject = useCallback((post: Post) => {
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
        Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
      ).toISOString(),
      progress: 0,
    };

    onJoinProject(projectData);
  }, [onJoinProject]);

  const isProjectJoined = useCallback((postTitle: string) => {
    return joinedProjects.some((jp) => jp.title === postTitle);
  }, [joinedProjects]);

  if (!posts.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-sm bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No posts available</h3>
              <p className="text-sm">
                Check back later for more content in the {selectedDomain} domain.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
                      <Verified className="w-4 h-4 text-blue-500 fill-blue-500" />
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

            {/* Carousel Content */}
            {post.type === "carousel" && (
              <div className="px-4 pb-3">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-lg mb-2">
                    {post.content.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.content.description}
                  </p>
                </div>
                {post.content.location && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
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
                      <span>Trending in {post.domain}</span>
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
