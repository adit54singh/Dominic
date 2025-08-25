import { motion } from "framer-motion";
import {
  Users,
  Target,
  Rocket,
  Heart,
  BookOpen,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Shield,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Star,
  Brain,
  Network,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";

export default function About() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Matching",
      description:
        "Our intelligent algorithm matches you with the perfect mentors and learning communities based on your goals, skills, and interests.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Peer-to-Peer Learning",
      description:
        "Connect with fellow students across India to share knowledge, collaborate on projects, and grow together in a supportive environment.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Mentorship",
      description:
        "Learn from industry professionals and experienced students who provide personalized guidance and real-world insights.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Project-Based Learning",
      description:
        "Build real projects with guidance from mentors and peers. Create a portfolio that showcases your skills to potential employers.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Diverse Domains",
      description:
        "Explore tech and creative fields with specialized communities for everything from software development to digital art.",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Connections",
      description:
        "Get matched with relevant mentors and peers instantly. Start learning and collaborating without delays.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const stats = [
    {
      number: "50,000+",
      label: "Active Students",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "2,500+",
      label: "Expert Mentors",
      icon: <Award className="w-5 h-5" />,
    },
    {
      number: "25+",
      label: "Learning Domains",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      number: "10,000+",
      label: "Projects Completed",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const values = [
    {
      title: "Accessibility",
      description:
        "Quality education should be accessible to every student in India, regardless of their background or location.",
      icon: <Heart className="w-6 h-6 text-red-500" />,
    },
    {
      title: "Community First",
      description:
        "We believe in the power of peer learning and building strong communities that support each other's growth.",
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Innovation",
      description:
        "We continuously innovate our platform to provide the best learning experience using cutting-edge technology.",
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from mentor quality to platform features and user experience.",
      icon: <Star className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Dominic
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Empowering India's Next Generation of Learners
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Building India's largest peer-led learning ecosystem where college
              students connect, learn from expert mentors, and collaborate on
              real-world projects across diverse domains.
            </p>

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center space-x-4 mb-12"
            >
              <Button size="lg" className="px-8 py-4 text-lg">
                Join Our Community
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Become a Mentor
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Vision
            </h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We envision a future where every Indian student has access to
              personalized mentorship, collaborative learning opportunities, and
              the resources needed to excel in their chosen field. By leveraging
              the power of peer-to-peer learning and expert guidance, we're
              creating an ecosystem that bridges the gap between academic
              learning and real-world application.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-gradient-to-br from-primary/10 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Target className="w-8 h-8 text-primary" />
                    <span className="text-2xl">Our Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To democratize quality education in India by creating the
                    largest peer-led learning community where students can find
                    mentors, collaborate on projects, and build skills that
                    matter in today's rapidly evolving job market.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 bg-gradient-to-br from-accent/10 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Rocket className="w-8 h-8 text-accent" />
                    <span className="text-2xl">Our Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Transforming how students learn by providing direct access
                    to industry experts, fostering collaborative projects, and
                    creating opportunities for practical skill development that
                    prepares them for successful careers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Platform Features
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our innovative features are revolutionizing the
              learning experience for students across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="h-full border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Values
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The core principles that guide everything we do at Dominic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 bg-card/30 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{value.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-3">
                          {value.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ready to Transform Your Learning Journey?
                </h3>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Join thousands of students who are already accelerating their
                  careers through peer learning and expert mentorship on
                  Dominic.
                </p>

                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="px-8 py-4 text-lg">
                    Start Learning Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg"
                  >
                    Explore Communities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
