import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavBarProps {
  onDomainsClick?: () => void;
}

export default function NavBar({ onDomainsClick }: NavBarProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="border-b bg-background/95 sticky top-0 z-50 will-change-transform">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Dominic</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {isHomePage && onDomainsClick ? (
            <button
              onClick={onDomainsClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Domains
            </button>
          ) : (
            <Link
              to="/domains"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Domains
            </Link>
          )}
          <Link
            to="/mentors"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Mentors
          </Link>
          <Link
            to="/community"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Community
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost">Sign In</Button>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
