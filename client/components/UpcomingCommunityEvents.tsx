import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ExternalLink,
  Bell,
  BellOff,
  Share,
  Star,
  TrendingUp,
  Award,
  Code,
  Mic,
  Camera,
  Coffee,
  BookOpen,
  Target,
  Zap,
  Globe,
  Building,
} from "lucide-react";
import { useCommunityStore, type CommunityEvent } from "@/lib/community-store";

const EVENT_ICONS = {
  meeting: Users,
  workshop: BookOpen,
  hackathon: Code,
  networking: Coffee,
  webinar: Video,
  conference: Mic,
  competition: Award,
  default: Calendar,
};

const EVENT_COLORS = {
  meeting: "bg-blue-100 text-blue-700 border-blue-200",
  workshop: "bg-green-100 text-green-700 border-green-200",
  hackathon: "bg-purple-100 text-purple-700 border-purple-200",
  networking: "bg-orange-100 text-orange-700 border-orange-200",
  webinar: "bg-cyan-100 text-cyan-700 border-cyan-200",
  conference: "bg-red-100 text-red-700 border-red-200",
  competition: "bg-yellow-100 text-yellow-700 border-yellow-200",
  default: "bg-gray-100 text-gray-700 border-gray-200",
};

const DOMAIN_SPECIFIC_EVENTS = {
  "software-dev": [
    {
      id: "1",
      title: "React 19 Features Deep Dive",
      description: "Explore the latest React 19 features and best practices",
      date: "2024-02-20",
      time: "18:00",
      type: "workshop" as const,
      attendees: 156,
      maxAttendees: 200,
      isAttending: false,
      community: "React Developers Hub",
      location: "Virtual",
      speaker: "Dan Abramov",
      difficulty: "Intermediate",
      tags: ["react", "javascript", "frontend"],
    },
    {
      id: "2",
      title: "Full Stack JavaScript Hackathon",
      description:
        "Build amazing applications in 48 hours using modern JS stack",
      date: "2024-02-25",
      time: "09:00",
      type: "hackathon" as const,
      attendees: 89,
      maxAttendees: 150,
      isAttending: true,
      community: "JavaScript Enthusiasts",
      location: "Bangalore Tech Park",
      prize: "$10,000 + MacBook Pro",
      duration: "48 hours",
      tags: ["javascript", "hackathon", "fullstack"],
    },
  ],
  "data-science": [
    {
      id: "3",
      title: "AI Ethics in Practice",
      description:
        "Discussing ethical implications and responsible AI development",
      date: "2024-02-18",
      time: "19:30",
      type: "webinar" as const,
      attendees: 234,
      maxAttendees: 500,
      isAttending: false,
      community: "AI/ML Researchers",
      location: "Virtual",
      speaker: "Dr. Fei-Fei Li",
      difficulty: "All Levels",
      tags: ["ai", "ethics", "research"],
    },
    {
      id: "4",
      title: "Kaggle Competition Workshop",
      description: "Learn winning strategies for machine learning competitions",
      date: "2024-02-22",
      time: "16:00",
      type: "workshop" as const,
      attendees: 78,
      maxAttendees: 100,
      isAttending: true,
      community: "Data Science Hub",
      location: "IIT Bombay",
      speaker: "Kaggle Grandmaster Team",
      difficulty: "Advanced",
      tags: ["kaggle", "competition", "ml"],
    },
  ],
  design: [
    {
      id: "5",
      title: "Figma to Code Workshop",
      description: "Transform your designs into production-ready code",
      date: "2024-02-21",
      time: "15:00",
      type: "workshop" as const,
      attendees: 92,
      maxAttendees: 120,
      isAttending: false,
      community: "Design Systems Community",
      location: "Virtual",
      speaker: "Sarah Drasner",
      difficulty: "Intermediate",
      tags: ["figma", "design-systems", "frontend"],
    },
  ],
  "mobile-dev": [
    {
      id: "6",
      title: "Flutter 3.0 Mobile Development",
      description:
        "Building cross-platform apps with the latest Flutter features",
      date: "2024-02-24",
      time: "17:00",
      type: "workshop" as const,
      attendees: 145,
      maxAttendees: 180,
      isAttending: true,
      community: "Flutter Developers India",
      location: "Virtual",
      speaker: "Google Flutter Team",
      difficulty: "Intermediate",
      tags: ["flutter", "mobile", "dart"],
    },
  ],
};

interface UpcomingCommunityEventsProps {
  userDomains?: string[];
  maxEvents?: number;
  showFilters?: boolean;
}

export default function UpcomingCommunityEvents({
  userDomains = ["software-dev", "data-science"],
  maxEvents = 8,
  showFilters = true,
}: UpcomingCommunityEventsProps) {
  const { getAllUpcomingEvents, joinEvent, joinedCommunities } =
    useCommunityStore();
  const [filter, setFilter] = React.useState<
    "all" | "attending" | "not-attending"
  >("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");

  // Get events from store and combine with domain-specific events
  const storeEvents = getAllUpcomingEvents();

  // Get domain-specific events based on user's domains
  const domainEvents = userDomains.flatMap(
    (domain) =>
      DOMAIN_SPECIFIC_EVENTS[domain as keyof typeof DOMAIN_SPECIFIC_EVENTS] ||
      [],
  );

  // Combine and sort all events
  const allEvents = [...storeEvents, ...domainEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, maxEvents);

  // Filter events based on current filters
  const filteredEvents = allEvents.filter((event) => {
    if (filter === "attending" && !event.isAttending) return false;
    if (filter === "not-attending" && event.isAttending) return false;
    if (typeFilter !== "all" && event.type !== typeFilter) return false;
    return true;
  });

  const handleJoinEvent = (eventId: string, communityId?: string) => {
    if (communityId) {
      joinEvent(communityId, eventId);
    }
  };

  const getTimeUntilEvent = (date: string, time: string) => {
    const eventDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diffMs = eventDateTime.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`;
    return `${Math.ceil(diffDays / 30)} months`;
  };

  const getEventIcon = (type: string) => {
    const IconComponent =
      EVENT_ICONS[type as keyof typeof EVENT_ICONS] || EVENT_ICONS.default;
    return IconComponent;
  };

  const getEventColorClass = (type: string) => {
    return (
      EVENT_COLORS[type as keyof typeof EVENT_COLORS] || EVENT_COLORS.default
    );
  };

  if (filteredEvents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-500" />
            <span>Upcoming Community Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No upcoming events found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Join more communities to see their events
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-500" />
            <span>Upcoming Community Events</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {filteredEvents.length} events
            </Badge>
          </CardTitle>

          {showFilters && (
            <div className="flex items-center space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Events</option>
                <option value="attending">Attending</option>
                <option value="not-attending">Not Attending</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Types</option>
                <option value="workshop">Workshops</option>
                <option value="hackathon">Hackathons</option>
                <option value="meeting">Meetings</option>
                <option value="webinar">Webinars</option>
                <option value="networking">Networking</option>
              </select>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const IconComponent = getEventIcon(event.type);
            const colorClass = getEventColorClass(event.type);
            const timeUntil = getTimeUntilEvent(event.date, event.time);

            return (
              <div
                key={event.id}
                className="group p-4 bg-gradient-to-r from-background to-muted/30 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  {/* Event Icon */}
                  <div className={`p-3 rounded-lg ${colorClass} flex-shrink-0`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      {/* Time until event */}
                      <Badge variant="outline" className="flex-shrink-0 ml-2">
                        {timeUntil}
                      </Badge>
                    </div>

                    {/* Community and Speaker */}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-primary">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">
                          {(event as any).community}
                        </span>
                      </div>

                      {(event as any).speaker && (
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Mic className="w-4 h-4" />
                          <span>{(event as any).speaker}</span>
                        </div>
                      )}
                    </div>

                    {/* Event metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {(event as any).location?.includes("Virtual") ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        <span>{(event as any).location || "TBD"}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attending</span>
                        {event.maxAttendees && (
                          <span className="text-xs">
                            / {event.maxAttendees} max
                          </span>
                        )}
                      </div>

                      {(event as any).difficulty && (
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{(event as any).difficulty}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {(event as any).tags && (
                      <div className="flex flex-wrap gap-1">
                        {(event as any).tags.map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Prize/Duration for special events */}
                    {((event as any).prize || (event as any).duration) && (
                      <div className="flex items-center space-x-4 text-sm">
                        {(event as any).prize && (
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <Award className="w-4 h-4" />
                            <span className="font-medium">
                              {(event as any).prize}
                            </span>
                          </div>
                        )}

                        {(event as any).duration && (
                          <div className="flex items-center space-x-1 text-blue-600">
                            <Clock className="w-4 h-4" />
                            <span>{(event as any).duration}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={event.isAttending ? "secondary" : "default"}
                          onClick={() =>
                            handleJoinEvent(
                              event.id,
                              (event as any).communityId,
                            )
                          }
                          className="flex items-center space-x-1"
                        >
                          {event.isAttending ? (
                            <>
                              <BellOff className="w-4 h-4" />
                              <span>Attending</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-4 h-4" />
                              <span>Join Event</span>
                            </>
                          )}
                        </Button>

                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>

                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>

                      {(event as any).location?.includes("Virtual") && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Join Call</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more events button */}
        {allEvents.length > filteredEvents.length && (
          <div className="text-center mt-6">
            <Button variant="outline">
              View All {allEvents.length} Events
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
