import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
  Code,
  Users,
  BookOpen,
  Trophy,
  Zap
} from "lucide-react";

interface ProfileCardData {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  experience: string;
  leetcodeRank: string;
  domains: string[];
  projectsCollaborated: number;
  mentorshipHours: number;
  skills: string[];
}

interface ProfileCardProps {
  profile: ProfileCardData;
  className?: string;
}

export default function ProfileCard({ profile, className = "" }: ProfileCardProps) {
  return (
    <Card className={`w-full max-w-sm bg-slate-800/95 border-slate-700/50 text-white backdrop-blur-sm ${className}`}>
      <CardContent className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-700/50 border-2 border-slate-600/50 flex items-center justify-center mx-auto">
            <span className="text-lg font-semibold text-slate-300">
              {profile.avatar}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{profile.name}</h3>
            <p className="text-slate-400 text-sm">{profile.title}</p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              <Briefcase className="w-3 h-3 text-slate-500" />
              <span className="text-xs text-slate-500">{profile.company}</span>
            </div>
          </div>
        </div>

        {/* Experience and LeetCode */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center space-x-2 mb-1">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400">Experience</span>
            </div>
            <div className="text-lg font-semibold text-white">{profile.experience}</div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center space-x-2 mb-1">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400">LeetCode</span>
            </div>
            <div className="text-lg font-semibold text-cyan-400">{profile.leetcodeRank}</div>
          </div>
        </div>

        {/* Enrolled Domains */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Enrolled Domains</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.domains.map((domain, index) => (
              <Badge 
                key={index} 
                className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs px-2 py-1"
              >
                {domain}
              </Badge>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Community</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/30 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{profile.projectsCollaborated}</div>
              <div className="text-xs text-slate-400">Projects Collaborated</div>
            </div>
            <div className="bg-slate-900/30 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{profile.mentorshipHours}</div>
              <div className="text-xs text-slate-400">Mentorship Hours</div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-slate-700/50 text-slate-300 border-slate-600/30 text-xs px-2 py-1"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample profile data generator
export const generateSampleProfiles = (): ProfileCardData[] => [
  {
    id: "1",
    name: "Aisha Desai",
    title: "Blockchain Developer",
    company: "Web3 Startup",
    avatar: "AD",
    experience: "3 Years",
    leetcodeRank: "#8,102",
    domains: ["Web3 & DeFi"],
    projectsCollaborated: 15,
    mentorshipHours: 60,
    skills: ["Solidity", "Ethers.js", "Hardhat"]
  },
  {
    id: "2",
    name: "Rahul Sharma",
    title: "Full Stack Developer",
    company: "Tech Unicorn",
    avatar: "RS",
    experience: "2 Years",
    leetcodeRank: "#12,453",
    domains: ["Web Dev", "Mobile Dev"],
    projectsCollaborated: 23,
    mentorshipHours: 45,
    skills: ["React", "Node.js", "TypeScript"]
  },
  {
    id: "3",
    name: "Priya Gupta",
    title: "Data Scientist",
    company: "AI Research Lab",
    avatar: "PG",
    experience: "4 Years",
    leetcodeRank: "#5,789",
    domains: ["Data Science", "ML/AI"],
    projectsCollaborated: 31,
    mentorshipHours: 120,
    skills: ["Python", "TensorFlow", "PyTorch"]
  },
  {
    id: "4",
    name: "Arjun Patel",
    title: "DevOps Engineer",
    company: "Cloud Startup",
    avatar: "AP",
    experience: "3 Years",
    leetcodeRank: "#15,234",
    domains: ["DevOps", "Cloud Computing"],
    projectsCollaborated: 18,
    mentorshipHours: 75,
    skills: ["AWS", "Docker", "Kubernetes"]
  },
  {
    id: "5",
    name: "Sneha Kumar",
    title: "UI/UX Designer",
    company: "Design Agency",
    avatar: "SK",
    experience: "2 Years",
    leetcodeRank: "#25,671",
    domains: ["Design", "Content Creation"],
    projectsCollaborated: 27,
    mentorshipHours: 55,
    skills: ["Figma", "Photoshop", "Prototyping"]
  },
  {
    id: "6",
    name: "Karthik Reddy",
    title: "Mobile App Developer",
    company: "Fintech Startup",
    avatar: "KR",
    experience: "3 Years",
    leetcodeRank: "#9,876",
    domains: ["Mobile Dev", "Fintech"],
    projectsCollaborated: 20,
    mentorshipHours: 90,
    skills: ["Flutter", "React Native", "Swift"]
  },
  {
    id: "7",
    name: "Ananya Singh",
    title: "Product Manager",
    company: "EdTech Platform",
    avatar: "AS",
    experience: "4 Years",
    leetcodeRank: "#18,543",
    domains: ["Product Management", "EdTech"],
    projectsCollaborated: 35,
    mentorshipHours: 110,
    skills: ["Strategy", "Analytics", "Leadership"]
  },
  {
    id: "8",
    name: "Varun Agarwal",
    title: "Cybersecurity Analyst",
    company: "Security Firm",
    avatar: "VA",
    experience: "3 Years",
    leetcodeRank: "#11,234",
    domains: ["Cybersecurity", "Ethical Hacking"],
    projectsCollaborated: 16,
    mentorshipHours: 65,
    skills: ["Penetration Testing", "SIEM", "Forensics"]
  }
];
