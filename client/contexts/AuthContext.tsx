import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface User {
  id: string;
  google_id?: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  title?: string;
  skills?: string;
  experience?: string;
  domains?: string;
}

interface Activity {
  id: string;
  user_id: string;
  type: string;
  action: string;
  details: string;
  timestamp: string;
}

interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  domain: string;
  tech_stack: string[];
  status: string;
  progress: number;
  due_date: string;
  created_at: string;
  updated_at: string;
}

interface Community {
  id: string;
  name: string;
  description: string;
  domain: string;
  category: string;
  privacy: string;
  members: number;
  posts: number;
  rules: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  projects: Project[];
  communities: Community[];
  activities: Activity[];
  socket: Socket | null;
  
  // Methods
  login: () => void;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<User>) => Promise<void>;
  createProject: (project: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Project>;
  joinCommunity: (communityId: string) => Promise<void>;
  leaveCommunity: (communityId: string) => Promise<void>;
  addActivity: (activity: Omit<Activity, 'id' | 'user_id' | 'timestamp'>) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  syncData: (type: 'projects' | 'communities' | 'activity' | 'all') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize authentication and socket connection
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check current authentication status
        const res = await fetch('/api/auth/user', { credentials: 'include' });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);

          // Connect to Socket.io with user ID
          const newSocket = io('/', {
            auth: {
              userId: userData.id,
            },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
          });

          // Socket event listeners
          newSocket.on('activity:new', (activity: Activity) => {
            setActivities((prev) => [activity, ...prev].slice(0, 50));
          });

          newSocket.on('project:updated', (project: Project) => {
            setProjects((prev) =>
              prev.map((p) => (p.id === project.id ? project : p))
            );
          });

          newSocket.on('community:joined', (community: Community) => {
            setCommunities((prev) => [...prev, community]);
          });

          newSocket.on('community:member-joined', (data) => {
            // Update community member count
            setCommunities((prev) =>
              prev.map((c) =>
                c.id === data.communityId
                  ? { ...c, members: c.members + 1 }
                  : c
              )
            );
          });

          newSocket.on('user:followed', (data) => {
            // Handle being followed
            console.log('You were followed by:', data.followerId);
          });

          newSocket.on('data:synced', (syncData) => {
            if (syncData.projects) setProjects(syncData.projects);
            if (syncData.communities) setCommunities(syncData.communities);
            if (syncData.activity) setActivities(syncData.activity);
          });

          newSocket.on('error', (error) => {
            console.error('Socket error:', error);
          });

          setSocket(newSocket);

          // Fetch initial data
          await fetchProjects(userData.id);
          await fetchCommunities(userData.id);
          await fetchActivity(userData.id);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const fetchProjects = async (userId: string) => {
    try {
      const res = await fetch('/api/user/projects', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchCommunities = async (userId: string) => {
    try {
      const res = await fetch('/api/user/communities', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setCommunities(data);
      }
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  const fetchActivity = async (userId: string) => {
    try {
      const res = await fetch('/api/user/activity?limit=50', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  const login = () => {
    window.location.href = '/api/auth/google';
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setProjects([]);
      setCommunities([]);
      setActivities([]);
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (profile: Partial<User>) => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const createProject = async (project: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const res = await fetch('/api/user/projects', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects((prev) => [newProject, ...prev]);
        return newProject;
      }
      throw new Error('Failed to create project');
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

  const joinCommunity = async (communityId: string) => {
    try {
      const res = await fetch('/api/user/communities/join', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ communityId }),
      });
      if (!res.ok) {
        throw new Error('Failed to join community');
      }

      if (socket) {
        socket.emit('community:join', { communityId });
      }
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const res = await fetch('/api/user/communities/leave', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ communityId }),
      });
      if (res.ok) {
        setCommunities((prev) => prev.filter((c) => c.id !== communityId));
      }
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  };

  const addActivity = async (activity: Omit<Activity, 'id' | 'user_id' | 'timestamp'>) => {
    try {
      if (socket) {
        socket.emit('activity', activity);
      } else {
        // Fallback to HTTP request
        await fetch('/api/user/activity', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(activity),
        });
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      throw error;
    }
  };

  const followUser = async (userId: string) => {
    try {
      const res = await fetch('/api/user/follow', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followingId: userId }),
      });
      if (!res.ok) {
        throw new Error('Failed to follow user');
      }

      if (socket) {
        socket.emit('user:follow', { followingId: userId });
      }
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      const res = await fetch('/api/user/unfollow', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followingId: userId }),
      });
      if (!res.ok) {
        throw new Error('Failed to unfollow user');
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  };

  const syncData = async (type: 'projects' | 'communities' | 'activity' | 'all') => {
    if (socket) {
      socket.emit('data:sync', { type });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    projects,
    communities,
    activities,
    socket,
    login,
    logout,
    updateProfile,
    createProject,
    joinCommunity,
    leaveCommunity,
    addActivity,
    followUser,
    unfollowUser,
    syncData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
