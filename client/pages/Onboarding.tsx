import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  User,
  Target,
  Code,
  Camera,
  Utensils,
  Plane,
  Music,
  Palette,
  Briefcase,
  GraduationCap,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Trophy,
  Loader2,
  ExternalLink,
  Heart,
  MessageCircle,
  Youtube,
  Instagram,
  Twitter,
  Search,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";

interface ProjectData {
  name: string;
  description: string;
  techStack: string;
  link: string;
}

interface OnboardingData {
  domains: string[];
  skills: string[];
  experience: string;
  projects: ProjectData[];
  leetcodeRank: string;
  leetcodeId: string;
  gfgRank: string;
  gfgId: string;
  githubId: string;
  preferredPlatform: string;
  hackathonId: string;
  socialMediaLink: string;
  isBeginner: boolean;
  titleAwarded: string;
  goals: string[];
  customGoal: string;
  heardFrom: string;
  customHeardFrom: string;
  hasProjects: boolean;
  userProjects: Array<{
    name: string;
    title: string;
    skillsUsed: string[];
  }>;
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    domains: [],
    skills: [],
    experience: "",
    projects: [{ name: "", description: "", techStack: "", link: "" }],
    leetcodeRank: "",
    leetcodeId: "",
    gfgRank: "",
    gfgId: "",
    githubId: "",
    preferredPlatform: "",
    hasProjects: false,
    userProjects: [],
    hackathonId: "",
    socialMediaLink: "",
    isBeginner: false,
    titleAwarded: "",
    goals: [],
    customGoal: "",
    heardFrom: "",
    customHeardFrom: "",
  });

  const totalSteps = 4;

  const techDomains = [
    {
      id: "software-dev",
      name: "Software Development",
      icon: Code,
      color: "bg-blue-500",
    },
    {
      id: "web-dev",
      name: "Web Development",
      icon: Code,
      color: "bg-cyan-500",
    },
    {
      id: "mobile-dev",
      name: "Mobile Development",
      icon: Code,
      color: "bg-green-500",
    },
    {
      id: "data-science",
      name: "Data Science & AI",
      icon: Code,
      color: "bg-purple-500",
    },
    { id: "design", name: "UI/UX Design", icon: Palette, color: "bg-red-500" },
    {
      id: "cloud-computing",
      name: "Cloud Computing",
      icon: Code,
      color: "bg-sky-500",
    },
    {
      id: "blockchain",
      name: "Blockchain & Web3",
      icon: Code,
      color: "bg-amber-500",
    },
    {
      id: "devops",
      name: "DevOps & Infrastructure",
      icon: Code,
      color: "bg-orange-500",
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: Code,
      color: "bg-red-600",
    },
    {
      id: "game-dev",
      name: "Game Development",
      icon: Code,
      color: "bg-pink-500",
    },
    {
      id: "iot",
      name: "IoT & Embedded Systems",
      icon: Code,
      color: "bg-emerald-600",
    },
    {
      id: "robotics",
      name: "Robotics & Automation",
      icon: Code,
      color: "bg-indigo-600",
    },
    {
      id: "ar-vr",
      name: "AR/VR Development",
      icon: Code,
      color: "bg-violet-600",
    },
    {
      id: "quantum-computing",
      name: "Quantum Computing",
      icon: Code,
      color: "bg-rose-600",
    },
  ];

  const allDomains = [...techDomains];

  const techSkillsOptions = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React",
    "Node.js",
    "Django",
    "Flask",
    "Machine Learning",
    "Data Analysis",
    "UI/UX Design",
    "Mobile Development",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Flutter",
    "Swift",
    "Kotlin",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
  ];

  const nonTechSkillsOptions = [
    "Video Editing",
    "Photography",
    "Content Writing",
    "Digital Marketing",
    "Project Management",
    "Public Speaking",
    "Creative Writing",
    "Graphic Design",
    "Social Media Management",
    "Event Planning",
    "Leadership",
    "Communication",
    "Research",
    "Presentation Skills",
    "Time Management",
    "Critical Thinking",
  ];

  const goalsOptions = [
    "Get placed in FAANG companies",
    "Build my own startup",
    "Improve coding skills",
    "Learn new technologies",
    "Build impressive projects",
    "Increase LeetCode rating",
    "Find study partners",
    "Get mentorship",
    "Build professional network",
    "Contribute to open source",
  ];

  const heardFromOptions = [
    "Friend/Colleague",
    "Social Media (Instagram/Twitter)",
    "YouTube",
    "College/University",
    "Online communities (Reddit/Discord)",
    "Google Search",
    "Tech blogs/websites",
  ];

  const handleDomainToggle = (domainId: string) => {
    setData((prev) => ({
      ...prev,
      domains: prev.domains.includes(domainId)
        ? prev.domains.filter((d) => d !== domainId)
        : [...prev.domains, domainId],
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", description: "", techStack: "", link: "" },
      ],
    }));
  };

  const updateProject = (
    index: number,
    field: keyof ProjectData,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project,
      ),
    }));
  };

  const removeProject = (index: number) => {
    if (data.projects.length > 1) {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index),
      }));
    }
  };

  const addUserProject = () => {
    setData((prev) => ({
      ...prev,
      userProjects: [
        ...prev.userProjects,
        { name: "", title: "", skillsUsed: [] },
      ],
    }));
  };

  const updateUserProject = (index: number, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      userProjects: prev.userProjects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project,
      ),
    }));
  };

  const removeUserProject = (index: number) => {
    if (data.userProjects.length > 1) {
      setData((prev) => ({
        ...prev,
        userProjects: prev.userProjects.filter((_, i) => i !== index),
      }));
    }
  };

  const nextStep = () => {
    if (currentStep <= totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    const isTechDomain = data.domains.some((domain) =>
      techDomains.find((td) => td.id === domain),
    );

    switch (currentStep) {
      case 1:
        return data.domains.length > 0;
      case 2:
        const hasValidProjects =
          !data.hasProjects ||
          (data.userProjects.length > 0 &&
            data.userProjects.every(
              (p) => p.name.trim() && p.title.trim() && p.skillsUsed.length > 0,
            ));
        return (
          data.skills.length > 0 &&
          data.experience !== "" &&
          (data.preferredPlatform === "leetcode"
            ? data.leetcodeId.trim() !== ""
            : data.preferredPlatform === "gfg"
              ? data.gfgId.trim() !== ""
              : false) &&
          data.githubId.trim() !== "" &&
          hasValidProjects
        );
      case 3:
        return data.goals.length > 0 || data.customGoal.trim() !== "";
      case 4:
        return data.heardFrom !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Choose Your Tech Domains</h2>
              <p className="text-muted-foreground">
                Select all technology areas you're interested in learning or
                growing in.
              </p>
            </div>

            {/* Tech Domains Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span>Technology Domains</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {techDomains.map((domain) => (
                    <Card
                      key={domain.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        data.domains.includes(domain.id)
                          ? "ring-2 ring-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => handleDomainToggle(domain.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 ${domain.color} rounded-lg flex items-center justify-center`}
                          >
                            <domain.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">
                              {domain.name}
                            </h3>
                          </div>
                          {data.domains.includes(domain.id) && (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Selected: {data.domains.length} domain
              {data.domains.length !== 1 ? "s" : ""}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">
                Tell Us About Your Tech Skills
              </h2>
              <p className="text-muted-foreground">
                Help us understand your technical expertise level.
              </p>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Skills & Technologies
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techSkillsOptions.map((skill) => (
                  <Label
                    key={skill}
                    className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg border text-sm transition-colors ${
                      data.skills.includes(skill)
                        ? "bg-primary/5 border-primary text-primary"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    <Checkbox
                      checked={data.skills.includes(skill)}
                      onChange={() => {}}
                    />
                    <span>{skill}</span>
                  </Label>
                ))}
              </div>
            </div>

            {/* User Projects Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={data.hasProjects}
                  onCheckedChange={(checked) =>
                    setData((prev) => ({
                      ...prev,
                      hasProjects: checked as boolean,
                      userProjects: checked ? prev.userProjects : [],
                    }))
                  }
                />
                <Label className="text-lg font-semibold">
                  I have personal projects to showcase
                </Label>
              </div>

              {data.hasProjects && (
                <div className="ml-6 space-y-4 p-4 border rounded-lg bg-muted/30">
                  {data.userProjects.map((project, index) => (
                    <div
                      key={index}
                      className="space-y-3 p-4 border rounded-lg bg-background"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Project {index + 1}</h4>
                        {data.userProjects.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeUserProject(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm">Project Name</Label>
                        <Input
                          placeholder="e.g., Personal Portfolio Website"
                          value={project.name}
                          onChange={(e) =>
                            updateUserProject(index, "name", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label className="text-sm">
                          Project Title/Description
                        </Label>
                        <Input
                          placeholder="e.g., A responsive portfolio showcasing my work"
                          value={project.title}
                          onChange={(e) =>
                            updateUserProject(index, "title", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label className="text-sm">
                          Skills Used (comma-separated)
                        </Label>
                        <Input
                          placeholder="e.g., React, TypeScript, Tailwind CSS"
                          value={project.skillsUsed.join(", ")}
                          onChange={(e) =>
                            updateUserProject(
                              index,
                              "skillsUsed",
                              e.target.value
                                .split(", ")
                                .filter((s) => s.trim()),
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addUserProject}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Project
                  </Button>
                </div>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Experience Level</Label>
              <RadioGroup
                value={data.experience}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, experience: value }))
                }
              >
                <div className="space-y-3">
                  <Label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border hover:bg-muted/50">
                    <RadioGroupItem value="beginner" />
                    <div>
                      <div className="font-semibold">Beginner (0-1 years)</div>
                      <div className="text-sm text-muted-foreground">
                        Just starting out
                      </div>
                    </div>
                  </Label>
                  <Label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border hover:bg-muted/50">
                    <RadioGroupItem value="intermediate" />
                    <div>
                      <div className="font-semibold">
                        Intermediate (1-3 years)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Have some experience
                      </div>
                    </div>
                  </Label>
                  <Label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border hover:bg-muted/50">
                    <RadioGroupItem value="advanced" />
                    <div>
                      <div className="font-semibold">Advanced (3+ years)</div>
                      <div className="text-sm text-muted-foreground">
                        Experienced and looking to mentor
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Coding Platform Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Coding Platform (Choose One)</span>
              </Label>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={data.preferredPlatform === "leetcode"}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setData((prev) => ({
                          ...prev,
                          preferredPlatform: "leetcode",
                          gfgId: "",
                          gfgRank: "",
                        }));
                      }
                    }}
                  />
                  <Label className="text-sm font-medium">LeetCode</Label>
                </div>

                {data.preferredPlatform === "leetcode" && (
                  <div className="ml-6 space-y-3 p-4 border rounded-lg bg-muted/30">
                    <div>
                      <Label className="text-sm">LeetCode Username/ID</Label>
                      <Input
                        placeholder="e.g., your_username"
                        value={data.leetcodeId}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            leetcodeId: e.target.value,
                          }))
                        }
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Your LeetCode profile username or ID
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm">
                        LeetCode Rank (Optional)
                      </Label>
                      <Input
                        placeholder="e.g., #12,345 or Guardian, Knight, etc."
                        value={data.leetcodeRank}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            leetcodeRank: e.target.value,
                          }))
                        }
                      />
                    </div>
                    {data.leetcodeId && (
                      <div className="mt-2">
                        <a
                          href={`https://leetcode.com/${data.leetcodeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center space-x-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View LeetCode Profile</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={data.preferredPlatform === "gfg"}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setData((prev) => ({
                          ...prev,
                          preferredPlatform: "gfg",
                          leetcodeId: "",
                          leetcodeRank: "",
                        }));
                      }
                    }}
                  />
                  <Label className="text-sm font-medium">GeeksforGeeks</Label>
                </div>

                {data.preferredPlatform === "gfg" && (
                  <div className="ml-6 space-y-3 p-4 border rounded-lg bg-muted/30">
                    <div>
                      <Label className="text-sm">GFG Username/ID</Label>
                      <Input
                        placeholder="e.g., your_username"
                        value={data.gfgId}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            gfgId: e.target.value,
                          }))
                        }
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Your GeeksforGeeks profile username or ID
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm">
                        GFG Rank/Score (Optional)
                      </Label>
                      <Input
                        placeholder="e.g., #5,678 or your score"
                        value={data.gfgRank}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            gfgRank: e.target.value,
                          }))
                        }
                      />
                    </div>
                    {data.gfgId && (
                      <div className="mt-2">
                        <a
                          href={`https://auth.geeksforgeeks.org/user/${data.gfgId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center space-x-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View GFG Profile</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* GitHub ID */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub Profile</span>
              </Label>
              <div>
                <Label className="text-sm">GitHub Username</Label>
                <Input
                  placeholder="e.g., your-github-username"
                  value={data.githubId}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, githubId: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your GitHub username (without @)
                </p>
                {data.githubId && (
                  <div className="mt-2">
                    <a
                      href={`https://github.com/${data.githubId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View GitHub Profile</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Hackathon/Unstop ID */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                Hackathon/Unstop ID (Optional)
              </Label>
              <Input
                placeholder="your-unstop-or-hackathon-id"
                value={data.hackathonId}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, hackathonId: e.target.value }))
                }
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">What Are Your Goals?</h2>
              <p className="text-muted-foreground">
                Tell us what you want to achieve through our platform.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goalsOptions.map((goal) => (
                  <Label
                    key={goal}
                    className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg border text-sm transition-colors ${
                      data.goals.includes(goal)
                        ? "bg-primary/5 border-primary text-primary"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    <Checkbox
                      checked={data.goals.includes(goal)}
                      onChange={() => {}}
                    />
                    <span>{goal}</span>
                  </Label>
                ))}
              </div>

              <div>
                <Label className="text-sm">Other Goals (Optional)</Label>
                <Textarea
                  placeholder="Tell us about any other specific goals you have..."
                  value={data.customGoal}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, customGoal: e.target.value }))
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">How Did You Hear About Us?</h2>
              <p className="text-muted-foreground">
                Help us understand how you discovered our platform.
              </p>
            </div>

            <RadioGroup
              value={data.heardFrom}
              onValueChange={(value) =>
                setData((prev) => ({ ...prev, heardFrom: value }))
              }
            >
              <div className="space-y-3">
                {heardFromOptions.map((option) => (
                  <Label
                    key={option}
                    className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border hover:bg-muted/50"
                  >
                    <RadioGroupItem value={option} />
                    <div className="flex items-center space-x-3">
                      {option.includes("Instagram") && (
                        <Instagram className="w-4 h-4 text-pink-500" />
                      )}
                      {option.includes("YouTube") && (
                        <Youtube className="w-4 h-4 text-red-500" />
                      )}
                      {option.includes("Twitter") && (
                        <Twitter className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="font-medium">{option}</span>
                    </div>
                  </Label>
                ))}
                <Label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border hover:bg-muted/50">
                  <RadioGroupItem value="other" />
                  <span className="font-medium">Other</span>
                </Label>
              </div>
            </RadioGroup>

            {data.heardFrom === "other" && (
              <div className="mt-4">
                <Label className="text-sm">Please specify</Label>
                <Input
                  placeholder="Tell us how you found us..."
                  value={data.customHeardFrom}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      customHeardFrom: e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep > totalSteps) {
    // Generate user's profile data for the professional card
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    };

    const getUserTitle = () => {
      if (
        data.domains.includes("software-dev") ||
        data.domains.includes("web-dev")
      ) {
        return data.experience === "advanced"
          ? "Senior Software Engineer"
          : data.experience === "intermediate"
            ? "Software Engineer"
            : "Junior Developer";
      }
      if (data.domains.includes("data-science")) return "Data Scientist";
      if (data.domains.includes("design")) return "UI/UX Designer";
      if (data.domains.includes("mobile-dev")) return "Mobile App Developer";
      if (data.domains.includes("cloud-computing")) return "Cloud Engineer";
      if (data.domains.includes("blockchain")) return "Blockchain Developer";
      if (data.domains.includes("devops")) return "DevOps Engineer";
      if (data.domains.includes("cybersecurity"))
        return "Cybersecurity Specialist";
      if (data.domains.includes("game-dev")) return "Game Developer";
      if (data.domains.includes("iot")) return "IoT Engineer";
      if (data.domains.includes("robotics")) return "Robotics Engineer";
      if (data.domains.includes("ar-vr")) return "AR/VR Developer";
      if (data.domains.includes("quantum-computing"))
        return "Quantum Computing Researcher";
      return "Tech Professional";
    };

    const getCompany = () => {
      const companies = [
        "Tech Startup",
        "Growing Company",
        "Innovation Lab",
        "Digital Agency",
        "Student",
      ];
      return companies[Math.floor(Math.random() * companies.length)];
    };

    const getRandomStats = () => ({
      projectsCollaborated: Math.floor(Math.random() * 30) + 5,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // Random rating between 3.5-5.0
    });

    const userProfile = {
      id: "user",
      name: "Your Name", // In real app, this would come from auth
      title: getUserTitle(),
      company: getCompany(),
      avatar: getInitials("Your Name"), // In real app, this would be actual initials
      experience:
        data.experience === "beginner"
          ? "< 1 Year"
          : data.experience === "intermediate"
            ? "1-3 Years"
            : "3+ Years",
      leetcodeRank: data.leetcodeRank || data.gfgRank || "--",
      domains: data.domains
        .map((domainId) => {
          const domain = allDomains.find((d) => d.id === domainId);
          return domain?.name || domainId;
        })
        .slice(0, 2),
      ...getRandomStats(),
      skills: data.skills.slice(0, 3),
    };

    // Store user onboarding data in localStorage
    localStorage.setItem("userOnboardingData", JSON.stringify(data));

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <nav className="border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Dominic</span>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Profile Card Created! 🎉
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your comprehensive profile is ready. Welcome to the Dominic
                community!
              </p>
            </div>

            {/* Professional Profile Card */}
            <div className="flex justify-center mb-12">
              <ProfileCard profile={userProfile} />
            </div>

            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button size="lg" className="flex items-center space-x-2">
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/mentors">
                  <Button variant="outline" size="lg">
                    Find Mentors
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground">
                Your profile will help us connect you with the right mentors and
                learning opportunities!
              </p>
            </div>
          </div>
        </div>
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
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-background/50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <span>
                    {currentStep === totalSteps
                      ? "Create Profile Card"
                      : "Next"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
