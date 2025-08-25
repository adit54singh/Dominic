import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Code, Trophy, TrendingUp, Zap } from "lucide-react";

interface CommunityStatsProps {
  stats: {
    totalCommunities: number;
    totalMembers: number;
    totalPosts: number;
    totalProjects: number;
    totalHackathons: number;
    activeToday: number;
  };
}

export default function CommunityStats({ stats }: CommunityStatsProps) {
  const statItems = [
    {
      icon: Users,
      label: "Communities",
      value: stats.totalCommunities,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Users,
      label: "Total Members",
      value: stats.totalMembers.toLocaleString(),
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: MessageCircle,
      label: "Posts Shared",
      value: stats.totalPosts,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Code,
      label: "Projects",
      value: stats.totalProjects,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Trophy,
      label: "Hackathons",
      value: stats.totalHackathons,
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: Zap,
      label: "Active Today",
      value: stats.activeToday,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((item, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
