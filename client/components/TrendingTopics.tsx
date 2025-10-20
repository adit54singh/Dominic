import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Hash, Activity } from "lucide-react";

interface TrendingTopicsProps {
  topics: Array<{
    name: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }>;
}

export default function TrendingTopics({ topics }: TrendingTopicsProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      default:
        return <Activity className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span>Trending Topics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Hash className="w-4 h-4 text-primary" />
                <span className="font-medium group-hover:text-primary transition-colors cursor-pointer">
                  {topic.name}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {topic.count}
              </Badge>
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor(topic.trend)}`}>
              {getTrendIcon(topic.trend)}
              <span>{topic.change > 0 ? '+' : ''}{topic.change}%</span>
            </div>
          </div>
        ))}
        
        {topics.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Hash className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No trending topics yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
