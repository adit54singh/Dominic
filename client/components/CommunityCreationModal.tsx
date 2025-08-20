import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Users,
  Image,
  Globe,
  Lock,
  Camera,
  Upload,
  Check,
  AlertCircle,
  Hash,
  MapPin,
  Calendar,
  Target
} from "lucide-react";

interface CommunityCreationModalProps {
  onClose: () => void;
  onCreateCommunity: (community: any) => void;
}

export default function CommunityCreationModal({ 
  onClose, 
  onCreateCommunity 
}: CommunityCreationModalProps) {
  const [step, setStep] = useState(1);
  const [communityData, setCommunityData] = useState({
    name: "",
    description: "",
    category: "",
    privacy: "public",
    image: null as string | null,
    rules: [""],
    tags: [""],
    location: "",
    goals: ""
  });

  const categories = [
    { id: "tech", name: "Technology", icon: "💻", description: "Programming, AI, DevOps, etc." },
    { id: "design", name: "Design", icon: "🎨", description: "UI/UX, Graphics, Product Design" },
    { id: "business", name: "Business", icon: "💼", description: "Entrepreneurship, Marketing, Sales" },
    { id: "data", name: "Data Science", icon: "📊", description: "Analytics, ML, Statistics" },
    { id: "mobile", name: "Mobile Dev", icon: "📱", description: "iOS, Android, React Native" },
    { id: "content", name: "Content", icon: "✍️", description: "Writing, Video, Social Media" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCommunityData(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addRule = () => {
    setCommunityData(prev => ({
      ...prev,
      rules: [...prev.rules, ""]
    }));
  };

  const updateRule = (index: number, value: string) => {
    setCommunityData(prev => ({
      ...prev,
      rules: prev.rules.map((rule, i) => i === index ? value : rule)
    }));
  };

  const removeRule = (index: number) => {
    setCommunityData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    setCommunityData(prev => ({
      ...prev,
      tags: [...prev.tags, ""]
    }));
  };

  const updateTag = (index: number, value: string) => {
    setCommunityData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  const removeTag = (index: number) => {
    setCommunityData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleCreate = () => {
    const community = {
      id: Date.now().toString(),
      ...communityData,
      createdAt: new Date().toISOString(),
      members: 1,
      posts: 0,
      isOwner: true
    };
    onCreateCommunity(community);
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        
        {/* Community Image */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            {communityData.image ? (
              <img 
                src={communityData.image} 
                alt="Community" 
                className="w-20 h-20 rounded-lg object-cover border-2 border-border"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <label className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/80 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-3 h-3" />
            </label>
          </div>
          <div>
            <div className="font-medium">Community Image</div>
            <div className="text-sm text-muted-foreground">Choose an image that represents your community</div>
          </div>
        </div>

        {/* Community Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Community Name *</label>
          <input
            type="text"
            value={communityData.name}
            onChange={(e) => setCommunityData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. React Developers Hub"
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description *</label>
          <Textarea
            value={communityData.description}
            onChange={(e) => setCommunityData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what your community is about, what members can expect, and what topics you'll cover..."
            className="min-h-[100px]"
          />
          <div className="text-xs text-muted-foreground mt-1">
            {communityData.description.length}/500 characters
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category *</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setCommunityData(prev => ({ ...prev, category: category.id }))}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  communityData.category === category.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <label className="block text-sm font-medium mb-2">Privacy Settings</label>
          <div className="space-y-2">
            <div
              onClick={() => setCommunityData(prev => ({ ...prev, privacy: 'public' }))}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                communityData.privacy === 'public'
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">Public Community</div>
                  <div className="text-sm text-muted-foreground">Anyone can find and join this community</div>
                </div>
              </div>
            </div>
            <div
              onClick={() => setCommunityData(prev => ({ ...prev, privacy: 'private' }))}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                communityData.privacy === 'private'
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="font-medium">Private Community</div>
                  <div className="text-sm text-muted-foreground">Only invited members can join</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Community Details</h3>
        
        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Location (Optional)</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={communityData.location}
              onChange={(e) => setCommunityData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. Bangalore, India or Remote"
              className="w-full pl-10 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Goals */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Community Goals</label>
          <div className="relative">
            <Target className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Textarea
              value={communityData.goals}
              onChange={(e) => setCommunityData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="What are the main goals and objectives of this community?"
              className="pl-10 min-h-[80px]"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="space-y-2">
            {communityData.tags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder="e.g. javascript, react, frontend"
                  className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {communityData.tags.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTag(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addTag}
              className="w-full"
            >
              Add Tag
            </Button>
          </div>
        </div>

        {/* Community Rules */}
        <div>
          <label className="block text-sm font-medium mb-2">Community Rules</label>
          <div className="space-y-2">
            {communityData.rules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary mt-1">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => updateRule(index, e.target.value)}
                  placeholder="e.g. Be respectful and professional"
                  className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {communityData.rules.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addRule}
              className="w-full"
            >
              Add Rule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Review Your Community</h3>
        <p className="text-muted-foreground mb-6">
          Review all the details before creating your community
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            {communityData.image ? (
              <img 
                src={communityData.image} 
                alt="Community" 
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{communityData.name}</h4>
              <p className="text-muted-foreground text-sm mb-2">{communityData.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Badge variant="outline">{categories.find(c => c.id === communityData.category)?.name}</Badge>
                <Badge variant={communityData.privacy === 'public' ? 'default' : 'secondary'}>
                  {communityData.privacy === 'public' ? 'Public' : 'Private'}
                </Badge>
                {communityData.location && (
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{communityData.location}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {communityData.goals && (
            <div className="mb-4">
              <h5 className="font-medium mb-1">Goals:</h5>
              <p className="text-sm text-muted-foreground">{communityData.goals}</p>
            </div>
          )}

          {communityData.tags.filter(tag => tag.trim()).length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium mb-1">Tags:</h5>
              <div className="flex flex-wrap gap-1">
                {communityData.tags.filter(tag => tag.trim()).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {communityData.rules.filter(rule => rule.trim()).length > 0 && (
            <div>
              <h5 className="font-medium mb-2">Community Rules:</h5>
              <ul className="space-y-1">
                {communityData.rules.filter(rule => rule.trim()).map((rule, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                    <span className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary mt-0.5">
                      {index + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const isStep1Valid = communityData.name.trim() && communityData.description.trim() && communityData.category;
  const canProceed = step === 1 ? isStep1Valid : true;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">Create Community</h2>
            <p className="text-sm text-muted-foreground">
              Step {step} of 3 - {step === 1 ? 'Basic Information' : step === 2 ? 'Community Details' : 'Review & Create'}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i}
                </div>
                {i < 3 && (
                  <div className={`flex-1 h-0.5 ${i < step ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-muted/30">
          <div className="text-sm text-muted-foreground">
            {step === 1 && (
              <div className="flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>All fields marked with * are required</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                disabled={!canProceed}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleCreate}
                disabled={!isStep1Valid}
                className="bg-green-600 hover:bg-green-700"
              >
                Create Community
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
