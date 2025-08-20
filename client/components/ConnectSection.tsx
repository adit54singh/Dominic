import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  Briefcase,
  Users,
  MapPin,
  Clock,
  UserPlus,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { generateSampleProfiles } from "./ProfileCard";

interface ConnectUser {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  connections: number;
  skills: string[];
  domain: string;
  experience: string;
  location: string;
  bio: string;
  projectsCollaborated: number;
}

// Generate 10 detailed profiles for connect section
const generateConnectProfiles = (): ConnectUser[] => {
  const sampleProfiles = generateSampleProfiles();

  // Create 10 profiles with additional details
  const connectProfiles: ConnectUser[] = [
    ...sampleProfiles.slice(0, 8).map((profile, index) => ({
      id: profile.id,
      name: profile.name,
      title: profile.title,
      company: profile.company,
      avatar: profile.avatar,
      rating: profile.rating,
      connections: Math.floor(Math.random() * 500) + 100,
      skills: profile.skills,
      domain: profile.domains[0],
      experience: profile.experience,
      location: [
        "Mumbai, India",
        "Delhi, India",
        "Bangalore, India",
        "Pune, India",
        "Chennai, India",
      ][Math.floor(Math.random() * 5)],
      bio: `Passionate ${profile.domains[0].toLowerCase()} enthusiast with ${profile.experience} of experience. Love building scalable applications and collaborating with talented developers.`,
      projectsCollaborated: profile.projectsCollaborated,
    })),
    // Add 2 more unique profiles
    {
      id: "9",
      name: "Kavya Reddy",
      title: "Product Manager",
      company: "Innovation Labs",
      avatar: "KR",
      rating: 4.7,
      connections: 320,
      skills: ["Product Strategy", "Analytics", "Design Thinking", "Agile"],
      domain: "Product Management",
      experience: "3 Years",
      location: "Hyderabad, India",
      bio: "Strategic product manager with expertise in building user-centric products and leading cross-functional teams.",
      projectsCollaborated: 18,
    },
    {
      id: "10",
      name: "Rohan Gupta",
      title: "Growth Hacker",
      company: "Scale Ventures",
      avatar: "RG",
      rating: 4.5,
      connections: 280,
      skills: ["Marketing", "Analytics", "Growth Strategy", "SEO"],
      domain: "Growth & Marketing",
      experience: "2 Years",
      location: "Gurgaon, India",
      bio: "Growth-focused marketer with experience in scaling startups and driving user acquisition through data-driven strategies.",
      projectsCollaborated: 12,
    },
  ];

  return connectProfiles;
};

export default function ConnectSection() {
  const connectProfiles = generateConnectProfiles();
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());

  const handleConnect = (userId: string) => {
    setConnectedUsers((prev) => {
      const newConnected = new Set(prev);
      if (newConnected.has(userId)) {
        newConnected.delete(userId);
      } else {
        newConnected.add(userId);
      }
      return newConnected;
    });
  };

  // Get featured profiles (top 3 by rating)
  const featuredProfiles = connectProfiles
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">
          Connect with Talented Developers
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Expand your network and collaborate with skilled professionals in your field
        </p>
      </div>

      {/* Featured Profiles - Top 3 in a grid */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
            ⭐ Featured Profiles
          </Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredProfiles.map((profile) => (
            <FeaturedProfileCard
              key={profile.id}
              profile={profile}
              isConnected={connectedUsers.has(profile.id)}
              onConnect={() => handleConnect(profile.id)}
            />
          ))}
        </div>
      </div>

      {/* All Profiles Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-2">More Amazing Developers</h4>
          <p className="text-muted-foreground">Discover more talented individuals in our community</p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {connectProfiles.slice(3).map((profile) => (
            <DetailedProfileCard
              key={profile.id}
              profile={profile}
              isConnected={connectedUsers.has(profile.id)}
              onConnect={() => handleConnect(profile.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Featured profile card component for top 3 profiles
function FeaturedProfileCard({
  profile,
  isConnected,
  onConnect,
}: {
  profile: ConnectUser;
  isConnected: boolean;
  onConnect: () => void;
}) {
  return (
    <Card className="group bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
      <CardContent className="p-6 text-center">
        {/* Avatar with featured styling */}
        <div className="relative mb-4">
          <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20 shadow-lg">
            <AvatarFallback className="bg-primary text-white text-2xl font-bold">
              {profile.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1">
              ⭐ TOP
            </Badge>
          </div>
        </div>

        {/* Name and title */}
        <h4 className="text-xl font-bold mb-2">{profile.name}</h4>
        <p className="text-muted-foreground mb-3">{profile.title}</p>

        {/* Rating and connections */}
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-primary">{profile.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-blue-600">{profile.connections}</span>
          </div>
        </div>

        {/* Domain badge */}
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
          {profile.domain}
        </Badge>

        {/* Top skills */}
        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-1">
            {profile.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link to={`/profile/${profile.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </Link>
          <Button
            onClick={onConnect}
            size="sm"
            className={`flex-1 ${isConnected ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"}`}
          >
            {isConnected ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Connected
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-1" />
                Connect
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Detailed profile card component
function DetailedProfileCard({
  profile,
  isConnected,
  onConnect,
}: {
  profile: ConnectUser;
  isConnected: boolean;
  onConnect: () => void;
}) {
  return (
    <Card className="w-full bg-background border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Avatar and basic info */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <Avatar className="w-20 h-20 border-2 border-primary/20">
              <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                {profile.avatar}
              </AvatarFallback>
            </Avatar>

            {/* Rating and connections */}
            <div className="flex gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{profile.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="font-medium">{profile.connections}</span>
              </div>
            </div>
          </div>

          {/* Right side - Profile details */}
          <div className="flex-1 space-y-4">
            {/* Name and title */}
            <div>
              <h4 className="text-xl font-bold">{profile.name}</h4>
              <p className="text-muted-foreground">{profile.title}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{profile.company}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{profile.experience} experience</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>

            {/* Domain and Projects */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {profile.domain}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {profile.projectsCollaborated} Projects Collaborated
              </Badge>
            </div>

            {/* Skills */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {profile.skills.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{profile.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Link to={`/profile/${profile.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Button
                onClick={onConnect}
                size="sm"
                className={`flex-1 ${isConnected ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"}`}
              >
                {isConnected ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Connected
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
