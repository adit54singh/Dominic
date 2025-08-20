import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  Users,
  Star,
  TrendingUp,
  Clock,
  Award,
  GitBranch,
  Calendar,
  Target,
  Zap
} from "lucide-react";

interface ActivityMetricsProps {
  selectedDomain: string;
}

interface CollaborationData {
  userId: string;
  name: string;
  avatar: string;
  projectName: string;
  rating: number;
  collaboration: string;
  timestamp: string;
}

interface ActivityData {
  dailyActivity: number;
  weeklyActivity: number;
  monthlyActivity: number;
  totalCollaborations: number;
  averageRating: number;
  activeProjects: number;
  completedProjects: number;
  mentorshipHours: number;
}

export default function ActivityMetrics({ selectedDomain }: ActivityMetricsProps) {
  // Mock activity data based on domain
  const getActivityData = (): ActivityData => {
    const baseData = {
      web: {
        dailyActivity: 85,
        weeklyActivity: 78,
        monthlyActivity: 82,
        totalCollaborations: 23,
        averageRating: 4.7,
        activeProjects: 3,
        completedProjects: 8,
        mentorshipHours: 30
      },
      mobile: {
        dailyActivity: 72,
        weeklyActivity: 69,
        monthlyActivity: 75,
        totalCollaborations: 15,
        averageRating: 4.5,
        activeProjects: 2,
        completedProjects: 5,
        mentorshipHours: 18
      },
      data: {
        dailyActivity: 68,
        weeklyActivity: 71,
        monthlyActivity: 69,
        totalCollaborations: 12,
        averageRating: 4.6,
        activeProjects: 2,
        completedProjects: 4,
        mentorshipHours: 22
      }
    };

    if (selectedDomain === 'web-dev') return baseData.web;
    if (selectedDomain === 'mobile-dev') return baseData.mobile;
    if (selectedDomain === 'data-science') return baseData.data;
    return baseData.web;
  };

  // Recent collaborations with ratings
  const recentCollaborations: CollaborationData[] = [
    {
      userId: "1",
      name: "Rajesh Kumar",
      avatar: "RK",
      projectName: "E-commerce Platform",
      rating: 5,
      collaboration: "Excellent frontend work and great communication throughout the project",
      timestamp: "2 days ago"
    },
    {
      userId: "2",
      name: "Priya Sharma",
      avatar: "PS",
      projectName: "Mobile Banking App",
      rating: 4,
      collaboration: "Strong technical skills, delivered quality code on time",
      timestamp: "1 week ago"
    },
    {
      userId: "3",
      name: "Arjun Patel",
      avatar: "AP",
      projectName: "Data Analytics Dashboard",
      rating: 5,
      collaboration: "Outstanding problem-solving abilities and team player",
      timestamp: "2 weeks ago"
    },
    {
      userId: "4",
      name: "Sneha Gupta",
      avatar: "SG",
      projectName: "Task Management Tool",
      rating: 4,
      collaboration: "Great attention to detail and responsive to feedback",
      timestamp: "3 weeks ago"
    }
  ];

  const activityData = getActivityData();

  const getActivityColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getActivityLabel = (percentage: number) => {
    if (percentage >= 80) return 'Very Active';
    if (percentage >= 60) return 'Active';
    if (percentage >= 40) return 'Moderate';
    return 'Low Activity';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Activity Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getActivityColor(activityData.dailyActivity)}`}>
                {activityData.dailyActivity}%
              </div>
              <div className="text-xs text-muted-foreground">Daily</div>
              <Badge variant="outline" className="text-xs mt-1">
                {getActivityLabel(activityData.dailyActivity)}
              </Badge>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getActivityColor(activityData.weeklyActivity)}`}>
                {activityData.weeklyActivity}%
              </div>
              <div className="text-xs text-muted-foreground">Weekly</div>
              <Badge variant="outline" className="text-xs mt-1">
                {getActivityLabel(activityData.weeklyActivity)}
              </Badge>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getActivityColor(activityData.monthlyActivity)}`}>
                {activityData.monthlyActivity}%
              </div>
              <div className="text-xs text-muted-foreground">Monthly</div>
              <Badge variant="outline" className="text-xs mt-1">
                {getActivityLabel(activityData.monthlyActivity)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collaboration Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Collaboration Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <GitBranch className="w-4 h-4" />
                  <span>Total Collaborations</span>
                </span>
                <span className="font-semibold">{activityData.totalCollaborations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Average Rating</span>
                </span>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">{activityData.averageRating}</span>
                  <div className="flex">
                    {renderStars(Math.round(activityData.averageRating))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>Active Projects</span>
                </span>
                <span className="font-semibold">{activityData.activeProjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>Completed Projects</span>
                </span>
                <span className="font-semibold">{activityData.completedProjects}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Mentorship Hours</span>
                </span>
                <span className="font-semibold">{activityData.mentorshipHours}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Success Rate</span>
                </span>
                <span className="font-semibold text-green-600">
                  {Math.round((activityData.completedProjects / (activityData.completedProjects + activityData.activeProjects)) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>Response Time</span>
                </span>
                <span className="font-semibold text-green-600">2.3h avg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Streak</span>
                </span>
                <Badge variant="secondary" className="text-xs">
                  12 days
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Ratings & Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <span>Recent Collaboration Ratings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCollaborations.map((collab) => (
              <div key={collab.userId} className="p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-white text-xs">
                      {collab.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{collab.name}</span>
                        <div className="flex">
                          {renderStars(collab.rating)}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{collab.timestamp}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Project: <span className="font-medium">{collab.projectName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      "{collab.collaboration}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
