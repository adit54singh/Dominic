import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Users,
  MessageCircle,
  Heart,
  Share,
  Send,
  Image,
  PlusCircle,
  TrendingUp,
  Calendar,
  Star,
  UserPlus
} from "lucide-react";

interface CommunityHubViewProps {
  communityId: string;
  communityName: string;
  followedUsers: Set<string>;
  onClose: () => void;
  onPostMessage: (message: string, image?: string) => void;
}

interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    isFollowed: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

export default function CommunityHubView({ 
  communityId, 
  communityName, 
  followedUsers,
  onClose,
  onPostMessage 
}: CommunityHubViewProps) {
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  // Sample community posts
  const [communityPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: {
        id: "1",
        name: "Rajesh Kumar",
        title: "Full Stack Developer",
        avatar: "RK",
        isFollowed: followedUsers.has("1")
      },
      content: "Just shipped a new feature using React 18's concurrent features! The performance improvements are incredible. Anyone else experimenting with these new APIs?",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false
    },
    {
      id: "2",
      author: {
        id: "2",
        name: "Priya Sharma",
        title: "Data Scientist",
        avatar: "PS",
        isFollowed: followedUsers.has("2")
      },
      content: "Excited to share my latest ML model that achieved 94% accuracy on the sentiment analysis task! Here's what I learned about feature engineering...",
      image: "/placeholder.svg",
      timestamp: "5 hours ago",
      likes: 56,
      comments: 15,
      shares: 12,
      isLiked: false
    },
    {
      id: "3",
      author: {
        id: "3",
        name: "Arjun Patel",
        title: "Mobile Developer",
        avatar: "AP",
        isFollowed: followedUsers.has("3")
      },
      content: "Looking for collaborators on a React Native project focused on accessibility features. DM me if you're interested in making apps more inclusive!",
      timestamp: "1 day ago",
      likes: 18,
      comments: 6,
      shares: 4,
      isLiked: false
    }
  ]);

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

  const handlePost = () => {
    if (newPost.trim()) {
      onPostMessage(newPost, selectedImage || undefined);
      setNewPost("");
      setSelectedImage(null);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{communityName} Hub</h2>
              <p className="text-sm text-muted-foreground">
                {Math.floor(Math.random() * 5000) + 1000} members • {communityPosts.length} recent posts
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Community Stats */}
        <div className="p-6 border-b bg-muted/30">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{Math.floor(Math.random() * 100) + 50}</div>
              <div className="text-xs text-muted-foreground">Active Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{Math.floor(Math.random() * 20) + 10}</div>
              <div className="text-xs text-muted-foreground">Projects Shared</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{followedUsers.size}</div>
              <div className="text-xs text-muted-foreground">People You Follow</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">{Math.floor(Math.random() * 5) + 2}</div>
              <div className="text-xs text-muted-foreground">Events This Week</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Sidebar - Community Info */}
          <div className="w-80 border-r p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Followed Members */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    People You Follow ({followedUsers.size})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Array.from(followedUsers).slice(0, 5).map((userId) => {
                    const user = communityPosts.find(p => p.author.id === userId)?.author;
                    if (!user) return null;
                    return (
                      <div key={userId} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-white text-xs">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{user.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{user.title}</div>
                        </div>
                      </div>
                    );
                  })}
                  {followedUsers.size === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      No followed users in this community yet
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
                  {["React 18", "TypeScript", "Next.js", "Tailwind CSS"].map((topic, index) => (
                    <div key={index} className="text-xs text-primary hover:underline cursor-pointer">
                      #{topic}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs">
                    <div className="font-medium">Tech Talk: Advanced React</div>
                    <div className="text-muted-foreground">Tomorrow 6:00 PM</div>
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">Code Review Session</div>
                    <div className="text-muted-foreground">Friday 2:00 PM</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Feed */}
          <div className="flex-1 flex flex-col">
            {/* Post Creation */}
            <div className="p-4 border-b">
              <div className="space-y-3">
                <Textarea
                  placeholder="Share something with the community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                {selectedImage && (
                  <div className="relative inline-block">
                    <img 
                      src={selectedImage} 
                      alt="Selected" 
                      className="max-w-xs rounded-lg border"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 bg-black/50 text-white hover:bg-black/70"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button variant="ghost" size="sm" asChild>
                        <span>
                          <Image className="w-4 h-4 mr-2" />
                          Image
                        </span>
                      </Button>
                    </label>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handlePost}
                    disabled={!newPost.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-white">
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{post.author.name}</span>
                          {post.author.isFollowed && (
                            <Badge variant="outline" className="text-xs">Following</Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {post.author.title} • {post.timestamp}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm mb-3 leading-relaxed">{post.content}</p>

                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full max-w-md rounded-lg border mb-3"
                      />
                    )}

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="p-0 h-auto text-xs"
                        >
                          <Heart 
                            className={`w-4 h-4 mr-1 ${
                              likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : ''
                            }`} 
                          />
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                          <Share className="w-4 h-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
