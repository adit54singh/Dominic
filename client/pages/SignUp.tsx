import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen,
  Chrome,
  User,
  Mail,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  Zap
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const navigate = useNavigate();

  // Simulate Google OAuth sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    // Simulate OAuth flow delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock Google user data
    const mockUser: GoogleUser = {
      id: "google_" + Math.random().toString(36).substr(2, 9),
      email: "user@gmail.com", // In real app, this would come from Google
      name: "New User", // In real app, this would come from Google
      picture: "https://via.placeholder.com/100" // In real app, this would come from Google
    };
    
    setUser(mockUser);
    setIsLoading(false);
    
    // Store user data in localStorage (in real app, this would be handled by auth context)
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Navigate to onboarding after successful sign-in
    setTimeout(() => {
      navigate('/onboarding');
    }, 1500);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Dominic!</h2>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src={user.picture} 
                alt={user.name}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHRleHQgeD0iNTAlIiB5PSI1NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnt1c2VyLm5hbWUuY2hhckF0KDApfTwvdGV4dD4KPHN2Zz4=';
                }}
              />
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Account created successfully! Let's set up your learning profile.
            </p>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <span>Redirecting to profile setup</span>
              <div className="animate-pulse">...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Dominic</span>
          </Link>
          <Link to="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join India's Largest
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Learning Community</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with mentors, collaborate on projects, and accelerate your career growth with peer-to-peer learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Sign Up Card */}
            <Card className="border-0 bg-background/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Started Today</CardTitle>
                <p className="text-muted-foreground">
                  Sign up with your Google account to begin your learning journey
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Chrome className="w-5 h-5" />
                      <span>Continue with Google</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Connect with Peers</h3>
                  <p className="text-muted-foreground">
                    Join study groups and collaborate with students from top colleges across India.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Mentorship</h3>
                  <p className="text-muted-foreground">
                    Get guidance from successful professionals and senior students in your field.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Accelerated Growth</h3>
                  <p className="text-muted-foreground">
                    Fast-track your learning with curated resources and real-world projects.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Safe & Secure</h3>
                  <p className="text-muted-foreground">
                    Your data is protected with industry-standard security measures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15k+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">800+</div>
              <div className="text-sm text-muted-foreground">Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Domains</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3.2k+</div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
