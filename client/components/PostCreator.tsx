import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Image,
  Video,
  Smile,
  MapPin,
  Users,
  Send,
  X,
  Camera,
  Mic,
  Hash
} from "lucide-react";

interface PostCreatorProps {
  user?: {
    name: string;
    avatar: string;
  };
  onCreatePost?: (post: any) => void;
}

export default function PostCreator({ user, onCreatePost }: PostCreatorProps) {
  const [postContent, setPostContent] = useState("");
  const [showFullEditor, setShowFullEditor] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleCreatePost = () => {
    if (postContent.trim() || selectedMedia) {
      const newPost = {
        id: Date.now().toString(),
        content: postContent,
        media: selectedMedia,
        author: user || { name: "You", avatar: "YU" },
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        type: selectedMedia ? "media" : "text"
      };
      
      onCreatePost?.(newPost);
      setPostContent("");
      setSelectedMedia(null);
      setShowFullEditor(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedMedia(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full mb-6 border-0 shadow-sm bg-background/80 backdrop-blur-sm">
      <CardContent className="p-6">
        {/* Quick Post Section */}
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-white">
              {user?.avatar || "YU"}
            </AvatarFallback>
          </Avatar>
          <div 
            className="flex-1 bg-muted/50 rounded-full px-4 py-3 cursor-pointer hover:bg-muted/70 transition-colors"
            onClick={() => setShowFullEditor(true)}
          >
            <span className="text-muted-foreground">What's on your mind, {user?.name || "there"}?</span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button variant="ghost" className="flex items-center space-x-2 text-green-600 hover:bg-green-50" asChild>
                <span>
                  <Image className="w-5 h-5" />
                  <span className="hidden sm:block">Photo</span>
                </span>
              </Button>
            </label>

            <Button variant="ghost" className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50">
              <Video className="w-5 h-5" />
              <span className="hidden sm:block">Video</span>
            </Button>

            <Button 
              variant="ghost" 
              className={`flex items-center space-x-2 ${isRecording ? 'text-red-600' : 'text-purple-600'} hover:bg-purple-50`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-5 h-5" />
              <span className="hidden sm:block">{isRecording ? "Stop" : "Audio"}</span>
            </Button>

            <Button variant="ghost" className="flex items-center space-x-2 text-orange-600 hover:bg-orange-50">
              <Users className="w-5 h-5" />
              <span className="hidden sm:block">Tag</span>
            </Button>
          </div>

          <Dialog open={showFullEditor} onOpenChange={setShowFullEditor}>
            <DialogTrigger asChild>
              <Button>Create Post</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-white">
                      {user?.avatar || "YU"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{user?.name || "You"}</div>
                    <div className="text-sm text-muted-foreground">Public post</div>
                  </div>
                </div>

                <Textarea
                  placeholder="What's happening?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[120px] border-0 text-lg resize-none focus:ring-0"
                />

                {selectedMedia && (
                  <div className="relative">
                    <img 
                      src={selectedMedia} 
                      alt="Selected media" 
                      className="w-full max-h-96 object-cover rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                      onClick={() => setSelectedMedia(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button variant="ghost" size="sm">
                        <Image className="w-5 h-5 text-green-600" />
                      </Button>
                    </label>

                    <Button variant="ghost" size="sm">
                      <Video className="w-5 h-5 text-blue-600" />
                    </Button>

                    <Button variant="ghost" size="sm">
                      <Smile className="w-5 h-5 text-yellow-600" />
                    </Button>

                    <Button variant="ghost" size="sm">
                      <MapPin className="w-5 h-5 text-red-600" />
                    </Button>

                    <Button variant="ghost" size="sm">
                      <Hash className="w-5 h-5 text-purple-600" />
                    </Button>
                  </div>

                  <Button 
                    onClick={handleCreatePost}
                    disabled={!postContent.trim() && !selectedMedia}
                    className="px-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 text-sm">Recording audio...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
