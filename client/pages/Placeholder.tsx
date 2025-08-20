import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";

interface PlaceholderProps {
  title: string;
  description: string;
  features?: string[];
}

export default function Placeholder({ title, description, features = [] }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Dominic</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/domains" className="text-muted-foreground hover:text-foreground">Domains</Link>
            <Link to="/mentors" className="text-muted-foreground hover:text-foreground">Mentors</Link>
            <Link to="/community" className="text-muted-foreground hover:text-foreground">Community</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{description}</p>
          
          {features.length > 0 && (
            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Coming Soon Features:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <Button>
              Get Notified When Ready
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            Want this page developed? Continue chatting with me to add more features to the platform!
          </p>
        </div>
      </div>
    </div>
  );
}
