import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'project' | 'event';
  replyTo?: string;
  reactions: { emoji: string; users: string[] }[];
  isPinned: boolean;
  isEdited: boolean;
}

export interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy';
  lastSeen: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  privacy: 'public' | 'private';
  image?: string;
  rules: string[];
  tags: string[];
  location?: string;
  goals?: string;
  createdAt: string;
  members: number;
  posts: number;
  isOwner: boolean;
  isJoined: boolean;
  membersList: Member[];
  onlineUsers: OnlineUser[];
  recentPosts: CommunityPost[];
  events: CommunityEvent[];
  projects: CommunityProject[];
  hackathons: Hackathon[];
  queries: Query[];
  chatMessages: ChatMessage[];
  pinnedMessages: ChatMessage[];
  domain: string;
  lastActivity: string;
}

export interface Member {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isFollowed: boolean;
  lastActive: string;
  joinedAt: string;
  role: 'owner' | 'admin' | 'member';
  isOnline: boolean;
  status: 'online' | 'away' | 'busy';
  skills: string[];
  connections: string[];
}

export interface CommunityPost {
  id: string;
  author: Member;
  content: string;
  image?: string;
  files?: { name: string; url: string; type: string }[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  type: 'general' | 'project' | 'hackathon' | 'query' | 'announcement' | 'poll';
  tags: string[];
  isPinned: boolean;
  visibility: 'public' | 'members' | 'followers';
  reactions: { emoji: string; count: number; users: string[] }[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'meeting' | 'workshop' | 'hackathon' | 'networking';
  attendees: number;
  maxAttendees?: number;
  isAttending: boolean;
}

export interface CommunityProject {
  id: string;
  title: string;
  description: string;
  author: Member;
  technologies: string[];
  lookingFor: string[];
  github?: string;
  demo?: string;
  createdAt: string;
  interested: number;
  isInterested: boolean;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  organizer: Member;
  startDate: string;
  endDate: string;
  prize?: string;
  participants: number;
  maxParticipants?: number;
  isParticipating: boolean;
  registrationDeadline: string;
  technologies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Query {
  id: string;
  title: string;
  content: string;
  author: Member;
  timestamp: string;
  tags: string[];
  answers: number;
  isAnswered: boolean;
  views: number;
  upvotes: number;
  isUpvoted: boolean;
}

interface CommunityStore {
  // State
  communities: Community[];
  joinedCommunities: Community[];
  currentCommunity: Community | null;
  followedUsers: Set<string>;
  onlineUsers: OnlineUser[];

  // Actions
  addCommunity: (community: Omit<Community, 'id' | 'createdAt' | 'isJoined'>) => void;
  joinCommunity: (communityId: string) => void;
  leaveCommunity: (communityId: string) => void;
  setCurrentCommunity: (community: Community | null) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  addPost: (communityId: string, post: Omit<CommunityPost, 'id' | 'timestamp'>) => void;
  likePost: (communityId: string, postId: string) => void;
  addProject: (communityId: string, project: Omit<CommunityProject, 'id' | 'createdAt'>) => void;
  addHackathon: (communityId: string, hackathon: Omit<Hackathon, 'id'>) => void;
  addQuery: (communityId: string, query: Omit<Query, 'id' | 'timestamp'>) => void;
  joinEvent: (communityId: string, eventId: string) => void;
  joinHackathon: (communityId: string, hackathonId: string) => void;
  markInterested: (communityId: string, projectId: string) => void;
  upvoteQuery: (communityId: string, queryId: string) => void;
  updateCommunityStats: (communityId: string) => void;

  // New chat and real-time features
  sendMessage: (communityId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  pinMessage: (communityId: string, messageId: string) => void;
  unpinMessage: (communityId: string, messageId: string) => void;
  reactToMessage: (communityId: string, messageId: string, emoji: string, userId: string) => void;
  setUserOnlineStatus: (userId: string, status: 'online' | 'away' | 'busy') => void;
  updateOnlineUsers: (communityId: string, users: OnlineUser[]) => void;
  pinPost: (communityId: string, postId: string) => void;
  unpinPost: (communityId: string, postId: string) => void;
  addReaction: (communityId: string, postId: string, emoji: string, userId: string) => void;
  uploadFile: (communityId: string, file: File) => Promise<string>;
  getAllUpcomingEvents: () => CommunityEvent[];
}

// Sample data for development
const sampleCommunities: Community[] = [
  {
    id: '1',
    name: 'React Developers Hub',
    description: 'A community for React developers to share knowledge, collaborate on projects, and grow together.',
    category: 'tech',
    privacy: 'public',
    image: '/placeholder.svg',
    rules: [
      'Be respectful and professional',
      'No spam or promotional content',
      'Help others when possible',
      'Share useful resources'
    ],
    tags: ['react', 'javascript', 'frontend', 'web-development'],
    location: 'Global',
    goals: 'Connect React developers worldwide and foster knowledge sharing',
    createdAt: '2024-01-15T10:00:00Z',
    members: 1247,
    posts: 89,
    isOwner: false,
    isJoined: true,
    domain: 'software-dev',
    lastActivity: new Date().toISOString(),
    membersList: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        title: 'Senior React Developer',
        avatar: 'RK',
        isFollowed: true,
        lastActive: '2 hours ago',
        joinedAt: '2024-01-16T08:00:00Z',
        role: 'member',
        isOnline: true,
        status: 'online',
        skills: ['React', 'TypeScript', 'Node.js'],
        connections: ['2', '3']
      },
      {
        id: '2',
        name: 'Priya Sharma',
        title: 'Frontend Architect',
        avatar: 'PS',
        isFollowed: false,
        lastActive: '1 hour ago',
        joinedAt: '2024-01-20T12:30:00Z',
        role: 'admin',
        isOnline: true,
        status: 'online',
        skills: ['React', 'Vue.js', 'Design Systems'],
        connections: ['1', '4']
      }
    ],
    onlineUsers: [
      { id: '1', name: 'Rajesh Kumar', avatar: 'RK', status: 'online', lastSeen: new Date().toISOString() },
      { id: '2', name: 'Priya Sharma', avatar: 'PS', status: 'online', lastSeen: new Date().toISOString() }
    ],
    recentPosts: [],
    chatMessages: [
      {
        id: '1',
        senderId: '1',
        senderName: 'Rajesh Kumar',
        senderAvatar: 'RK',
        content: 'Hey everyone! Just finished implementing the new React 18 features in our project. Happy to share insights!',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'text',
        reactions: [{ emoji: '👍', users: ['2'] }],
        isPinned: false,
        isEdited: false
      }
    ],
    pinnedMessages: [],
    events: [
      {
        id: '1',
        title: 'React 18 Deep Dive Workshop',
        description: 'Learn about React 18 new features and concurrent rendering',
        date: '2024-02-15',
        time: '18:00',
        type: 'workshop',
        attendees: 45,
        maxAttendees: 100,
        isAttending: false
      }
    ],
    projects: [
      {
        id: '1',
        title: 'Open Source Dashboard',
        description: 'Building a modern admin dashboard with React and TypeScript',
        author: {
          id: '1',
          name: 'Rajesh Kumar',
          title: 'Senior React Developer',
          avatar: 'RK',
          isFollowed: true,
          lastActive: '2 hours ago',
          joinedAt: '2024-01-16T08:00:00Z',
          role: 'member'
        },
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        lookingFor: ['Backend Developer', 'UI/UX Designer'],
        github: 'https://github.com/example/dashboard',
        createdAt: '2024-02-01T10:00:00Z',
        interested: 12,
        isInterested: false
      }
    ],
    hackathons: [
      {
        id: '1',
        title: 'React Hackathon 2024',
        description: 'Build innovative React applications in 48 hours',
        organizer: {
          id: '2',
          name: 'Priya Sharma',
          title: 'Frontend Architect',
          avatar: 'PS',
          isFollowed: false,
          lastActive: '1 hour ago',
          joinedAt: '2024-01-20T12:30:00Z',
          role: 'admin'
        },
        startDate: '2024-03-15T09:00:00Z',
        endDate: '2024-03-17T18:00:00Z',
        prize: '$5000 + MacBook Pro',
        participants: 124,
        maxParticipants: 200,
        isParticipating: false,
        registrationDeadline: '2024-03-10T23:59:59Z',
        technologies: ['React', 'JavaScript', 'TypeScript'],
        difficulty: 'intermediate'
      }
    ],
    queries: [
      {
        id: '1',
        title: 'How to optimize React app performance?',
        content: 'I\'m working on a large React application and noticing performance issues. What are the best practices for optimization?',
        author: {
          id: '3',
          name: 'Amit Singh',
          title: 'Junior Developer',
          avatar: 'AS',
          isFollowed: false,
          lastActive: '30 minutes ago',
          joinedAt: '2024-02-01T14:00:00Z',
          role: 'member'
        },
        timestamp: '2024-02-10T15:30:00Z',
        tags: ['performance', 'optimization', 'react'],
        answers: 5,
        isAnswered: true,
        views: 67,
        upvotes: 12,
        isUpvoted: false
      }
    ]
  },
  {
    id: '2',
    name: 'AI & Machine Learning',
    description: 'Explore the latest in AI and ML technologies, share research, and collaborate on cutting-edge projects.',
    category: 'data',
    privacy: 'public',
    rules: [
      'Share credible sources',
      'Respect different approaches',
      'Help beginners learn',
      'No plagiarism'
    ],
    tags: ['ai', 'machine-learning', 'python', 'deep-learning'],
    location: 'Bangalore, India',
    goals: 'Advance AI research and practical applications',
    createdAt: '2024-01-10T14:30:00Z',
    members: 892,
    posts: 156,
    isOwner: false,
    isJoined: false,
    domain: 'data-science',
    lastActivity: new Date(Date.now() - 7200000).toISOString(),
    membersList: [],
    onlineUsers: [],
    recentPosts: [],
    events: [
      {
        id: '2',
        title: 'AI Ethics Workshop',
        description: 'Discussing ethical implications of AI in modern society',
        date: '2024-02-20',
        time: '19:00',
        type: 'workshop',
        attendees: 120,
        maxAttendees: 150,
        isAttending: false
      }
    ],
    projects: [],
    hackathons: [],
    queries: [],
    chatMessages: [],
    pinnedMessages: []
  }
];

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set, get) => ({
      // Initial state
      communities: sampleCommunities,
      joinedCommunities: sampleCommunities.filter(c => c.isJoined),
      currentCommunity: null,
      followedUsers: new Set(['1']),
      onlineUsers: [],

      // Actions
      addCommunity: (communityData) => {
        const newCommunity: Community = {
          ...communityData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isJoined: true,
          membersList: [],
          recentPosts: [],
          events: [],
          projects: [],
          hackathons: [],
          queries: []
        };

        set((state) => ({
          communities: [newCommunity, ...state.communities],
          joinedCommunities: [newCommunity, ...state.joinedCommunities]
        }));
      },

      joinCommunity: (communityId) => {
        set((state) => {
          const updatedCommunities = state.communities.map(community =>
            community.id === communityId
              ? { ...community, isJoined: true, members: community.members + 1, lastActivity: new Date().toISOString() }
              : community
          );

          const joinedCommunity = updatedCommunities.find(c => c.id === communityId);
          const updatedJoinedCommunities = joinedCommunity
            ? [...state.joinedCommunities, joinedCommunity]
            : state.joinedCommunities;

          return {
            communities: updatedCommunities,
            joinedCommunities: updatedJoinedCommunities
          };
        });
      },

      leaveCommunity: (communityId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? { ...community, isJoined: false, members: Math.max(0, community.members - 1) }
              : community
          ),
          joinedCommunities: state.joinedCommunities.filter(c => c.id !== communityId)
        }));
      },

      setCurrentCommunity: (community) => {
        set({ currentCommunity: community });
      },

      followUser: (userId) => {
        set((state) => ({
          followedUsers: new Set([...state.followedUsers, userId])
        }));
      },

      unfollowUser: (userId) => {
        set((state) => {
          const newFollowedUsers = new Set(state.followedUsers);
          newFollowedUsers.delete(userId);
          return { followedUsers: newFollowedUsers };
        });
      },

      addPost: (communityId, postData) => {
        const newPost: CommunityPost = {
          ...postData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
        };

        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? { 
                  ...community, 
                  recentPosts: [newPost, ...community.recentPosts],
                  posts: community.posts + 1
                }
              : community
          )
        }));
      },

      likePost: (communityId, postId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  recentPosts: community.recentPosts.map(post =>
                    post.id === postId
                      ? { 
                          ...post, 
                          isLiked: !post.isLiked,
                          likes: post.isLiked ? post.likes - 1 : post.likes + 1
                        }
                      : post
                  )
                }
              : community
          )
        }));
      },

      addProject: (communityId, projectData) => {
        const newProject: CommunityProject = {
          ...projectData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? { ...community, projects: [newProject, ...community.projects] }
              : community
          )
        }));
      },

      addHackathon: (communityId, hackathonData) => {
        const newHackathon: Hackathon = {
          ...hackathonData,
          id: Date.now().toString()
        };

        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? { ...community, hackathons: [newHackathon, ...community.hackathons] }
              : community
          )
        }));
      },

      addQuery: (communityId, queryData) => {
        const newQuery: Query = {
          ...queryData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
        };

        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? { ...community, queries: [newQuery, ...community.queries] }
              : community
          )
        }));
      },

      joinEvent: (communityId, eventId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  events: community.events.map(event =>
                    event.id === eventId
                      ? { 
                          ...event, 
                          isAttending: !event.isAttending,
                          attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
                        }
                      : event
                  )
                }
              : community
          )
        }));
      },

      joinHackathon: (communityId, hackathonId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  hackathons: community.hackathons.map(hackathon =>
                    hackathon.id === hackathonId
                      ? { 
                          ...hackathon, 
                          isParticipating: !hackathon.isParticipating,
                          participants: hackathon.isParticipating ? hackathon.participants - 1 : hackathon.participants + 1
                        }
                      : hackathon
                  )
                }
              : community
          )
        }));
      },

      markInterested: (communityId, projectId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  projects: community.projects.map(project =>
                    project.id === projectId
                      ? { 
                          ...project, 
                          isInterested: !project.isInterested,
                          interested: project.isInterested ? project.interested - 1 : project.interested + 1
                        }
                      : project
                  )
                }
              : community
          )
        }));
      },

      upvoteQuery: (communityId, queryId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  queries: community.queries.map(query =>
                    query.id === queryId
                      ? { 
                          ...query, 
                          isUpvoted: !query.isUpvoted,
                          upvotes: query.isUpvoted ? query.upvotes - 1 : query.upvotes + 1
                        }
                      : query
                  )
                }
              : community
          )
        }));
      },

      updateCommunityStats: (communityId) => {
        // This would typically sync with backend
        // For now, we'll just trigger a re-render
        set((state) => ({ ...state }));
      },

      // New chat and real-time features
      sendMessage: (communityId, messageData) => {
        const newMessage: ChatMessage = {
          ...messageData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
        };

        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  chatMessages: [...community.chatMessages, newMessage],
                  lastActivity: new Date().toISOString()
                }
              : community
          )
        }));
      },

      pinMessage: (communityId, messageId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  chatMessages: community.chatMessages.map(msg =>
                    msg.id === messageId ? { ...msg, isPinned: true } : msg
                  ),
                  pinnedMessages: [
                    ...community.pinnedMessages,
                    community.chatMessages.find(msg => msg.id === messageId)!
                  ]
                }
              : community
          )
        }));
      },

      unpinMessage: (communityId, messageId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  chatMessages: community.chatMessages.map(msg =>
                    msg.id === messageId ? { ...msg, isPinned: false } : msg
                  ),
                  pinnedMessages: community.pinnedMessages.filter(msg => msg.id !== messageId)
                }
              : community
          )
        }));
      },

      reactToMessage: (communityId, messageId, emoji, userId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  chatMessages: community.chatMessages.map(msg =>
                    msg.id === messageId
                      ? {
                          ...msg,
                          reactions: msg.reactions.map(reaction =>
                            reaction.emoji === emoji
                              ? {
                                  ...reaction,
                                  users: reaction.users.includes(userId)
                                    ? reaction.users.filter(id => id !== userId)
                                    : [...reaction.users, userId]
                                }
                              : reaction
                          ).filter(reaction => reaction.users.length > 0)
                            .concat(
                              msg.reactions.find(r => r.emoji === emoji) ? [] : [{ emoji, users: [userId] }]
                            )
                        }
                      : msg
                  )
                }
              : community
          )
        }));
      },

      setUserOnlineStatus: (userId, status) => {
        set((state) => ({
          onlineUsers: state.onlineUsers.map(user =>
            user.id === userId ? { ...user, status, lastSeen: new Date().toISOString() } : user
          )
        }));
      },

      updateOnlineUsers: (communityId, users) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? { ...community, onlineUsers: users }
              : community
          )
        }));
      },

      pinPost: (communityId, postId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  recentPosts: community.recentPosts.map(post =>
                    post.id === postId ? { ...post, isPinned: true } : post
                  )
                }
              : community
          )
        }));
      },

      unpinPost: (communityId, postId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  recentPosts: community.recentPosts.map(post =>
                    post.id === postId ? { ...post, isPinned: false } : post
                  )
                }
              : community
          )
        }));
      },

      addReaction: (communityId, postId, emoji, userId) => {
        set((state) => ({
          communities: state.communities.map(community =>
            community.id === communityId
              ? {
                  ...community,
                  recentPosts: community.recentPosts.map(post =>
                    post.id === postId
                      ? {
                          ...post,
                          reactions: post.reactions.map(reaction =>
                            reaction.emoji === emoji
                              ? {
                                  ...reaction,
                                  count: reaction.users.includes(userId) ? reaction.count - 1 : reaction.count + 1,
                                  users: reaction.users.includes(userId)
                                    ? reaction.users.filter(id => id !== userId)
                                    : [...reaction.users, userId]
                                }
                              : reaction
                          ).filter(reaction => reaction.count > 0)
                            .concat(
                              post.reactions.find(r => r.emoji === emoji) ? [] : [{ emoji, count: 1, users: [userId] }]
                            )
                        }
                      : post
                  )
                }
              : community
          )
        }));
      },

      uploadFile: async (communityId, file) => {
        // Simulate file upload - in real app this would upload to cloud storage
        return new Promise((resolve) => {
          setTimeout(() => {
            const fileUrl = URL.createObjectURL(file);
            resolve(fileUrl);
          }, 1000);
        });
      },

      getAllUpcomingEvents: () => {
        const { joinedCommunities } = get();
        const allEvents: CommunityEvent[] = [];

        joinedCommunities.forEach(community => {
          community.events.forEach(event => {
            allEvents.push(event);
          });
        });

        return allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }
    }),
    {
      name: 'community-store',
      partialize: (state) => ({
        communities: state.communities,
        joinedCommunities: state.joinedCommunities,
        followedUsers: Array.from(state.followedUsers),
        onlineUsers: state.onlineUsers
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.followedUsers = new Set(state.followedUsers as any);
          // Simulate some users being online
          state.onlineUsers = state.onlineUsers || [];
        }
      }
    }
  )
);
