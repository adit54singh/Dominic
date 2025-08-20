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
  Zap,
  MessageCircle,
  BookOpen,
  Code,
  UserPlus,
  Trophy,
  Coffee,
  Heart,
  CheckCircle
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

interface PlatformActivity {
  id: string;
  type: 'project_joined' | 'project_completed' | 'member_followed' | 'skill_learned' | 'achievement_earned' | 'contribution_made' | 'review_received' | 'milestone_reached';
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  color: string;
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

  // User activities since joining platform
  const platformActivities: PlatformActivity[] = [
    {
      id: '1',
      type: 'project_joined',
      title: 'Joined E-commerce Platform Project',
      description: 'Started collaborating on a React-based e-commerce platform with 5 other developers',
      timestamp: '2 days ago',
      icon: GitBranch,
      color: 'text-blue-500'
    },
    {
      id: '2',
      type: 'member_followed',
      title: 'Connected with Rajesh Kumar',
      description: 'Started following senior full-stack developer for mentorship',
      timestamp: '3 days ago',
      icon: UserPlus,
      color: 'text-green-500'
    },
    {
      id: '3',
      type: 'project_completed',
      title: 'Completed Task Management Tool',
      description: 'Successfully delivered frontend components for productivity app',
      timestamp: '1 week ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: '4',
      type: 'achievement_earned',
      title: 'Earned "Collaborative Coder" Badge',
      description: 'Completed 10 successful project collaborations',
      timestamp: '1 week ago',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: '5',
      type: 'skill_learned',
      title: 'Mastered TypeScript',
      description: 'Completed advanced TypeScript course and applied in recent projects',
      timestamp: '2 weeks ago',
      icon: BookOpen,
      color: 'text-purple-500'
    },
    {
      id: '6',
      type: 'review_received',
      title: 'Received 5-star Review',
      description: 'Got excellent feedback from Priya Sharma for mobile banking app work',
      timestamp: '2 weeks ago',
      icon: Star,
      color: 'text-yellow-400'
    },
    {
      id: '7',
      type: 'contribution_made',
      title: 'Contributed to Open Source',
      description: 'Made significant contributions to React component library',
      timestamp: '3 weeks ago',
      icon: Code,
      color: 'text-blue-400'
    },
    {
      id: '8',
      type: 'milestone_reached',
      title: 'Reached 1000 Hours of Coding',
      description: 'Hit major coding milestone since joining the platform',
      timestamp: '1 month ago',
      icon: Coffee,
      color: 'text-orange-500'
    },
    {
      id: '9',
      type: 'member_followed',
      title: 'Connected with Sneha Agarwal',
      description: 'Started following UI/UX designer for design insights',
      timestamp: '1 month ago',
      icon: UserPlus,
      color: 'text-green-500'
    },
    {
      id: '10',
      type: 'project_joined',
      title: 'Joined Platform Beta Testing',
      description: 'Became one of the first users to test new platform features',
      timestamp: '2 months ago',
      icon: Heart,
      color: 'text-red-500'
    }
  ];

  const getActivityTypeLabel = (type: string) => {
    const labels = {
      'project_joined': 'Project',
      'project_completed': 'Completed',
      'member_followed': 'Connection',
      'skill_learned': 'Learning',
      'achievement_earned': 'Achievement',
      'contribution_made': 'Contribution',
      'review_received': 'Review',
      'milestone_reached': 'Milestone'
    };
    return labels[type as keyof typeof labels] || 'Activity';
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

      {/* Platform Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Your Journey Since Joining</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-background border-2 border-current ${activity.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold">{activity.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {getActivityTypeLabel(activity.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-500">{platformActivities.filter(a => a.type === 'project_joined').length}</div>
                <div className="text-xs text-muted-foreground">Projects Joined</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-500">{platformActivities.filter(a => a.type === 'project_completed').length}</div>
                <div className="text-xs text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-500">{platformActivities.filter(a => a.type === 'skill_learned').length}</div>
                <div className="text-xs text-muted-foreground">Skills Learned</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-500">{platformActivities.filter(a => a.type === 'achievement_earned').length}</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
