import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Share,
  Users,
  Calendar,
  Star,
  GitFork,
  ExternalLink,
  Clock
} from "lucide-react";

interface ProjectPost {
  id: string;
  author: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    isFollowing: boolean;
  };
  project: {
    title: string;
    description: string;
    techStack: string[];
    teamSize: number;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    lookingFor: string[];
    repository?: string;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    collaborators: number;
  };
  timestamp: string;
  domain: string;
}

interface FollowingProjectsFeedProps {
  selectedDomain: string;
  followedUsers: Set<string>;
  joinedProjects: Array<any>;
  onJoinProject: (project: any) => void;
}

export default function FollowingProjectsFeed({ selectedDomain, followedUsers, joinedProjects, onJoinProject }: FollowingProjectsFeedProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  // Sample project posts from followed users
  const projectPosts: ProjectPost[] = [
    {
      id: "1",
      author: {
        id: "1",
        name: "Rajesh Kumar",
        title: "Full Stack Developer",
        avatar: "RK",
        isFollowing: true
      },
      project: {
        title: "EcoTracker - Carbon Footprint App",
        description: "Building a mobile app to help users track and reduce their carbon footprint. Features include daily activity logging, impact visualization, and community challenges.",
        techStack: ["React Native", "Node.js", "MongoDB", "Firebase"],
        teamSize: 4,
        duration: "3 months",
        difficulty: "Intermediate",
        lookingFor: ["UI/UX Designer", "Backend Developer"],
        repository: "github.com/rajesh/ecotracker"
      },
      engagement: {
        likes: 89,
        comments: 23,
        shares: 15,
        collaborators: 8
      },
      timestamp: "2 hours ago",
      domain: "mobile-dev"
    },
    {
      id: "2",
      author: {
        id: "2",
        name: "Priya Sharma",
        title: "Data Scientist",
        avatar: "PS",
        isFollowing: true
      },
      project: {
        title: "StudyBuddy - AI-Powered Learning Assistant",
        description: "An AI chatbot that helps students with personalized study plans, doubt resolution, and progress tracking. Using NLP and machine learning for smart responses.",
        techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
        teamSize: 5,
        duration: "4 months",
        difficulty: "Advanced",
        lookingFor: ["Frontend Developer", "DevOps Engineer"],
        repository: "github.com/priya/studybuddy"
      },
      engagement: {
        likes: 156,
        comments: 34,
        shares: 28,
        collaborators: 12
      },
      timestamp: "5 hours ago",
      domain: "data-science"
    },
    {
      id: "3",
      author: {
        id: "3",
        name: "Arjun Patel",
        title: "Mobile Developer",
        avatar: "AP",
        isFollowing: true
      },
      project: {
        title: "CampusConnect - College Social Network",
        description: "A social platform specifically for college students to connect, share notes, form study groups, and collaborate on projects. Think Discord + LinkedIn for colleges.",
        techStack: ["Flutter", "Firebase", "Node.js", "Socket.io"],
        teamSize: 6,
        duration: "5 months",
        difficulty: "Intermediate",
        lookingFor: ["Backend Developer", "UI/UX Designer", "QA Tester"]
      },
      engagement: {
        likes: 203,
        comments: 45,
        shares: 32,
        collaborators: 15
      },
      timestamp: "8 hours ago",
      domain: "mobile-dev"
    },
    {
      id: "4",
      author: {
        id: "4",
        name: "Sneha Gupta",
        title: "Frontend Developer",
        avatar: "SG",
        isFollowing: true
      },
      project: {
        title: "LocalBiz - Small Business Discovery",
        description: "Helping local businesses get discovered by building a location-based discovery platform. Users can find nearby services, read reviews, and book appointments.",
        techStack: ["React", "TypeScript", "Node.js", "MySQL", "Google Maps API"],
        teamSize: 4,
        duration: "2 months",
        difficulty: "Beginner",
        lookingFor: ["Backend Developer", "Mobile Developer"],
        repository: "github.com/sneha/localbiz"
      },
      engagement: {
        likes: 127,
        comments: 28,
        shares: 19,
        collaborators: 6
      },
      timestamp: "1 day ago",
      domain: "web-dev"
    }
  ];

  // Filter by followed users and domain
  const filteredPosts = projectPosts.filter(post => {
    // Only show posts from followed users
    const isFromFollowedUser = followedUsers.has(post.author.id);

    // Filter by domain
    const domainMatch = selectedDomain === 'all' ||
      post.domain === selectedDomain ||
      (selectedDomain === 'web-dev' && ['web-dev', 'mobile-dev'].includes(post.domain)) ||
      (selectedDomain === 'mobile-dev' && ['mobile-dev', 'web-dev'].includes(post.domain)) ||
      (selectedDomain === 'data-science' && ['data-science', 'web-dev'].includes(post.domain));

    return isFromFollowedUser && domainMatch;
  });

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  if (followedUsers.size === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>You're not following anyone yet.</p>
        <p className="text-sm mt-2">Go to the Connect section to follow people and see their projects here!</p>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No project posts from people you follow in this domain yet.</p>
        <p className="text-sm mt-2">People you follow haven't posted projects in this domain recently.</p>
      </div>
    );
  }

  // Get users we're following
  const followedUsersData = projectPosts
    .filter(post => followedUsers.has(post.author.id))
    .reduce((acc, post) => {
      if (!acc.find(user => user.id === post.author.id)) {
        acc.push(post.author);
      }
      return acc;
    }, [] as Array<{id: string, name: string, title: string, avatar: string}>);

  return (
    <div className="space-y-6">
      {/* Following Section */}
      {followedUsers.size > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Following ({followedUsers.size})
          </h4>
          <div className="flex flex-wrap gap-2">
            {followedUsersData.map((user) => (
              <div key={user.id} className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full text-sm">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.avatar}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {filteredPosts.map((post) => (
        <Card key={post.id} className="border-0 shadow-sm bg-background/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {post.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{post.author.name}</span>
                    <Badge variant="outline" className="text-xs">Following</Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{post.author.title}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Project Header */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg text-primary">{post.project.title}</h3>
                <Badge className={getDifficultyColor(post.project.difficulty)}>
                  {post.project.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {post.project.description}
              </p>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{post.project.teamSize} team members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{post.project.duration} duration</span>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-sm font-medium mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-1">
                {post.project.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Looking For */}
            {post.project.lookingFor.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center space-x-2">
                  <span>Looking for:</span>
                  <Badge variant="outline" className="text-xs text-green-600">Open</Badge>
                </h4>
                <div className="flex flex-wrap gap-1">
                  {post.project.lookingFor.map((role, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-primary/50">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Repository Link */}
            {post.project.repository && (
              <div className="flex items-center space-x-2 text-sm">
                <GitFork className="w-4 h-4 text-muted-foreground" />
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

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className="p-0 h-auto"
                >
                  <Heart 
                    className={`w-4 h-4 mr-1 ${
                      likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                  <span className="text-xs">{post.engagement.likes}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{post.engagement.comments}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <Share className="w-4 h-4 mr-1" />
                  <span className="text-xs">{post.engagement.shares}</span>
                </Button>

                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{post.engagement.collaborators} collaborators</span>
                </div>
              </div>

              <Button
                size="sm"
                className="bg-primary"
                disabled={joinedProjects.some(jp => jp.title === post.project.title)}
                onClick={() => onJoinProject({
                  id: post.id,
                  title: post.project.title,
                  description: post.project.description,
                  techStack: post.project.techStack,
                  teamSize: post.project.teamSize,
                  duration: post.project.duration,
                  difficulty: post.project.difficulty,
                  author: post.author,
                  dueDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random date within 90 days
                  progress: 0
                })}
              >
                {joinedProjects.some(jp => jp.title === post.project.title) ? 'Joined' : 'Join Project'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
