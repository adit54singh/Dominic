import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  Send,
  Smile,
  Plus,
} from "lucide-react";

interface Post {
  id: string;
  type: "reel" | "post" | "carousel";
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: {
    text?: string;
    media: string[];
    thumbnail?: string;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  timestamp: string;
  liked: boolean;
  saved: boolean;
  location?: string;
  tags: string[];
}

interface ReelsAndPostsProps {
  userPosts?: Post[];
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string) => void;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    type: "reel",
    author: {
      name: "Tech Creator",
      username: "@techcreator",
      avatar: "TC",
      verified: true,
    },
    content: {
      text: "Building the future with code! 🚀 Check out this amazing React animation I created",
      media: ["reel_video_1"],
      thumbnail: "/placeholder.svg",
    },
    engagement: {
      likes: 15420,
      comments: 342,
      shares: 89,
      views: 128500,
    },
    timestamp: "2h",
    liked: false,
    saved: false,
    location: "Bangalore, India",
    tags: ["react", "animation", "coding", "tutorial"],
  },
  {
    id: "2",
    type: "post",
    author: {
      name: "Design Guru",
      username: "@designguru",
      avatar: "DG",
      verified: true,
    },
    content: {
      text: "Just finished this UI design for a fintech app. What do you think? 💳✨",
      media: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    },
    engagement: {
      likes: 8750,
      comments: 156,
      shares: 45,
    },
    timestamp: "4h",
    liked: true,
    saved: false,
    tags: ["design", "ui", "fintech", "mobile"],
  },
  {
    id: "3",
    type: "reel",
    author: {
      name: "Code Master",
      username: "@codemaster",
      avatar: "CM",
      verified: false,
    },
    content: {
      text: "30-second JavaScript tip that will blow your mind! 🤯",
      media: ["reel_video_2"],
      thumbnail: "/placeholder.svg",
    },
    engagement: {
      likes: 23100,
      comments: 567,
      shares: 234,
      views: 245000,
    },
    timestamp: "6h",
    liked: false,
    saved: true,
    tags: ["javascript", "tips", "programming", "webdev"],
  },
  {
    id: "4",
    type: "carousel",
    author: {
      name: "Startup Life",
      username: "@startuplife",
      avatar: "SL",
      verified: true,
    },
    content: {
      text: "Behind the scenes of our latest product launch! Swipe to see the journey 👉",
      media: [
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
      ],
    },
    engagement: {
      likes: 12340,
      comments: 289,
      shares: 156,
    },
    timestamp: "8h",
    liked: false,
    saved: false,
    location: "San Francisco, CA",
    tags: ["startup", "product", "launch", "tech"],
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

export default function ReelsAndPosts({
  userPosts = [],
  onLike,
  onComment,
  onShare,
  onSave,
}: ReelsAndPostsProps) {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<
    Record<string, number>
  >({});

  const allPosts = [...userPosts, ...SAMPLE_POSTS];

  const handleLike = useCallback(
    (postId: string) => {
      setLikedPosts((prev) => {
        const newLiked = new Set(prev);
        if (newLiked.has(postId)) {
          newLiked.delete(postId);
        } else {
          newLiked.add(postId);
        }
        return newLiked;
      });
      onLike?.(postId);
    },
    [onLike],
  );

  const handleSave = useCallback(
    (postId: string) => {
      setSavedPosts((prev) => {
        const newSaved = new Set(prev);
        if (newSaved.has(postId)) {
          newSaved.delete(postId);
        } else {
          newSaved.add(postId);
        }
        return newSaved;
      });
      onSave?.(postId);
    },
    [onSave],
  );

  const toggleVideoPlay = (postId: string) => {
    setPlayingVideo((prev) => (prev === postId ? null : postId));
  };

  const toggleVideoMute = (postId: string) => {
    setMutedVideos((prev) => {
      const newMuted = new Set(prev);
      if (newMuted.has(postId)) {
        newMuted.delete(postId);
      } else {
        newMuted.add(postId);
      }
      return newMuted;
    });
  };

  const nextCarouselImage = (postId: string, maxIndex: number) => {
    setCurrentCarouselIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % maxIndex,
    }));
  };

  const prevCarouselImage = (postId: string, maxIndex: number) => {
    setCurrentCarouselIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + maxIndex) % maxIndex,
    }));
  };

  // State for comments
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {},
  );
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<
    Record<
      string,
      Array<{ id: string; author: string; text: string; timestamp: string }>
    >
  >({});

  const handleAddComment = useCallback(
    (postId: string) => {
      const commentText = commentInputs[postId]?.trim();
      if (commentText) {
        const newComment = {
          id: Date.now().toString(),
          author: "You",
          text: commentText,
          timestamp: "now",
        };

        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), newComment],
        }));

        setCommentInputs((prev) => ({
          ...prev,
          [postId]: "",
        }));

        onComment?.(postId, commentText);
      }
    },
    [commentInputs, onComment],
  );

  const toggleComments = useCallback((postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Posts Feed */}
      <div className="space-y-6">
        {allPosts.map((post) => (
          <Card
            key={post.id}
            className="border-0 shadow-sm bg-background/80 backdrop-blur-sm overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-white">
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
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <span>{post.author.username}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <span>{post.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              {post.content.text && (
                <div className="px-4 pb-3">
                  <p className="text-sm leading-relaxed">{post.content.text}</p>
                </div>
              )}

              {/* Media Content */}
              <div className="relative">
                {post.type === "reel" && (
                  <div
                    className="relative bg-black aspect-[9/16] max-h-[600px] flex items-center justify-center group cursor-pointer"
                    onClick={() => toggleVideoPlay(post.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
                    {post.content.thumbnail && (
                      <img
                        src={post.content.thumbnail}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Video Controls */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {playingVideo === post.id ? (
                        <Pause className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>

                    {/* Video Stats */}
                    <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoMute(post.id);
                        }}
                        className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                      >
                        {mutedVideos.has(post.id) ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                      {post.engagement.views && (
                        <div className="flex items-center space-x-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                          <Eye className="w-3 h-3" />
                          <span>{formatNumber(post.engagement.views)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {post.type === "post" && post.content.media.length === 1 && (
                  <div className="aspect-square max-h-[600px] bg-gray-100">
                    <img
                      src={post.content.media[0]}
                      alt="Post image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {post.type === "carousel" && (
                  <div className="relative aspect-square max-h-[600px] bg-gray-100">
                    <img
                      src={
                        post.content.media[currentCarouselIndex[post.id] || 0]
                      }
                      alt="Carousel image"
                      className="w-full h-full object-cover"
                    />

                    {/* Carousel Navigation */}
                    {post.content.media.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            prevCarouselImage(
                              post.id,
                              post.content.media.length,
                            )
                          }
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-8 h-8 p-0"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            nextCarouselImage(
                              post.id,
                              post.content.media.length,
                            )
                          }
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full w-8 h-8 p-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>

                        {/* Carousel Indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {post.content.media.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === (currentCarouselIndex[post.id] || 0)
                                  ? "bg-white"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="p-0 hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          likedPosts.has(post.id) || post.liked
                            ? "fill-red-500 text-red-500"
                            : "text-foreground hover:text-red-500"
                        } transition-colors`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleComments(post.id)}
                      className="p-0 hover:scale-110 transition-transform"
                    >
                      <MessageCircle className="w-6 h-6 text-foreground hover:text-blue-500 transition-colors" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 hover:scale-110 transition-transform"
                    >
                      <Share className="w-6 h-6 text-foreground hover:text-green-500 transition-colors" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSave(post.id)}
                    className="p-0 hover:scale-110 transition-transform"
                  >
                    <Bookmark
                      className={`w-6 h-6 ${
                        savedPosts.has(post.id) || post.saved
                          ? "fill-current text-primary"
                          : "text-foreground hover:text-primary"
                      } transition-colors`}
                    />
                  </Button>
                </div>

                {/* Like Count */}
                <div className="text-sm font-semibold mb-2">
                  {formatNumber(post.engagement.likes)} likes
                </div>

                {/* Comments Count */}
                {(post.engagement.comments > 0 ||
                  (comments[post.id] && comments[post.id].length > 0)) && (
                  <Button
                    variant="ghost"
                    onClick={() => toggleComments(post.id)}
                    className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground"
                  >
                    View all{" "}
                    {formatNumber(
                      post.engagement.comments +
                        (comments[post.id]?.length || 0),
                    )}{" "}
                    comments
                  </Button>
                )}

                {/* Comments Section */}
                {showComments[post.id] && (
                  <div className="mt-4 space-y-3">
                    {/* Existing comments preview */}
                    {post.engagement.comments > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3 p-2 bg-muted/30 rounded-lg">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-secondary text-xs">
                              U1
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium">user_123</div>
                            <p className="text-sm text-muted-foreground">
                              Amazing work! 🔥
                            </p>
                          </div>
                        </div>
                        {post.engagement.comments > 1 && (
                          <div className="flex items-start space-x-3 p-2 bg-muted/30 rounded-lg">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-secondary text-xs">
                                U2
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="text-sm font-medium">
                                dev_guru
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Can you share the source code?
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* User comments */}
                    {comments[post.id] &&
                      comments[post.id].map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start space-x-3 p-2 bg-muted/30 rounded-lg"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary text-white text-xs">
                              Y
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {comment.author}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))}

                    {/* Add comment input */}
                    <div className="flex items-center space-x-3 mt-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-white text-xs">
                          Y
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddComment(post.id)
                          }
                          className="flex-1 px-3 py-2 text-sm bg-muted/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className="rounded-full px-4"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm text-blue-600 hover:underline cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <Button variant="outline" className="px-8">
          Load More Posts
        </Button>
      </div>
    </div>
  );
}
