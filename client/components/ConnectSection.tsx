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
  Folder,
  Users,
  Calendar,
  GitBranch,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  seekingRoles: string[];
  membersCount: number;
  deadline?: string;
}

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
  detailedBio?: string;
  projects?: Project[];
  yearsExperience?: number;
  companies?: string[];
}

// Expanded profile card for followed members
const ExpandedUserCard = memo(
  ({
    user,
    onFollow,
    onMessage,
    onView,
    onJoinProject,
  }: {
    user: User;
    onFollow: (id: string) => void;
    onMessage: (id: string) => void;
    onView: (id: string) => void;
    onJoinProject: (projectId: string, userId: string) => void;
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
        <CardContent className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-white font-semibold text-lg">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-xl">{user.name}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{user.rating}</span>
                </div>
              </div>

              <p className="text-primary font-medium mb-1">{user.title}</p>

              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{user.location}</span>
                {user.yearsExperience && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{user.yearsExperience}+ years exp</span>
                  </>
                )}
              </div>

              {user.companies && (
                <div className="text-sm text-muted-foreground mb-3">
                  <span className="font-medium">Previous:</span> {user.companies.join(", ")}
                </div>
              )}
            </div>
          </div>

          {/* Detailed Bio */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">About</h4>
            <p className="text-sm text-muted-foreground">
              {user.detailedBio || user.bio}
            </p>
          </div>

          {/* Expertise */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Expertise</h4>
            <div className="flex flex-wrap gap-1">
              {user.expertise.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              <span>{user.studentsHelped} helped</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{user.responseTime}</span>
            </div>
          </div>

          {/* Open Projects */}
          {user.projects && user.projects.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center">
                <Folder className="w-4 h-4 mr-1" />
                Open Projects ({user.projects.length})
              </h4>
              <div className="space-y-3">
                {user.projects.map((project) => (
                  <div key={project.id} className="bg-muted/30 rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <h5 className="font-medium text-sm">{project.title}</h5>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{project.membersCount}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs px-1 py-0">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Seeking:</span> {project.seekingRoles.join(", ")}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs"
                        onClick={() => onJoinProject(project.id, user.id)}
                      >
                        <GitBranch className="w-3 h-3 mr-1" />
                        Join
                      </Button>
                    </div>
                    {project.deadline && (
                      <div className="flex items-center text-xs text-orange-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Deadline: {project.deadline}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2 border-t">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleFollow}
              className="flex-1 transition-colors"
            >
              <UserPlus className="w-3 h-3 mr-1" />
              Following
            </Button>
            <Button variant="outline" size="sm" onClick={handleMessage}>
              <MessageCircle className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleView}>
              <Eye className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
);

ExpandedUserCard.displayName = "ExpandedUserCard";

// Compact user card component for suggestions
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

interface ConnectSectionProps {
  onActivity?: (activity: any) => void;
  followedUsers?: Set<string>;
  onFollowUser?: (userId: string, isFollowing: boolean) => void;
}

const ConnectSection = memo(({ onActivity, followedUsers = new Set(), onFollowUser }: ConnectSectionProps) => {

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
        detailedBio: "With 8+ years at Amazon and Microsoft, I've helped over 200 students land jobs at top tech companies. I specialize in system design, data structures, and behavioral interviews. My approach focuses on building confidence while mastering technical skills.",
        yearsExperience: 8,
        companies: ["Amazon", "Microsoft"],
        isOnline: true,
        projects: [
          {
            id: "p1",
            title: "E-commerce Microservices",
            description: "Building a scalable e-commerce platform using microservices architecture with React, Node.js, and AWS.",
            technologies: ["React", "Node.js", "AWS", "Docker", "MongoDB"],
            seekingRoles: ["Frontend Dev", "Backend Dev"],
            membersCount: 4,
            deadline: "March 15, 2024"
          },
          {
            id: "p2",
            title: "Real-time Chat App",
            description: "A real-time messaging application with video calls, file sharing, and group chat features.",
            technologies: ["React", "Socket.io", "WebRTC"],
            seekingRoles: ["Frontend Dev", "UI/UX"],
            membersCount: 2
          }
        ]
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
        detailedBio: "Senior Data Scientist at Google with expertise in machine learning, deep learning, and big data analytics. I love mentoring students transitioning into data science careers and have helped many land roles at FAANG companies.",
        yearsExperience: 6,
        companies: ["Google", "Flipkart"],
        isOnline: false,
        projects: [
          {
            id: "p3",
            title: "Recommendation Engine",
            description: "Building a machine learning recommendation system for e-commerce using collaborative filtering and deep learning.",
            technologies: ["Python", "TensorFlow", "Pandas", "AWS"],
            seekingRoles: ["ML Engineer", "Data Analyst"],
            membersCount: 3
          }
        ]
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
        detailedBio: "Lead Product Designer at Zomato with 5+ years of experience in creating user-centered designs. I specialize in design systems, user research, and mentoring aspiring designers to break into top product companies.",
        yearsExperience: 5,
        companies: ["Zomato", "Swiggy"],
        isOnline: true,
        projects: [
          {
            id: "p4",
            title: "Design System Library",
            description: "Creating a comprehensive design system library with reusable components for web and mobile applications.",
            technologies: ["Figma", "React", "Storybook", "Tokens"],
            seekingRoles: ["UI Designer", "Frontend Dev"],
            membersCount: 5,
            deadline: "April 1, 2024"
          }
        ]
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

  // Separate followed and unfollowed users
  const followedMentors = useMemo(() =>
    users.filter(user => followedUsers.has(user.id)),
    [users, followedUsers]
  );

  const suggestedMentors = useMemo(() =>
    users.filter(user => !followedUsers.has(user.id)),
    [users, followedUsers]
  );

  const handleFollow = useCallback((userId: string) => {
    const user = users.find(u => u.id === userId);
    const isCurrentlyFollowed = followedUsers.has(userId);

    // Update parent state
    if (onFollowUser) {
      onFollowUser(userId, !isCurrentlyFollowed);
    }

    // Call onActivity after state update, not during
    if (user && onActivity) {
      if (isCurrentlyFollowed) {
        // Add unfollow activity
        onActivity({
          type: "unfollow",
          action: `Unfollowed ${user.name}`,
          details: `No longer following ${user.title}`,
        });
      } else {
        // Add follow activity
        onActivity({
          type: "follow",
          action: `Started following ${user.name}`,
          details: `Now following ${user.title} from ${user.location}`,
        });
      }
    }
  }, [users, onActivity, followedUsers, onFollowUser]);

  const handleMessage = useCallback((userId: string) => {
    console.log("Message user:", userId);
  }, []);

  const handleView = useCallback((userId: string) => {
    console.log("View profile:", userId);
  }, []);

  const handleJoinProject = useCallback((projectId: string, userId: string) => {
    console.log("Join project:", projectId, "by user:", userId);
    const user = users.find(u => u.id === userId);
    const project = user?.projects?.find(p => p.id === projectId);

    if (project && user && onActivity) {
      onActivity({
        type: "project_joined",
        action: `Joined project: ${project.title}`,
        details: `Started collaborating with ${user.name} on ${project.title}`,
      });
    }
  }, [users, onActivity]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Connect with Members</h3>
        <p className="text-muted-foreground">
          Learn from experienced professionals and collaborate on exciting projects
        </p>
      </div>

      {/* Connected Members Section */}
      {followedMentors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-primary">
              Your Connected Members
            </h4>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {followedMentors.length} connected
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Members you're following with their detailed profiles and open projects
          </p>
          <div className="max-w-4xl mx-auto space-y-8">
            {followedMentors.map((user) => (
              <ExpandedUserCard
                key={user.id}
                user={user}
                onFollow={handleFollow}
                onMessage={handleMessage}
                onView={handleView}
                onJoinProject={handleJoinProject}
              />
            ))}
          </div>
        </div>
      )}

      {/* Suggested Connections Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">
            People You May Want to Connect With
          </h4>
          <Badge variant="outline">
            {suggestedMentors.length} available
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Discover experienced members who can help guide your career journey
        </p>

        {suggestedMentors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedMentors.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onFollow={handleFollow}
                onMessage={handleMessage}
                onView={handleView}
                isFollowed={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">
              You're connected with all available mentors!
            </div>
            <p className="text-sm text-muted-foreground">
              Check back later for new mentor suggestions
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

ConnectSection.displayName = "ConnectSection";

export default ConnectSection;
