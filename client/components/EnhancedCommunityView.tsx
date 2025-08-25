import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  X,
  Users,
  MessageCircle,
  Heart,
  Share,
  Send,
  Image,
  Plus,
  Pin,
  PinOff,
  TrendingUp,
  Calendar,
  Star,
  UserPlus,
  Code,
  ExternalLink,
  Trophy,
  HelpCircle,
  ThumbsUp,
  Eye,
  Clock,
  MapPin,
  Target,
  Award,
  Zap,
  GitBranch,
  Play,
  Settings,
  Crown,
  Shield,
  Paperclip,
  Smile,
  MoreVertical,
  Hash,
  Video,
  Phone,
  Search,
  Filter,
  Bookmark,
  Flag,
  Edit,
  Trash2,
  Reply,
  Forward,
  Download,
  Camera,
  Mic,
  FileText,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Circle,
  Dot,
  MessageSquare,
  Bell,
  BellOff,
  Volume2,
  VolumeX
} from "lucide-react";
import { useCommunityStore, type Community, type ChatMessage, type OnlineUser } from "@/lib/community-store";

interface EnhancedCommunityViewProps {
  community: Community;
  onClose: () => void;
  currentUserId: string;
}

const EMOJI_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "😡", "🔥", "✨"];
const DOMAIN_THEMES = {
  'software-dev': {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200'
  },
  'data-science': {
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200'
  },
  'design': {
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-200'
  },
  'mobile-dev': {
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200'
  },
  'default': {
    gradient: 'from-gray-500 to-slate-500',
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200'
  }
};

export default function EnhancedCommunityView({ 
  community, 
  onClose, 
  currentUserId = "current-user" 
}: EnhancedCommunityViewProps) {
  const {
    sendMessage,
    pinMessage,
    unpinMessage,
    reactToMessage,
    updateOnlineUsers,
    pinPost,
    unpinPost,
    addReaction,
    addPost,
    uploadFile,
    followUser,
    unfollowUser,
    followedUsers
  } = useCommunityStore();

  const [activeTab, setActiveTab] = useState("feed");
  const [newMessage, setNewMessage] = useState("");
  const [newPost, setNewPost] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = DOMAIN_THEMES[community.domain as keyof typeof DOMAIN_THEMES] || DOMAIN_THEMES.default;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate online users updating
      const mockOnlineUsers: OnlineUser[] = [
        { id: '1', name: 'Rajesh Kumar', avatar: 'RK', status: 'online', lastSeen: new Date().toISOString() },
        { id: '2', name: 'Priya Sharma', avatar: 'PS', status: 'online', lastSeen: new Date().toISOString() },
        { id: '3', name: 'Arjun Patel', avatar: 'AP', status: 'away', lastSeen: new Date(Date.now() - 300000).toISOString() },
      ];
      updateOnlineUsers(community.id, mockOnlineUsers);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [community.id, updateOnlineUsers]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [community.chatMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedFiles.length > 0) {
      sendMessage(community.id, {
        senderId: currentUserId,
        senderName: "You",
        senderAvatar: "YU",
        content: newMessage.trim(),
        type: selectedFiles.length > 0 ? 'file' : 'text',
        replyTo: replyTo,
        reactions: [],
        isPinned: false,
        isEdited: false
      });
      setNewMessage("");
      setSelectedFiles([]);
      setReplyTo(null);
    }
  };

  const handleCreatePost = async () => {
    if (newPost.trim() || selectedFiles.length > 0) {
      let uploadedFiles = [];
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const url = await uploadFile(community.id, file);
          uploadedFiles.push({ name: file.name, url, type: file.type });
        }
      }

      addPost(community.id, {
        author: {
          id: currentUserId,
          name: "You",
          title: "Community Member",
          avatar: "YU",
          isFollowed: false,
          lastActive: "now",
          joinedAt: new Date().toISOString(),
          role: 'member',
          isOnline: true,
          status: 'online',
          skills: [],
          connections: []
        },
        content: newPost.trim(),
        files: uploadedFiles,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        type: 'general',
        tags: [],
        isPinned: false,
        visibility: 'public',
        reactions: []
      });
      setNewPost("");
      setSelectedFiles([]);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const connectedMembers = community.membersList.filter(member => 
    followedUsers.has(member.id)
  );

  const onlineMembers = community.onlineUsers.filter(user => user.status === 'online');
  const awayMembers = community.onlineUsers.filter(user => user.status === 'away');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-7xl h-[90vh] p-0 ${isFullscreen ? 'max-w-full h-screen' : ''}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${theme.gradient} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-4 border-white/20">
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  {community.name.split(' ').map(w => w[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{community.name}</h1>
                <p className="opacity-90">{community.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm opacity-80">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {community.members} members
                  </span>
                  <span className="flex items-center">
                    <Circle className="w-2 h-2 mr-1 fill-green-400 text-green-400" />
                    {onlineMembers.length} online
                  </span>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {community.domain}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotifications(!notifications)}
                className="text-white hover:bg-white/20"
              >
                {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSound(!sound)}
                className="text-white hover:bg-white/20"
              >
                {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Members and Info */}
          <div className="w-80 border-r border-border bg-muted/30">
            <div className="p-4 space-y-4">
              {/* Connected Members */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-primary" />
                    Connected Members ({connectedMembers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {connectedMembers.slice(0, 5).map((member) => (
                    <div key={member.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                        </Avatar>
                        {member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{member.title}</p>
                      </div>
                    </div>
                  ))}
                  {connectedMembers.length > 5 && (
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View all {connectedMembers.length} connections
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Online Users */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Circle className="w-4 h-4 fill-green-500 text-green-500" />
                    Online Now ({onlineMembers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {onlineMembers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-green-600">Active now</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{community.posts}</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-500">{community.events.length}</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-500">{community.projects?.length || 0}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-500">{community.hackathons?.length || 0}</div>
                      <div className="text-xs text-muted-foreground">Hackathons</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="border-b border-border p-4">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="feed" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Feed
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="hackathons" className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Hackathons
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="about" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    About
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Feed Tab */}
              <TabsContent value="feed" className="flex-1 flex flex-col p-0">
                <div className="flex-1 flex flex-col">
                  {/* Create Post */}
                  <div className="p-4 border-b border-border">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-white">YU</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <Textarea
                              placeholder="Share your thoughts, projects, or ask questions..."
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              className="min-h-[80px] border-0 resize-none focus:ring-0"
                            />
                            
                            {selectedFiles.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {selectedFiles.map((file, index) => (
                                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    {file.name}
                                    <button
                                      onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                                      className="ml-1 hover:text-destructive"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  multiple
                                  className="hidden"
                                  onChange={handleFileUpload}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  <Paperclip className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Image className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Video className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Hash className="w-4 h-4" />
                                </Button>
                              </div>
                              <Button 
                                onClick={handleCreatePost}
                                disabled={!newPost.trim() && selectedFiles.length === 0}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Post
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Posts Feed */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {/* Pinned Posts */}
                      {community.recentPosts.filter(post => post.isPinned).map((post) => (
                        <Card key={post.id} className="border-primary/20 bg-primary/5">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Pin className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Pinned Post</span>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => unpinPost(community.id, post.id)}>
                                    <PinOff className="w-4 h-4 mr-2" />
                                    Unpin
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            <div className="flex space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback>{post.author.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-medium">{post.author.name}</span>
                                  <span className="text-sm text-muted-foreground">{post.author.title}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                                </div>
                                <p className="mb-3">{post.content}</p>
                                
                                {post.files && post.files.length > 0 && (
                                  <div className="grid grid-cols-2 gap-2 mb-3">
                                    {post.files.map((file, index) => (
                                      <div key={index} className="p-2 border rounded-lg flex items-center space-x-2">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-sm truncate">{file.name}</span>
                                        <Button variant="ghost" size="sm">
                                          <Download className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                      <span>{post.likes}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                      <MessageCircle className="w-4 h-4" />
                                      <span>{post.comments}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                      <Share className="w-4 h-4" />
                                      <span>{post.shares}</span>
                                    </Button>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {EMOJI_REACTIONS.slice(0, 3).map((emoji) => (
                                      <Button
                                        key={emoji}
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs p-1"
                                        onClick={() => addReaction(community.id, post.id, emoji, currentUserId)}
                                      >
                                        {emoji}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {/* Regular Posts */}
                      {community.recentPosts.filter(post => !post.isPinned).map((post) => (
                        <Card key={post.id}>
                          <CardContent className="p-4">
                            <div className="flex space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback>{post.author.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{post.author.name}</span>
                                    <span className="text-sm text-muted-foreground">{post.author.title}</span>
                                    <span className="text-sm text-muted-foreground">•</span>
                                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem onClick={() => pinPost(community.id, post.id)}>
                                        <Pin className="w-4 h-4 mr-2" />
                                        Pin Post
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Bookmark className="w-4 h-4 mr-2" />
                                        Save
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Flag className="w-4 h-4 mr-2" />
                                        Report
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <p className="mb-3">{post.content}</p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                      <span>{post.likes}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                      <MessageCircle className="w-4 h-4" />
                                      <span>{post.comments}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                      <Share className="w-4 h-4" />
                                      <span>{post.shares}</span>
                                    </Button>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {EMOJI_REACTIONS.slice(0, 3).map((emoji) => (
                                      <Button
                                        key={emoji}
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs p-1"
                                        onClick={() => addReaction(community.id, post.id, emoji, currentUserId)}
                                      >
                                        {emoji}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* Chat Tab */}
              <TabsContent value="chat" className="flex-1 flex flex-col p-0">
                <div className="flex-1 flex flex-col">
                  {/* Pinned Messages */}
                  {community.pinnedMessages.length > 0 && (
                    <div className="p-4 bg-yellow-50 border-b border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Pin className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Pinned Messages</span>
                      </div>
                      <div className="space-y-2">
                        {community.pinnedMessages.map((message) => (
                          <div key={message.id} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span className="text-sm">{message.content}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => unpinMessage(community.id, message.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chat Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {community.chatMessages.map((message) => (
                        <div key={message.id} className="group">
                          <div className="flex space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">{message.senderAvatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm">{message.senderName}</span>
                                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                {message.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                              </div>
                              
                              {message.replyTo && (
                                <div className="text-xs text-muted-foreground mb-1 pl-3 border-l-2 border-muted">
                                  Replying to previous message
                                </div>
                              )}
                              
                              <p className="text-sm break-words">{message.content}</p>
                              
                              {message.reactions.length > 0 && (
                                <div className="flex items-center space-x-1 mt-2">
                                  {message.reactions.map((reaction, index) => (
                                    <Button
                                      key={index}
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs p-1 h-6"
                                      onClick={() => reactToMessage(community.id, message.id, reaction.emoji, currentUserId)}
                                    >
                                      {reaction.emoji} {reaction.users.length}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-3 h-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => setReplyTo(message.id)}>
                                    <Reply className="w-4 h-4 mr-2" />
                                    Reply
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => pinMessage(community.id, message.id)}>
                                    <Pin className="w-4 h-4 mr-2" />
                                    Pin Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Forward className="w-4 h-4 mr-2" />
                                    Forward
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    {replyTo && (
                      <div className="mb-2 p-2 bg-muted/50 rounded border-l-4 border-primary">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Replying to message</span>
                          <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-white text-xs">YU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-end space-x-2">
                          <div className="flex-1 border rounded-lg bg-background">
                            <Input
                              placeholder="Type a message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                              className="border-0 focus:ring-0"
                            />
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={isRecording ? 'text-red-500' : ''}
                              onClick={() => setIsRecording(!isRecording)}
                            >
                              <Mic className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Smile className="w-4 h-4" />
                            </Button>
                            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Other tabs would go here - Projects, Hackathons, Events, About */}
              <TabsContent value="projects" className="flex-1 p-4">
                <div className="text-center py-12">
                  <Code className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Community Projects</h3>
                  <p className="text-muted-foreground mb-4">Collaborate on exciting projects with community members</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="hackathons" className="flex-1 p-4">
                <div className="text-center py-12">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Hackathons</h3>
                  <p className="text-muted-foreground mb-4">Join exciting hackathons and win amazing prizes</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Hackathon
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="events" className="flex-1 p-4">
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Community Events</h3>
                  <p className="text-muted-foreground mb-4">Attend workshops, meetups, and networking events</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="about" className="flex-1 p-4">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {community.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{community.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Created:</span>
                          <p className="text-muted-foreground">{new Date(community.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Location:</span>
                          <p className="text-muted-foreground">{community.location}</p>
                        </div>
                        <div>
                          <span className="font-medium">Privacy:</span>
                          <p className="text-muted-foreground capitalize">{community.privacy}</p>
                        </div>
                        <div>
                          <span className="font-medium">Category:</span>
                          <p className="text-muted-foreground capitalize">{community.category}</p>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Tags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {community.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Community Rules:</span>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {community.rules.map((rule, index) => (
                            <li key={index} className="text-muted-foreground text-sm">{rule}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
