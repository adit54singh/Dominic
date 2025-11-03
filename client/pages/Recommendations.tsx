import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react";
import RecommendedCommunities from "@/components/RecommendedCommunities";
import RecommendedUsers from "@/components/RecommendedUsers";

export default function Recommendations() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch("/api/auth/user");
      if (response.ok) {
        setAuthenticated(true);
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold">Recommendations</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Discover Your Next Connection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your profile and interests, we've selected communities and developers
              that align with your goals and technical expertise. Join communities to collaborate
              and follow users to stay updated with their work.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RecommendedCommunities />
            <RecommendedUsers />
          </div>

          {/* Info Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">How Recommendations Work</h3>
                <p className="text-sm text-muted-foreground">
                  Our ML-based recommendation system analyzes your:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li><strong>Skills & Technologies:</strong> Languages, frameworks, and tools you know</li>
                  <li><strong>Technology Domains:</strong> Areas like web dev, AI, DevOps, etc.</li>
                  <li><strong>Experience Level:</strong> Beginner, intermediate, or advanced</li>
                  <li><strong>Goals:</strong> What you want to achieve on the platform</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  This helps us suggest communities and users with matching interests and expertise levels.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
