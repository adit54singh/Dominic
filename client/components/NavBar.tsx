import { Button } from "@/components/ui/button";
import { BookOpen, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function NavBar() {
  const { user, isLoading, login, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
          <Link
            to="/domains"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Domains
          </Link>
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
          {isLoading ? (
            <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-white">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">
                  {user.name}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-muted transition-colors first:rounded-t-lg text-sm flex items-center space-x-2"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors last:rounded-b-lg text-sm flex items-center space-x-2 text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              {isUserMenuOpen && (
                <div
                  className="fixed inset-0 z-[5]"
                  onClick={() => setIsUserMenuOpen(false)}
                />
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={login}>
                Sign In with Google
              </Button>
              <Button onClick={login}>Get Started</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
