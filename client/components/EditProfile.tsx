import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Trophy,
  Code,
  Save,
  ArrowLeft,
  Plus,
  X,
  ExternalLink,
  CheckCircle
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  avatar: string;
  skills: string[];
  domains: string[];
  experience: string;
  leetcodeId: string;
  leetcodeRank: string;
  gfgId: string;
  gfgRank: string;
  githubId: string;
  preferredPlatform: string;
  hackathonId: string;
  goals: string[];
  customGoal: string;
  projects: Array<{
    name: string;
    title: string;
    skillsUsed: string[];
  }>;
}

interface EditProfileProps {
  onBack: () => void;
  onSave: (profile: UserProfile) => void;
}

const techDomains = [
  { id: "software-dev", name: "Software Development" },
  { id: "web-dev", name: "Web Development" },
  { id: "mobile-dev", name: "Mobile Development" },
  { id: "data-science", name: "Data Science & AI" },
  { id: "design", name: "UI/UX Design" },
  { id: "cloud-computing", name: "Cloud Computing" },
  { id: "blockchain", name: "Blockchain & Web3" },
  { id: "devops", name: "DevOps & Infrastructure" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "game-dev", name: "Game Development" },
  { id: "iot", name: "IoT & Embedded Systems" },
  { id: "robotics", name: "Robotics & Automation" },
  { id: "ar-vr", name: "AR/VR Development" },
  { id: "quantum-computing", name: "Quantum Computing" }
];

const techSkillsOptions = [
  "JavaScript", "Python", "Java", "C++", "React", "Node.js", "Django", "Flask",
  "Machine Learning", "Data Analysis", "UI/UX Design", "Mobile Development",
  "DevOps", "Cloud Computing", "Cybersecurity", "Blockchain", "Flutter", "Swift",
  "Kotlin", "TypeScript", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes",
  "TensorFlow", "PyTorch", "Figma", "Unity", "Unreal Engine"
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
  "Contribute to open source"
];

export default function EditProfile({ onBack, onSave }: EditProfileProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    title: "",
    company: "",
    location: "",
    bio: "",
    avatar: "",
    skills: [],
    domains: [],
    experience: "",
    leetcodeId: "",
    leetcodeRank: "",
    gfgId: "",
    gfgRank: "",
    githubId: "",
    preferredPlatform: "",
    hackathonId: "",
    goals: [],
    customGoal: "",
    projects: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    title: "",
    skillsUsed: []
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('userOnboardingData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setProfile({
        name: data.name || "Aditya Singh", // In real app, this would come from auth
        email: data.email || "aditya@example.com", // In real app, this would come from auth
        title: data.title || getUserTitle(data),
        company: data.company || "Tech Startup",
        location: data.location || "Mumbai, India",
        bio: data.bio || `Passionate about ${data.domains?.map((d: string) => techDomains.find(td => td.id === d)?.name || d).join(", ").toLowerCase()} with expertise in modern technologies. Love building scalable solutions and mentoring upcoming developers in the community.`,
        avatar: data.avatar || "",
        skills: data.skills || [],
        domains: data.domains || [],
        experience: data.experience || "",
        leetcodeId: data.leetcodeId || "",
        leetcodeRank: data.leetcodeRank || "",
        gfgId: data.gfgId || "",
        gfgRank: data.gfgRank || "",
        githubId: data.githubId || "",
        preferredPlatform: data.preferredPlatform || "",
        hackathonId: data.hackathonId || "",
        goals: data.goals || [],
        customGoal: data.customGoal || "",
        projects: data.userProjects || []
      });
    }
  }, []);

  const getUserTitle = (data: any) => {
    if (data.domains?.includes('software-dev') || data.domains?.includes('web-dev')) {
      return data.experience === 'advanced' ? 'Senior Software Engineer' :
             data.experience === 'intermediate' ? 'Software Engineer' : 'Junior Developer';
    }
    if (data.domains?.includes('data-science')) return 'Data Scientist';
    if (data.domains?.includes('design')) return 'UI/UX Designer';
    if (data.domains?.includes('mobile-dev')) return 'Mobile App Developer';
    if (data.domains?.includes('cloud-computing')) return 'Cloud Engineer';
    if (data.domains?.includes('blockchain')) return 'Blockchain Developer';
    if (data.domains?.includes('devops')) return 'DevOps Engineer';
    if (data.domains?.includes('cybersecurity')) return 'Cybersecurity Specialist';
    if (data.domains?.includes('game-dev')) return 'Game Developer';
    if (data.domains?.includes('iot')) return 'IoT Engineer';
    if (data.domains?.includes('robotics')) return 'Robotics Engineer';
    if (data.domains?.includes('ar-vr')) return 'AR/VR Developer';
    if (data.domains?.includes('quantum-computing')) return 'Quantum Computing Researcher';
    return 'Tech Professional';
  };

  const handleSkillToggle = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleDomainToggle = (domainId: string) => {
    setProfile(prev => ({
      ...prev,
      domains: prev.domains.includes(domainId)
        ? prev.domains.filter(d => d !== domainId)
        : [...prev.domains, domainId]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const addCustomSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addProject = () => {
    if (newProject.name.trim() && newProject.title.trim()) {
      setProfile(prev => ({
        ...prev,
        projects: [...prev.projects, { ...newProject }]
      }));
      setNewProject({ name: "", title: "", skillsUsed: [] });
    }
  };

  const removeProject = (index: number) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage (in real app, this would be an API call)
    const updatedData = {
      ...profile,
      userProjects: profile.projects
    };
    localStorage.setItem('userOnboardingData', JSON.stringify(updatedData));
    
    setIsLoading(false);
    onSave(profile);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground">Update your profile information and preferences</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Photo & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Avatar */}
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-border">
                  <AvatarFallback className="bg-primary text-white text-xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'AS'}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g., Tech Startup"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Mumbai, India"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Technical Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tech Domains */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Technology Domains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techDomains.map((domain) => (
                  <Label
                    key={domain.id}
                    className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg border text-sm transition-colors ${
                      profile.domains.includes(domain.id) ? 'bg-primary/5 border-primary text-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleDomainToggle(domain.id)}
                  >
                    <Checkbox
                      checked={profile.domains.includes(domain.id)}
                      onChange={() => {}}
                    />
                    <span>{domain.name}</span>
                  </Label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Skills */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Your Skills</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Add Custom Skill */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Add Custom Skill</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill..."
                    onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                  />
                  <Button onClick={addCustomSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Available Skills */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Select from Popular Skills</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {techSkillsOptions.filter(skill => !profile.skills.includes(skill)).map((skill) => (
                    <Label
                      key={skill}
                      className="flex items-center space-x-2 cursor-pointer p-2 rounded border text-sm hover:bg-muted/50"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      <Checkbox
                        checked={profile.skills.includes(skill)}
                        onChange={() => {}}
                      />
                      <span>{skill}</span>
                    </Label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Platform & Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leetcode">LeetCode Username</Label>
                  <Input
                    id="leetcode"
                    value={profile.leetcodeId}
                    onChange={(e) => setProfile(prev => ({ ...prev, leetcodeId: e.target.value }))}
                    placeholder="your_leetcode_username"
                  />
                </div>
                <div>
                  <Label htmlFor="leetcode-rank">LeetCode Rank</Label>
                  <Input
                    id="leetcode-rank"
                    value={profile.leetcodeRank}
                    onChange={(e) => setProfile(prev => ({ ...prev, leetcodeRank: e.target.value }))}
                    placeholder="#12,345"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub Username</Label>
                  <Input
                    id="github"
                    value={profile.githubId}
                    onChange={(e) => setProfile(prev => ({ ...prev, githubId: e.target.value }))}
                    placeholder="your-github-username"
                  />
                </div>
                <div>
                  <Label htmlFor="hackathon">Hackathon/Unstop ID</Label>
                  <Input
                    id="hackathon"
                    value={profile.hackathonId}
                    onChange={(e) => setProfile(prev => ({ ...prev, hackathonId: e.target.value }))}
                    placeholder="your-hackathon-id"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-2">
                {profile.leetcodeId && (
                  <a
                    href={`https://leetcode.com/${profile.leetcodeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View LeetCode
                  </a>
                )}
                {profile.githubId && (
                  <a
                    href={`https://github.com/${profile.githubId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View GitHub
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Projects */}
              {profile.projects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{project.title}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skillsUsed.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add New Project */}
              <div className="p-4 border rounded-lg border-dashed">
                <h4 className="font-medium mb-3">Add New Project</h4>
                <div className="space-y-3">
                  <Input
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Project name"
                  />
                  <Input
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Project description"
                  />
                  <Input
                    value={newProject.skillsUsed.join(', ')}
                    onChange={(e) => setNewProject(prev => ({ 
                      ...prev, 
                      skillsUsed: e.target.value.split(', ').filter(s => s.trim()) 
                    }))}
                    placeholder="Skills used (comma-separated)"
                  />
                  <Button onClick={addProject} size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Goals & Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goalsOptions.map((goal) => (
                  <Label
                    key={goal}
                    className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg border text-sm transition-colors ${
                      profile.goals.includes(goal) ? 'bg-primary/5 border-primary text-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    <Checkbox
                      checked={profile.goals.includes(goal)}
                      onChange={() => {}}
                    />
                    <span>{goal}</span>
                  </Label>
                ))}
              </div>

              <div>
                <Label htmlFor="custom-goal">Custom Goals</Label>
                <Textarea
                  id="custom-goal"
                  value={profile.customGoal}
                  onChange={(e) => setProfile(prev => ({ ...prev, customGoal: e.target.value }))}
                  placeholder="Tell us about your other specific goals..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          size="lg"
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
