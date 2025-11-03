import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRecommendation {
  id: string;
  name: string;
  description: string;
  similarity: number;
  reason: string;
  category: string;
}

interface Props {
  className?: string;
}

export default function RecommendedUsers({ className }: Props) {
  const [recommendations, setRecommendations] = useState<UserRecommendation[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/recommendations/users?limit=6");
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUser = async (userId: string) => {
    try {
      const response = await fetch("/api/user/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followingId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }

      setFollowedUsers((prev) => new Set([...prev, userId]));
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Users</CardTitle>
            <CardDescription>
              Connect with developers who share your interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Recommended Users</CardTitle>
              <CardDescription>
                Connect with developers who share your interests
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-sm text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">
                No users to recommend right now. Try updating your profile!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((user) => (
                <Card key={user.id} className="flex flex-col">
                  <CardContent className="flex-1 pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {user.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {user.description}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <div className="text-xs font-semibold text-primary">
                          {(user.similarity * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          match
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground italic">
                        {user.reason}
                      </p>
                    </div>
                  </CardContent>

                  <div className="px-4 pb-4">
                    <Button
                      size="sm"
                      className="w-full"
                      variant={
                        followedUsers.has(user.id) ? "outline" : "default"
                      }
                      disabled={followedUsers.has(user.id)}
                      onClick={() => handleFollowUser(user.id)}
                    >
                      {followedUsers.has(user.id) ? "Following" : "Follow"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
