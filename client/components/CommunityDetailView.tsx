import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  X,
  Users,
  MessageCircle,
  Heart,
  Share,
  Send,
  Image,
  Plus,
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
  Shield
} from "lucide-react";
import { useCommunityStore, type Community } from "@/lib/community-store";

interface CommunityDetailViewProps {
  community: Community;
  onClose: () => void;
}

export default function CommunityDetailView({ community, onClose }: CommunityDetailViewProps) {
  const {
    followUser,
    unfollowUser,
    followedUsers,
    addPost,
    likePost,
    addProject,
    addHackathon,
    addQuery,
    joinEvent,
    joinHackathon,
    markInterested,
    upvoteQuery
  } = useCommunityStore();

  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showHackathonModal, setShowHackathonModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: "",
    lookingFor: "",
    github: "",
    demo: ""
  });

  // Hackathon form state
  const [hackathonForm, setHackathonForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    prize: "",
    maxParticipants: "",
    registrationDeadline: "",
    technologies: "",
    difficulty: "intermediate" as const
  });

  // Query form state
  const [queryForm, setQueryForm] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const handlePost = () => {
    if (newPost.trim()) {
      addPost(community.id, {
        author: {
          id: "current-user",
          name: "You",
          title: "Community Member",
          avatar: "YU",
          isFollowed: false,
          lastActive: "now",
          joinedAt: new Date().toISOString(),
          role: "member"
        },
        content: newPost,
        image: selectedImage || undefined,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        type: "general",
        tags: []
      });
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

  const handleSubmitProject = () => {
    if (projectForm.title && projectForm.description) {
      addProject(community.id, {
        title: projectForm.title,
        description: projectForm.description,
        author: {
          id: "current-user",
          name: "You",
          title: "Project Creator",
          avatar: "YU",
          isFollowed: false,
          lastActive: "now",
          joinedAt: new Date().toISOString(),
          role: "member"
        },
        technologies: projectForm.technologies.split(",").map(t => t.trim()).filter(Boolean),
        lookingFor: projectForm.lookingFor.split(",").map(t => t.trim()).filter(Boolean),
        github: projectForm.github || undefined,
        demo: projectForm.demo || undefined,
        interested: 0,
        isInterested: false
      });
      setProjectForm({ title: "", description: "", technologies: "", lookingFor: "", github: "", demo: "" });
      setShowProjectModal(false);
    }
  };

  const handleSubmitHackathon = () => {
    if (hackathonForm.title && hackathonForm.description && hackathonForm.startDate && hackathonForm.endDate) {
      addHackathon(community.id, {
        title: hackathonForm.title,
        description: hackathonForm.description,
        organizer: {
          id: "current-user",
          name: "You",
          title: "Event Organizer",
          avatar: "YU",
          isFollowed: false,
          lastActive: "now",
          joinedAt: new Date().toISOString(),
          role: "member"
        },
        startDate: new Date(hackathonForm.startDate).toISOString(),
        endDate: new Date(hackathonForm.endDate).toISOString(),
        prize: hackathonForm.prize || undefined,
        participants: 0,
        maxParticipants: hackathonForm.maxParticipants ? parseInt(hackathonForm.maxParticipants) : undefined,
        isParticipating: false,
        registrationDeadline: hackathonForm.registrationDeadline ? new Date(hackathonForm.registrationDeadline).toISOString() : new Date(hackathonForm.startDate).toISOString(),
        technologies: hackathonForm.technologies.split(",").map(t => t.trim()).filter(Boolean),
        difficulty: hackathonForm.difficulty
      });
      setHackathonForm({
        title: "", description: "", startDate: "", endDate: "", prize: "", 
        maxParticipants: "", registrationDeadline: "", technologies: "", difficulty: "intermediate"
      });
      setShowHackathonModal(false);
    }
  };

  const handleSubmitQuery = () => {
    if (queryForm.title && queryForm.content) {
      addQuery(community.id, {
        title: queryForm.title,
        content: queryForm.content,
        author: {
          id: "current-user",
          name: "You",
          title: "Community Member",
          avatar: "YU",
          isFollowed: false,
          lastActive: "now",
          joinedAt: new Date().toISOString(),
          role: "member"
        },
        tags: queryForm.tags.split(",").map(t => t.trim()).filter(Boolean),
        answers: 0,
        isAnswered: false,
        views: 0,
        upvotes: 0,
        isUpvoted: false
      });
      setQueryForm({ title: "", content: "", tags: "" });
      setShowQueryModal(false);
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Community Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg"></div>
        <div className="absolute -bottom-8 left-6 flex items-end space-x-4">
          {community.image ? (
            <img src={community.image} alt={community.name} className="w-16 h-16 rounded-xl border-4 border-background" />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center border-4 border-background">
              <Users className="w-8 h-8 text-white" />
            </div>
          )}
          <div className="pb-2">
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              {community.name}
              {community.isOwner && <Crown className="w-5 h-5 text-yellow-500" />}
            </h1>
            <p className="text-muted-foreground">{community.members.toLocaleString()} members • {community.posts} posts</p>
          </div>
        </div>
      </div>

      <div className="pt-8 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{community.members}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{community.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{community.projects?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{community.hackathons?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Hackathons</div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About This Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{community.description}</p>
            
            {community.goals && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Goals & Objectives
                </h4>
                <p className="text-muted-foreground">{community.goals}</p>
              </div>
            )}

            {community.location && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{community.location}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {community.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Rules */}
        {community.rules && community.rules.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {community.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const PostsTab = () => (
    <div className="space-y-6">
      {/* Post Creation */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Share something with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            {selectedImage && (
              <div className="relative inline-block">
                <img src={selectedImage} alt="Selected" className="max-w-xs rounded-lg border" />
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
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button variant="ghost" size="sm" asChild>
                  <span><Image className="w-4 h-4 mr-2" />Image</span>
                </Button>
              </label>
              <Button onClick={handlePost} disabled={!newPost.trim()}>
                <Send className="w-4 h-4 mr-2" />Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      {community.recentPosts && community.recentPosts.length > 0 ? (
        <div className="space-y-4">
          {community.recentPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">{post.author.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{post.author.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.author.title}</p>
                  </div>
                </div>
                <p className="mb-4 leading-relaxed">{post.content}</p>
                {post.image && <img src={post.image} alt="Post" className="w-full max-w-md rounded-lg mb-4" />}
                <div className="flex items-center space-x-6 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => likePost(community.id, post.id)}
                    className={post.isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />{post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4 mr-1" />{post.shares}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground">Be the first to share something with this community!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const MembersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Community Members</h3>
        <Badge variant="secondary">{community.membersList?.length || 0} members</Badge>
      </div>

      {/* People You Follow */}
      {community.membersList && community.membersList.filter(m => followedUsers.has(m.id)).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              People You Follow ({community.membersList.filter(m => followedUsers.has(m.id)).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {community.membersList.filter(m => followedUsers.has(m.id)).map((member) => (
                <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{member.name}</span>
                      {member.role === 'owner' && <Crown className="w-3 h-3 text-yellow-500" />}
                      {member.role === 'admin' && <Shield className="w-3 h-3 text-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                    <p className="text-xs text-muted-foreground">Active {member.lastActive}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => unfollowUser(member.id)}
                  >
                    Following
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">All Members</CardTitle>
        </CardHeader>
        <CardContent>
          {community.membersList && community.membersList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {community.membersList.map((member) => (
                <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{member.name}</span>
                      {member.role === 'owner' && <Crown className="w-3 h-3 text-yellow-500" />}
                      {member.role === 'admin' && <Shield className="w-3 h-3 text-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                    <p className="text-xs text-muted-foreground">Active {member.lastActive}</p>
                  </div>
                  <Button
                    variant={followedUsers.has(member.id) ? "outline" : "default"}
                    size="sm"
                    onClick={() => followedUsers.has(member.id) ? unfollowUser(member.id) : followUser(member.id)}
                  >
                    {followedUsers.has(member.id) ? "Following" : "Follow"}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No members to display</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const ProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Community Projects</h3>
        <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Share Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Share Your Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Project Title"
                value={projectForm.title}
                onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Project Description"
                value={projectForm.description}
                onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
              <Input
                placeholder="Technologies (comma separated)"
                value={projectForm.technologies}
                onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
              />
              <Input
                placeholder="Looking for (roles, comma separated)"
                value={projectForm.lookingFor}
                onChange={(e) => setProjectForm(prev => ({ ...prev, lookingFor: e.target.value }))}
              />
              <Input
                placeholder="GitHub URL (optional)"
                value={projectForm.github}
                onChange={(e) => setProjectForm(prev => ({ ...prev, github: e.target.value }))}
              />
              <Input
                placeholder="Demo URL (optional)"
                value={projectForm.demo}
                onChange={(e) => setProjectForm(prev => ({ ...prev, demo: e.target.value }))}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowProjectModal(false)}>Cancel</Button>
                <Button onClick={handleSubmitProject}>Share Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {community.projects && community.projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {community.projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">{project.author.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.author.name}</p>
                      <p className="text-sm text-muted-foreground">{project.author.title}</p>
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Technologies:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {project.lookingFor.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Looking for:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.lookingFor.map((role, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{role}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markInterested(community.id, project.id)}
                      className={project.isInterested ? "text-blue-500" : ""}
                    >
                      <Star className={`w-4 h-4 mr-1 ${project.isInterested ? "fill-current" : ""}`} />
                      {project.interested}
                    </Button>
                    {project.github && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <GitBranch className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No projects shared yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share your project with the community!</p>
            <Button onClick={() => setShowProjectModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Share Your Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const HackathonsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Hackathons & Events</h3>
        <Dialog open={showHackathonModal} onOpenChange={setShowHackathonModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Hackathon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Hackathon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <Input
                placeholder="Hackathon Title"
                value={hackathonForm.title}
                onChange={(e) => setHackathonForm(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Hackathon Description"
                value={hackathonForm.description}
                onChange={(e) => setHackathonForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="datetime-local"
                    value={hackathonForm.startDate}
                    onChange={(e) => setHackathonForm(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="datetime-local"
                    value={hackathonForm.endDate}
                    onChange={(e) => setHackathonForm(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <Input
                placeholder="Prize (optional)"
                value={hackathonForm.prize}
                onChange={(e) => setHackathonForm(prev => ({ ...prev, prize: e.target.value }))}
              />
              <Input
                placeholder="Max Participants (optional)"
                type="number"
                value={hackathonForm.maxParticipants}
                onChange={(e) => setHackathonForm(prev => ({ ...prev, maxParticipants: e.target.value }))}
              />
              <Input
                placeholder="Technologies (comma separated)"
                value={hackathonForm.technologies}
                onChange={(e) => setHackathonForm(prev => ({ ...prev, technologies: e.target.value }))}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowHackathonModal(false)}>Cancel</Button>
                <Button onClick={handleSubmitHackathon}>Create Hackathon</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {community.hackathons && community.hackathons.length > 0 ? (
        <div className="space-y-4">
          {community.hackathons.map((hackathon) => (
            <Card key={hackathon.id} className="group hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{hackathon.title}</h4>
                      <p className="text-sm text-muted-foreground">by {hackathon.organizer.name}</p>
                    </div>
                  </div>
                  <Badge variant={hackathon.difficulty === 'beginner' ? 'default' : hackathon.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                    {hackathon.difficulty}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4">{hackathon.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(hackathon.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(hackathon.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Participants</p>
                    <p className="text-sm text-muted-foreground">{hackathon.participants}{hackathon.maxParticipants ? ` / ${hackathon.maxParticipants}` : ''}</p>
                  </div>
                  {hackathon.prize && (
                    <div>
                      <p className="text-sm font-medium">Prize</p>
                      <p className="text-sm text-muted-foreground">{hackathon.prize}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {hackathon.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Registration deadline: {new Date(hackathon.registrationDeadline).toLocaleDateString()}
                  </div>
                  <Button
                    variant={hackathon.isParticipating ? "outline" : "default"}
                    onClick={() => joinHackathon(community.id, hackathon.id)}
                  >
                    {hackathon.isParticipating ? "Leave" : "Participate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No hackathons yet</h3>
            <p className="text-muted-foreground mb-4">Create an exciting hackathon for the community!</p>
            <Button onClick={() => setShowHackathonModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Hackathon
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const QueriesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Questions & Answers</h3>
        <Dialog open={showQueryModal} onOpenChange={setShowQueryModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ask a Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Question Title"
                value={queryForm.title}
                onChange={(e) => setQueryForm(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Describe your question in detail..."
                value={queryForm.content}
                onChange={(e) => setQueryForm(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
              />
              <Input
                placeholder="Tags (comma separated)"
                value={queryForm.tags}
                onChange={(e) => setQueryForm(prev => ({ ...prev, tags: e.target.value }))}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowQueryModal(false)}>Cancel</Button>
                <Button onClick={handleSubmitQuery}>Ask Question</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {community.queries && community.queries.length > 0 ? (
        <div className="space-y-4">
          {community.queries.map((query) => (
            <Card key={query.id} className="group hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-center space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => upvoteQuery(community.id, query.id)}
                      className={`p-1 ${query.isUpvoted ? "text-blue-500" : ""}`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${query.isUpvoted ? "fill-current" : ""}`} />
                    </Button>
                    <div className="text-sm font-medium">{query.upvotes}</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-bold group-hover:text-primary transition-colors">{query.title}</h4>
                      {query.isAnswered && <Badge variant="default" className="bg-green-500">Answered</Badge>}
                    </div>
                    
                    <p className="text-muted-foreground mb-3 leading-relaxed">{query.content}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {query.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{query.answers} answers</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{query.views} views</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>by {query.author.name}</span>
                        <span>•</span>
                        <span>{new Date(query.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No questions yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to ask a question and start the discussion!</p>
            <Button onClick={() => setShowQueryModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            {community.image ? (
              <img src={community.image} alt={community.name} className="w-10 h-10 rounded-lg" />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold">{community.name}</h2>
              <p className="text-sm text-muted-foreground">
                {community.members.toLocaleString()} members • {community.category}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="mx-6 mt-4 grid grid-cols-6 w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
              <TabsTrigger value="queries">Q&A</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-6">
              <TabsContent value="overview" className="mt-0">
                <OverviewTab />
              </TabsContent>
              <TabsContent value="posts" className="mt-0">
                <PostsTab />
              </TabsContent>
              <TabsContent value="members" className="mt-0">
                <MembersTab />
              </TabsContent>
              <TabsContent value="projects" className="mt-0">
                <ProjectsTab />
              </TabsContent>
              <TabsContent value="hackathons" className="mt-0">
                <HackathonsTab />
              </TabsContent>
              <TabsContent value="queries" className="mt-0">
                <QueriesTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
