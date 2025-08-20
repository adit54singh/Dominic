import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Briefcase, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
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
}

// Generate 10 dummy profiles for connect section
const generateConnectProfiles = (): ConnectUser[] => {
  const sampleProfiles = generateSampleProfiles();
  
  // Create 10 profiles with some additional ones
  const connectProfiles: ConnectUser[] = [
    ...sampleProfiles.slice(0, 8).map((profile, index) => ({
      id: profile.id,
      name: profile.name,
      title: profile.title,
      company: profile.company,
      avatar: profile.avatar,
      rating: profile.rating,
      connections: Math.floor(Math.random() * 500) + 100,
      skills: profile.skills.slice(0, 3),
      domain: profile.domains[0]
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
      skills: ["Product Strategy", "Analytics", "Design"],
      domain: "Product Management"
    },
    {
      id: "10", 
      name: "Rohan Gupta",
      title: "Growth Hacker",
      company: "Scale Ventures",
      avatar: "RG",
      rating: 4.5,
      connections: 280,
      skills: ["Marketing", "Analytics", "Growth"],
      domain: "Growth & Marketing"
    }
  ];
  
  return connectProfiles;
};

// Generate small profile cards for horizontal scrolling sections
const generateScrollableProfiles = (): ConnectUser[] => {
  const names = [
    { name: "Maya Shah", title: "UX Designer", company: "Creative Studio" },
    { name: "Dev Patel", title: "Backend Engineer", company: "Cloud Systems" },
    { name: "Sanya Jain", title: "Data Analyst", company: "Analytics Pro" },
    { name: "Ishaan Kumar", title: "Frontend Dev", company: "UI Masters" },
    { name: "Tanya Singh", title: "Product Designer", company: "Design Hub" },
    { name: "Arun Sharma", title: "DevOps Engineer", company: "Tech Infrastructure" }
  ];
  
  return names.map((profile, index) => ({
    id: `scroll-${index + 1}`,
    name: profile.name,
    title: profile.title,
    company: profile.company,
    avatar: profile.name.split(' ').map(n => n[0]).join(''),
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    connections: Math.floor(Math.random() * 400) + 50,
    skills: ["React", "Node.js", "Python", "Design", "Analytics"].slice(0, Math.floor(Math.random() * 3) + 2),
    domain: ["Tech", "Design", "Product"][Math.floor(Math.random() * 3)]
  }));
};

export default function ConnectSection() {
  const connectProfiles = generateConnectProfiles();
  const scrollableProfiles = generateScrollableProfiles();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Split main profiles into chunks with horizontal scrolling sections
  const renderProfiles = () => {
    const result = [];
    
    for (let i = 0; i < connectProfiles.length; i++) {
      // Add main profile
      result.push(
        <div key={connectProfiles[i].id} className="flex justify-center">
          <ProfileCard profile={connectProfiles[i]} />
        </div>
      );
      
      // Add horizontal scrolling section after every 2 profiles
      if ((i + 1) % 2 === 0 && i < connectProfiles.length - 1) {
        result.push(
          <div key={`scroll-section-${i}`} className="my-8">
            <HorizontalScrollSection profiles={scrollableProfiles.slice((i/2) * 3, (i/2 + 1) * 3)} />
          </div>
        );
      }
    }
    
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Connect with Talented Developers</h3>
        <p className="text-muted-foreground">
          Expand your network and collaborate with skilled professionals in your field
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {renderProfiles()}
      </div>
    </div>
  );
}

// Main profile card component
function ProfileCard({ profile }: { profile: ConnectUser }) {
  return (
    <Card className="w-full max-w-sm bg-background border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 text-center space-y-4">
        {/* Avatar */}
        <Avatar className="w-16 h-16 mx-auto border-2 border-primary/20">
          <AvatarFallback className="bg-primary text-white text-lg font-semibold">
            {profile.avatar}
          </AvatarFallback>
        </Avatar>
        
        {/* Profile Info */}
        <div>
          <h4 className="text-lg font-semibold">{profile.name}</h4>
          <p className="text-sm text-muted-foreground">{profile.title}</p>
          <div className="flex items-center justify-center space-x-1 mt-1">
            <Briefcase className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{profile.company}</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-sm">{profile.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-sm">{profile.connections}</span>
            </div>
            <span className="text-xs text-muted-foreground">Connections</span>
          </div>
        </div>
        
        {/* Domain */}
        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
          {profile.domain}
        </Badge>
        
        {/* Skills */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1 justify-center">
            {profile.skills.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{profile.skills.length - 2}
              </Badge>
            )}
          </div>
        </div>
        
        {/* View Profile Button */}
        <Link to={`/profile/${profile.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Horizontal scrolling section component
function HorizontalScrollSection({ profiles }: { profiles: ConnectUser[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 240;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-muted-foreground">Quick Connect</h4>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => scroll('left')}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => scroll('right')}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {profiles.map((profile) => (
          <div key={profile.id} className="flex-shrink-0 w-56">
            <SmallProfileCard profile={profile} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Small profile card for horizontal scrolling
function SmallProfileCard({ profile }: { profile: ConnectUser }) {
  return (
    <Card className="bg-background border hover:shadow-md transition-all duration-300">
      <CardContent className="p-4 text-center space-y-3">
        <Avatar className="w-12 h-12 mx-auto">
          <AvatarFallback className="bg-primary text-white text-sm font-semibold">
            {profile.avatar}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h5 className="font-medium text-sm">{profile.name}</h5>
          <p className="text-xs text-muted-foreground">{profile.title}</p>
        </div>
        
        <div className="flex justify-center space-x-3 text-xs">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span>{profile.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 text-blue-400" />
            <span>{profile.connections}</span>
          </div>
        </div>
        
        <Link to={`/profile/${profile.id}`}>
          <Button variant="outline" size="sm" className="w-full text-xs">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
