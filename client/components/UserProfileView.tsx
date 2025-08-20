import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Star,
  MessageCircle,
  UserPlus,
  UserCheck,
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Award,
  Briefcase,
  BookOpen,
  Target,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  achievements: string[];
  communities:
    | Array<{ name: string; role: string; members: string }>
    | string[];
  projects: number;
  connections: number;
  skills: string[];
  experience: string;
}

interface UserProfileViewProps {
  profile: UserProfile | null;
  onClose: () => void;
}

export default function UserProfileView({
  profile,
  onClose,
}: UserProfileViewProps) {
  const [isConnected, setIsConnected] = useState(false);

  if (!profile) return null;

  const handleConnect = () => {
    setIsConnected(!isConnected);
    // In a real app, this would make an API call to connect/disconnect
  };

  const additionalInfo = {
    joinedDate: "January 2023",
    completedProjects: [
      "E-commerce Platform with React & Node.js",
      "Mobile Banking App - Flutter",
      "AI-powered Recommendation System",
      "Real-time Chat Application",
    ],
    endorsements: [
      { skill: "React.js", count: 23 },
      { skill: "Node.js", count: 18 },
      { skill: "JavaScript", count: 31 },
      { skill: "System Design", count: 12 },
    ],
    testimonials: [
      {
        author: "Sarah Chen",
        role: "Product Manager at Microsoft",
        text: "Exceptional developer with great communication skills. Delivered our project ahead of schedule!",
      },
      {
        author: "Amit Kumar",
        role: "Tech Lead at Flipkart",
        text: "Brilliant problem solver and team player. Would definitely collaborate again.",
      },
    ],
    socialLinks: {
      linkedin: "linkedin.com/in/profile",
      github: "github.com/profile",
      portfolio: "portfolio.com",
    },
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Profile Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-primary text-white text-3xl">
                  {profile.avatar}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-3xl font-bold">{profile.name}</h3>
                <p className="text-xl text-muted-foreground">{profile.title}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {additionalInfo.joinedDate}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-lg">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{profile.projects}</span>
                  <span className="text-sm text-muted-foreground">
                    Projects
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{profile.connections}</span>
                  <span className="text-sm text-muted-foreground">
                    Connections
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1 rounded-lg">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{profile.experience}</span>
                  <span className="text-sm text-muted-foreground">
                    Experience
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleConnect}
                  className={`flex items-center space-x-2 ${isConnected ? "bg-green-600 hover:bg-green-700" : ""}`}
                  variant={isConnected ? "default" : "default"}
                >
                  {isConnected ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Connect</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>About</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills & Endorsements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Skills & Endorsements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {additionalInfo.endorsements.map((endorsement, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <Badge variant="secondary" className="text-sm">
                      {endorsement.skill}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {endorsement.count} endorsements
                    </span>
                  </div>
                ))}
                {profile.skills.slice(4).map((skill, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                  >
                    <span className="text-sm text-yellow-700 dark:text-yellow-400">
                      {achievement}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Recent Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {additionalInfo.completedProjects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{project}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Collaborative project •{" "}
                        {Math.floor(Math.random() * 6) + 2} months ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Communities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Communities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.communities.map((community, index) => {
                  // Handle both old string format and new object format
                  if (typeof community === "string") {
                    return (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground mr-2 mb-2"
                      >
                        {community}
                      </Badge>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {community.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {community.role}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {community.members} members
                        </Badge>
                      </div>
                    );
                  }
                })}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Testimonials</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {additionalInfo.testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm italic mb-3">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Connect Elsewhere</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Portfolio</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
