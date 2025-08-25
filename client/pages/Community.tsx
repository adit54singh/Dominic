import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Users,
  TrendingUp,
  Calendar,
  Code,
  MessageCircle,
  Star,
  ExternalLink,
  UserPlus,
  Crown,
  Shield,
  Clock,
  MapPin,
  Filter,
  SortDesc,
  Eye,
  ChevronRight
} from "lucide-react";
import { useCommunityStore } from "@/lib/community-store";
import CommunityCreationModal from "@/components/CommunityCreationModal";
import CommunityDetailView from "@/components/CommunityDetailView";
import CommunityStats from "@/components/CommunityStats";
import TrendingTopics from "@/components/TrendingTopics";
import AnimatedCommunityShowcase from "@/components/AnimatedCommunityShowcase";

export default function Community() {
  const {
    communities,
    joinedCommunities,
    joinCommunity,
    leaveCommunity,
    setCurrentCommunity,
    followUser,
    unfollowUser
  } = useCommunityStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);

  const categories = [
    { id: "all", name: "All", icon: "🌐" },
    { id: "tech", name: "Technology", icon: "💻" },
    { id: "design", name: "Design", icon: "🎨" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "data", name: "Data Science", icon: "📊" },
    { id: "mobile", name: "Mobile Dev", icon: "📱" },
    { id: "content", name: "Content", icon: "✍️" }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinCommunity = (communityId: string) => {
    const community = communities.find(c => c.id === communityId);
    if (community) {
      if (community.isJoined) {
        leaveCommunity(communityId);
      } else {
        joinCommunity(communityId);
      }
    }
  };

  const handleViewCommunity = (community: any) => {
    setSelectedCommunity(community);
    setCurrentCommunity(community);
    setShowDetailView(true);
  };

  const CommunityCard = ({ community }: { community: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          {community.image ? (
            <img 
              src={community.image} 
              alt={community.name} 
              className="w-16 h-16 rounded-xl object-cover border-2 border-border"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border">
              <Users className="w-8 h-8 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate">
                {community.name}
              </h3>
              {community.isOwner && (
                <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
              {community.description}
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{community.members.toLocaleString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{community.posts}</span>
                </span>
                {community.location && (
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{community.location}</span>
                  </span>
                )}
              </div>
              <Badge variant={community.privacy === 'public' ? 'default' : 'secondary'} className="text-xs">
                {community.privacy === 'public' ? 'Public' : 'Private'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {community.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {community.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{community.tags.length - 3}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant={community.isJoined ? "outline" : "default"}
                size="sm"
                onClick={() => handleJoinCommunity(community.id)}
                className="min-w-[80px]"
              >
                {community.isJoined ? "Leave" : "Join"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewCommunity(community)}
                className="hover:bg-primary/10"
              >
                View
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const YourCommunitiesSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Communities</h2>
        <Badge variant="secondary" className="px-3 py-1">
          {joinedCommunities.length} joined
        </Badge>
      </div>
      
      {joinedCommunities.length === 0 ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No communities yet</h3>
            <p className="text-muted-foreground mb-4">
              Join communities to connect with like-minded people and collaborate on projects.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Community
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {joinedCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
    </div>
  );

  const ExploreCommunitiesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Explore Communities</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SortDesc className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search communities, topics, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-border"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="h-8"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>

      {filteredCommunities.length === 0 && (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No communities found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or explore different categories.
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const TrendingSection = () => {
    const trendingTopics = [
      { name: "React 18", count: 127, trend: 'up' as const, change: 12 },
      { name: "AI/ML", count: 89, trend: 'up' as const, change: 25 },
      { name: "Web3", count: 67, trend: 'down' as const, change: -5 },
      { name: "TypeScript", count: 156, trend: 'up' as const, change: 8 },
      { name: "Next.js", count: 94, trend: 'stable' as const, change: 0 },
      { name: "Vue.js", count: 45, trend: 'up' as const, change: 15 }
    ];

    const platformStats = {
      totalCommunities: communities.length,
      totalMembers: communities.reduce((acc, c) => acc + c.members, 0),
      totalPosts: communities.reduce((acc, c) => acc + c.posts, 0),
      totalProjects: communities.reduce((acc, c) => acc + (c.projects?.length || 0), 0),
      totalHackathons: communities.reduce((acc, c) => acc + (c.hackathons?.length || 0), 0),
      activeToday: Math.floor(Math.random() * 500) + 200
    };

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Platform Overview
          </h2>
          <p className="text-muted-foreground">Real-time insights and trending topics</p>
        </div>

        {/* Platform Stats */}
        <CommunityStats stats={platformStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trending Topics */}
          <TrendingTopics topics={trendingTopics} />

          {/* Active Communities */}
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span>Most Active Communities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {communities.slice(0, 6).map((community, index) => (
                <div key={community.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer" onClick={() => handleViewCommunity(community)}>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">{community.name}</p>
                      <p className="text-sm text-muted-foreground">{community.members} members</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning Communities
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with like-minded learners, share knowledge, collaborate on projects, and grow together
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setShowCreateModal(true)} className="px-6 py-3">
              <Plus className="w-4 h-4 mr-2" />
              Create Community
            </Button>
            <Button variant="outline" className="px-6 py-3">
              <Search className="w-4 h-4 mr-2" />
              Browse All
            </Button>
          </div>
        </div>

        {/* Featured Communities Showcase */}
        <AnimatedCommunityShowcase />

        {/* Main Content */}
        <Tabs defaultValue="your-communities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="your-communities" className="text-sm">
              Your Communities ({joinedCommunities.length})
            </TabsTrigger>
            <TabsTrigger value="explore" className="text-sm">
              Explore ({communities.length})
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-sm">
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="your-communities">
            <YourCommunitiesSection />
          </TabsContent>

          <TabsContent value="explore">
            <ExploreCommunitiesSection />
          </TabsContent>

          <TabsContent value="trending">
            <TrendingSection />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CommunityCreationModal
          onClose={() => setShowCreateModal(false)}
          onCreateCommunity={(community) => {
            // Community creation is handled by the store
            setShowCreateModal(false);
          }}
        />
      )}

      {showDetailView && selectedCommunity && (
        <CommunityDetailView
          community={selectedCommunity}
          onClose={() => setShowDetailView(false)}
        />
      )}
    </div>
  );
}
