import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  recentPosts: CommunityPost[];
  events: CommunityEvent[];
  projects: CommunityProject[];
  hackathons: Hackathon[];
  queries: Query[];
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
}

export interface CommunityPost {
  id: string;
  author: Member;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  type: 'general' | 'project' | 'hackathon' | 'query';
  tags: string[];
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
    membersList: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        title: 'Senior React Developer',
        avatar: 'RK',
        isFollowed: true,
        lastActive: '2 hours ago',
        joinedAt: '2024-01-16T08:00:00Z',
        role: 'member'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        title: 'Frontend Architect',
        avatar: 'PS',
        isFollowed: false,
        lastActive: '1 hour ago',
        joinedAt: '2024-01-20T12:30:00Z',
        role: 'admin'
      }
    ],
    recentPosts: [],
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
    membersList: [],
    recentPosts: [],
    events: [],
    projects: [],
    hackathons: [],
    queries: []
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
              ? { ...community, isJoined: true, members: community.members + 1 }
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
      }
    }),
    {
      name: 'community-store',
      partialize: (state) => ({
        communities: state.communities,
        joinedCommunities: state.joinedCommunities,
        followedUsers: Array.from(state.followedUsers)
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.followedUsers = new Set(state.followedUsers as any);
        }
      }
    }
  )
);
