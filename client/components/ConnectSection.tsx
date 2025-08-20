import React, { memo, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  UserPlus,
  MapPin,
  Star,
  Eye,
  Clock,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  rating: number;
  studentsHelped: number;
  responseTime: string;
  expertise: string[];
  bio: string;
  isOnline: boolean;
}

// Memoized user card component
const UserCard = memo(
  ({
    user,
    onFollow,
    onMessage,
    onView,
    isFollowed,
  }: {
    user: User;
    onFollow: (id: string) => void;
    onMessage: (id: string) => void;
    onView: (id: string) => void;
    isFollowed: boolean;
  }) => {
    const handleFollow = useCallback(
      () => onFollow(user.id),
      [onFollow, user.id],
    );
    const handleMessage = useCallback(
      () => onMessage(user.id),
      [onMessage, user.id],
    );
    const handleView = useCallback(() => onView(user.id), [onView, user.id]);

    return (
      <Card className="group border-0 bg-background/90 hover:shadow-lg transition-all duration-200 will-change-transform contain-layout">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-white font-semibold">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{user.rating}</span>
                </div>
              </div>

              <p className="text-primary font-medium text-sm mb-1">
                {user.title}
              </p>

              <div className="flex items-center text-muted-foreground text-sm mb-3">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{user.location}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {user.bio}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {user.expertise.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {user.expertise.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{user.expertise.length - 3}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  <span>{user.studentsHelped} helped</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{user.responseTime}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant={isFollowed ? "secondary" : "default"}
                  size="sm"
                  onClick={handleFollow}
                  className="flex-1 transition-colors"
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  {isFollowed ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleMessage}>
                  <MessageCircle className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleView}>
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);

UserCard.displayName = "UserCard";

const ConnectSection = memo(() => {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  // Memoized user data to prevent unnecessary re-calculations
  const users = useMemo<User[]>(
    () => [
      {
        id: "1",
        name: "Rajesh Kumar",
        title: "Full Stack Developer",
        location: "Bangalore, India",
        avatar: "RK",
        rating: 4.9,
        studentsHelped: 247,
        responseTime: "~2 hrs",
        expertise: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
        bio: "Former Amazon SDE helping students break into FAANG. Specialized in system design and coding interviews.",
        isOnline: true,
      },
      {
        id: "2",
        name: "Priya Sharma",
        title: "Data Scientist",
        location: "Mumbai, India",
        avatar: "PS",
        rating: 4.8,
        studentsHelped: 189,
        responseTime: "~1 hr",
        expertise: ["Python", "Machine Learning", "TensorFlow", "SQL"],
        bio: "ML Engineer at Google. Passionate about teaching data science and helping students land their dream jobs.",
        isOnline: false,
      },
      {
        id: "3",
        name: "Arjun Patel",
        title: "Mobile Developer",
        location: "Pune, India",
        avatar: "AP",
        rating: 4.7,
        studentsHelped: 156,
        responseTime: "~3 hrs",
        expertise: ["React Native", "Flutter", "iOS", "Android"],
        bio: "Senior iOS developer with 5+ years experience. Love mentoring aspiring mobile developers.",
        isOnline: true,
      },
      {
        id: "4",
        name: "Sneha Agarwal",
        title: "UI/UX Designer",
        location: "Delhi, India",
        avatar: "SA",
        rating: 4.9,
        studentsHelped: 203,
        responseTime: "~1 hr",
        expertise: ["Figma", "Design Systems", "User Research", "Prototyping"],
        bio: "Lead designer at Zomato. Helping students build beautiful and user-friendly interfaces.",
        isOnline: true,
      },
      {
        id: "5",
        name: "Vikram Singh",
        title: "DevOps Engineer",
        location: "Hyderabad, India",
        avatar: "VS",
        rating: 4.6,
        studentsHelped: 134,
        responseTime: "~4 hrs",
        expertise: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
        bio: "DevOps expert at Microsoft. Passionate about cloud technologies and automation.",
        isOnline: false,
      },
      {
        id: "6",
        name: "Ritu Mehta",
        title: "Product Manager",
        location: "Gurgaon, India",
        avatar: "RM",
        rating: 4.8,
        studentsHelped: 178,
        responseTime: "~2 hrs",
        expertise: [
          "Product Strategy",
          "Analytics",
          "Agile",
          "User Experience",
        ],
        bio: "Senior PM at Flipkart. Guiding students on product thinking and career transitions.",
        isOnline: true,
      },
    ],
    [],
  );

  const handleFollow = useCallback((userId: string) => {
    setFollowedUsers((prev) => {
      const newFollowed = new Set(prev);
      if (newFollowed.has(userId)) {
        newFollowed.delete(userId);
      } else {
        newFollowed.add(userId);
      }
      return newFollowed;
    });
  }, []);

  const handleMessage = useCallback((userId: string) => {
    console.log("Message user:", userId);
  }, []);

  const handleView = useCallback((userId: string) => {
    console.log("View profile:", userId);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Connect with Mentors</h3>
        <p className="text-muted-foreground">
          Learn from experienced professionals who've been in your shoes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onFollow={handleFollow}
            onMessage={handleMessage}
            onView={handleView}
            isFollowed={followedUsers.has(user.id)}
          />
        ))}
      </div>
    </div>
  );
});

ConnectSection.displayName = "ConnectSection";

export default ConnectSection;
