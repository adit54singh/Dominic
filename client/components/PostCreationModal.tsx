import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Image,
  Video,
  Link,
  Hash,
  MapPin,
  Smile,
  Send,
  Upload,
  Camera,
  FileText,
  Calendar,
  Users,
  Zap,
  Code
} from "lucide-react";

interface PostCreationModalProps {
  onClose: () => void;
  onCreatePost: (post: any) => void;
  user: {
    name: string;
    avatar: string;
    title: string;
  };
}

export default function PostCreationModal({ 
  onClose, 
  onCreatePost,
  user 
}: PostCreationModalProps) {
  const [postType, setPostType] = useState<'text' | 'image' | 'video' | 'link' | 'code' | 'event'>('text');
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    time: "",
    location: ""
  });
  const [codeSnippet, setCodeSnippet] = useState({
    language: "javascript",
    code: ""
  });

  const postTypes = [
    { id: 'text', name: 'Text Post', icon: FileText, description: 'Share thoughts and updates' },
    { id: 'image', name: 'Photo', icon: Image, description: 'Share images and screenshots' },
    { id: 'video', name: 'Video', icon: Video, description: 'Upload or embed videos' },
    { id: 'link', name: 'Link', icon: Link, description: 'Share articles and resources' },
    { id: 'code', name: 'Code Snippet', icon: Code, description: 'Share code and tutorials' },
    { id: 'event', name: 'Event', icon: Calendar, description: 'Announce community events' }
  ];

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'cpp', 'react', 'html', 'css', 'sql', 'bash'
  ];

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMedia(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags(prev => [...prev, tag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleCreatePost = () => {
    const post = {
      id: Date.now().toString(),
      type: postType,
      author: {
        id: 'user',
        name: user.name,
        title: user.title,
        avatar: user.avatar,
        isFollowed: false
      },
      content: {
        text: content,
        media: postType === 'image' || postType === 'video' ? media : undefined,
        link: postType === 'link' ? link : undefined,
        code: postType === 'code' ? codeSnippet : undefined,
        event: postType === 'event' ? eventDetails : undefined,
        tags,
        location: location || undefined
      },
      timestamp: new Date().toLocaleString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false
    };
    
    onCreatePost(post);
    onClose();
  };

  const renderPostTypeContent = () => {
    switch (postType) {
      case 'image':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {media ? (
                <div className="relative">
                  <img src={media} alt="Upload" className="max-w-full h-48 object-cover rounded mx-auto" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMedia(null)}
                    className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Click to upload an image</p>
                </label>
              )}
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
                <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Click to upload a video</p>
              </label>
            </div>
          </div>
        );

      case 'link':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Link URL</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Programming Language</label>
              <select
                value={codeSnippet.language}
                onChange={(e) => setCodeSnippet(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Code</label>
              <Textarea
                value={codeSnippet.code}
                onChange={(e) => setCodeSnippet(prev => ({ ...prev, code: e.target.value }))}
                placeholder="// Your code here..."
                className="font-mono text-sm min-h-[150px]"
              />
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                value={eventDetails.title}
                onChange={(e) => setEventDetails(prev => ({ ...prev, title: e.target.value }))}
                placeholder="React Workshop for Beginners"
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={eventDetails.date}
                  onChange={(e) => setEventDetails(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  value={eventDetails.time}
                  onChange={(e) => setEventDetails(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Event Location</label>
              <input
                type="text"
                value={eventDetails.location}
                onChange={(e) => setEventDetails(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Online / Bangalore, India"
                className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canPost = content.trim() || media || link || 
    (postType === 'code' && codeSnippet.code.trim()) ||
    (postType === 'event' && eventDetails.title.trim());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-white">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.title}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Type Selection */}
        <div className="p-4 border-b">
          <label className="block text-sm font-medium mb-3">Post Type</label>
          <div className="grid grid-cols-3 gap-2">
            {postTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setPostType(type.id as any)}
                className={`p-3 border rounded-lg text-left transition-all hover:border-primary/50 ${
                  postType === type.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <type.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{type.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Main Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {postType === 'event' ? 'Event Description' : 'What\'s on your mind?'}
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                postType === 'event' ? 'Describe your event...' :
                postType === 'code' ? 'Explain your code snippet...' :
                postType === 'link' ? 'Share your thoughts about this link...' :
                "Share something with the community..."
              }
              className="min-h-[100px]"
            />
          </div>

          {/* Type-specific content */}
          {renderPostTypeContent()}

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tags (Optional)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add tags (press Enter)"
              className="w-full p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addTag(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Location (Optional)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                className="w-full pl-10 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Posting to community</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreatePost}
              disabled={!canPost}
              className="bg-primary"
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
