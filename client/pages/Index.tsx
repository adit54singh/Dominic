import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Lightbulb,
  Target,
  Code,
  Camera,
  Utensils,
  Plane,
  Music,
  Palette,
  ArrowRight,
  Star,
  MessageCircle,
  Shield,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import ConnectSection from "@/components/ConnectSection";
import AnimatedDomains from "@/components/AnimatedDomains";
import { useState } from "react";

export default function Index() {
  const [showDomainsAnimation, setShowDomainsAnimation] = useState(false);

  const domains = [
    {
      name: "Software Development",
      icon: Code,
      color: "bg-blue-500",
      students: "2.5k+",
    },
    {
      name: "Content Creation",
      icon: Camera,
      color: "bg-pink-500",
      students: "1.8k+",
    },
    {
      name: "Cooking & Food",
      icon: Utensils,
      color: "bg-orange-500",
      students: "3.2k+",
    },
    {
      name: "Travel & Adventure",
      icon: Plane,
      color: "bg-green-500",
      students: "1.9k+",
    },
    {
      name: "Music & Arts",
      icon: Music,
      color: "bg-purple-500",
      students: "1.4k+",
    },
    {
      name: "Design & Creative",
      icon: Palette,
      color: "bg-red-500",
      students: "2.1k+",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Peer-to-Peer Learning",
      description:
        "Connect with fellow students and recent graduates who've walked the same path.",
    },
    {
      icon: Target,
      title: "Domain-Specific Guidance",
      description:
        "Get targeted advice from mentors specialized in your field of interest.",
    },
    {
      icon: MessageCircle,
      title: "Smart Query Matching",
      description:
        "Our AI groups students with similar questions for collaborative learning sessions.",
    },
    {
      icon: Shield,
      title: "Quality Content",
      description:
        "Advanced filtering ensures you get unique, valuable insights every time.",
    },
  ];

  const stats = [
    { label: "Active Students", value: "15k+" },
    { label: "Expert Mentors", value: "800+" },
    { label: "Learning Domains", value: "25+" },
    { label: "Success Stories", value: "3.2k+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Dominic</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/domains"
              className="text-muted-foreground hover:text-foreground"
            >
              Domains
            </Link>
            <Link
              to="/mentors"
              className="text-muted-foreground hover:text-foreground"
            >
              Mentors
            </Link>
            <Link
              to="/community"
              className="text-muted-foreground hover:text-foreground"
            >
              Community
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground"
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-in slide-up duration-700">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🇮🇳 Built for Indian College Students
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            Learn from Peers,
            <br />
            Grow Together
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join India's largest peer-led learning community. Get mentored by
            successful students, share knowledge, and accelerate your journey in
            tech and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Become a Mentor
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Dominic?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience learning like never before with our innovative
            peer-to-peer approach
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-up duration-500 delay-200">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-0 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Domains Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Learning Domains</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From coding to cooking, find mentors and peers in every field that
            matters to you
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-up duration-500 delay-300">
          {domains.map((domain, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-0 bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${domain.color} rounded-lg flex items-center justify-center`}
                  >
                    <domain.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {domain.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{domain.students} students</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Domains
          </Button>
        </div>
      </section>

      {/* Community Profiles */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with talented students and professionals who are shaping the
            future of tech
          </p>
        </div>
        <div className="animate-in scale-in duration-500 delay-400">
          <ConnectSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-in slide-up duration-500 delay-500">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who are already learning, growing, and
            succeeding together.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg px-12 py-6">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Dominic</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering Indian students through peer-led learning and
                mentorship.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Domains</div>
                <div>Mentors</div>
                <div>Community</div>
                <div>Success Stories</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Guidelines</div>
                <div>Safety</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Careers</div>
                <div>Privacy</div>
                <div>Terms</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Dominic. Made with ❤️ for Indian students.
          </div>
        </div>
      </footer>
    </div>
  );
}
