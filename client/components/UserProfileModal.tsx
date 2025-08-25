import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Star,
  Clock,
  Users,
  MessageCircle,
  UserPlus,
  Eye,
  Calendar,
  GitBranch,
  Briefcase,
  Heart,
  Trophy,
} from "lucide-react";

interface Community {
  name: string;
  role: string;
  members: string;
}

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
  communities?: Community[];
}

interface UserProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  isFollowing?: boolean;
}

export default function UserProfileModal({
  user,
  isOpen,
  onClose,
  onFollow,
  onMessage,
  isFollowing = false,
}: UserProfileModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {user.name}'s Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <Avatar className="w-24 h-24 md:w-32 md:h-32">
                  <AvatarFallback className="bg-primary text-white font-semibold text-2xl">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background"></div>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => onFollow?.(user.id)}
                  variant={isFollowing ? "secondary" : "default"}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button
                  onClick={() => onMessage?.(user.id)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{user.name}</h2>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-medium">{user.rating}</span>
                  </div>
                </div>
                <p className="text-xl text-primary font-medium mb-2">{user.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  {user.yearsExperience && (
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{user.yearsExperience}+ years experience</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Responds in {user.responseTime}</span>
                  </div>
                </div>
                
                {user.companies && (
                  <div className="mb-4">
                    <span className="font-medium">Previous companies:</span>{" "}
                    <span className="text-muted-foreground">{user.companies.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{user.studentsHelped}</div>
                  <div className="text-sm text-muted-foreground">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{user.projects?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">{user.communities?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Communities</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">About</h3>
              <p className="text-muted-foreground leading-relaxed">
                {user.detailedBio || user.bio}
              </p>
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {user.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communities */}
          {user.communities && user.communities.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Connected Communities
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {user.communities.map((community, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{community.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {community.members}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{community.role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Projects */}
          {user.projects && user.projects.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Active Projects ({user.projects.length})
                </h3>
                <div className="space-y-4">
                  {user.projects.map((project) => (
                    <div key={project.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{project.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{project.membersCount}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Seeking:</span> {project.seekingRoles.join(", ")}
                        </div>
                        {project.deadline && (
                          <div className="flex items-center text-sm text-orange-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{project.deadline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
