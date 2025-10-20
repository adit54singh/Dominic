# Backend Setup Guide - Dominic

This guide explains how to set up the backend with Google OAuth, SQLite database, and real-time Socket.io updates.

## Architecture Overview

The backend is built with:
- **Express.js** - API server
- **SQLite** - File-based database (no subscription needed)
- **Passport.js** - Google OAuth authentication
- **Socket.io** - Real-time, user-specific updates
- **TypeScript** - Type-safe backend code

### CAP Theorem Implementation
The system prioritizes **Consistency + Availability** by:
- Using Socket.io for real-time, per-user updates
- Storing all data in SQLite with immediate persistence
- Maintaining user-specific rooms for isolated updates
- Fallback to HTTP for critical operations

---

## Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Select "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:8080/api/auth/google/callback` (development)
   - Your production domain + `/api/auth/google/callback`
7. Copy your **Client ID** and **Client Secret**

---

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your values:
   ```env
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback
   SESSION_SECRET=your-random-secret-key
   PORT=3000
   NODE_ENV=development
   ```

---

## Step 3: Database

The database is automatically created on first run:
- **Location**: `dominic.db` (in project root)
- **Type**: SQLite3 (file-based, no server needed)

### Database Tables

#### users
Stores user profiles and account information.

#### projects
User projects with progress tracking.

#### communities
Community hub information and metadata.

#### user_communities
Join table linking users to communities they've joined.

#### activities
Real-time activity log for each user.

#### follows
User follow relationships.

#### sessions
Express session storage.

---

## Step 4: Authentication Flow

### Login
1. User clicks "Sign In with Google"
2. Redirected to Google OAuth consent screen
3. Google redirects back to `/api/auth/google/callback`
4. User data saved to database
5. Session established via Passport.js
6. Frontend receives authenticated user

### Real-time Connection
Once authenticated:
1. Frontend connects to Socket.io with user ID
2. Joins user-specific room: `user:{userId}`
3. Receives real-time updates for:
   - Activities
   - Project updates
   - Community changes
   - Follow events

### Logout
1. Session destroyed
2. Socket.io connection closed
3. Redirected to home page

---

## Step 5: API Endpoints

### Authentication
- `GET /api/auth/google` - Start Google OAuth flow
- `GET /api/auth/google/callback` - OAuth callback (automatic)
- `GET /api/auth/user` - Get current user (public)
- `POST /api/auth/logout` - Logout (requires auth)

### User Profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/projects` - List user's projects
- `POST /api/user/projects` - Create new project
- `GET /api/user/communities` - List joined communities
- `POST /api/user/communities/join` - Join a community
- `POST /api/user/communities/leave` - Leave a community
- `GET /api/user/activity` - Get activity log
- `POST /api/user/activity` - Log an activity
- `POST /api/user/follow` - Follow a user
- `POST /api/user/unfollow` - Unfollow a user

---

## Step 6: Real-time Socket Events

### Client → Server
```javascript
// Log activity
socket.emit('activity', {
  type: 'project_joined',
  action: 'Joined project: React App',
  details: 'Collaborative frontend project'
});

// Update project progress
socket.emit('project:update', {
  projectId: 'project-123',
  progress: 75,
  status: 'in-progress'
});

// Join community
socket.emit('community:join', { communityId: 'react-123' });

// Follow user
socket.emit('user:follow', { followingId: 'user-456' });

// Sync data
socket.emit('data:sync', { type: 'all' }); // or 'projects', 'communities', 'activity'
```

### Server → Client
```javascript
// Activity added (real-time)
socket.on('activity:new', (activity) => {
  console.log('New activity:', activity);
});

// Project updated (real-time)
socket.on('project:updated', (project) => {
  console.log('Project updated:', project);
});

// Community joined
socket.on('community:joined', (community) => {
  console.log('Joined community:', community);
});

// Being followed
socket.on('user:followed', (data) => {
  console.log('Followed by:', data.followerId);
});

// Data synced
socket.on('data:synced', (syncData) => {
  console.log('Data synced:', syncData);
});
```

---

## Step 7: Running the Application

### Development
```bash
# Install dependencies (if not already done)
pnpm install

# Start dev server (frontend + backend)
pnpm dev
```

The app will be available at `http://localhost:8080`

### Production Build
```bash
# Build frontend and backend
pnpm build

# Start production server
pnpm start
```

---

## Monitoring Real-time Updates

### Frontend (useAuth Hook)
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, activities, projects, communities, socket } = useAuth();

  useEffect(() => {
    if (socket) {
      socket.on('activity:new', (activity) => {
        console.log('Activity:', activity);
      });
    }
  }, [socket]);

  return (
    <div>
      <h1>Logged in as: {user?.name}</h1>
      <p>Activities: {activities.length}</p>
      <p>Projects: {projects.length}</p>
    </div>
  );
}
```

---

## Troubleshooting

### "Cannot connect to database"
- Check if `dominic.db` exists in project root
- Ensure write permissions in project directory

### "Google OAuth callback not working"
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Confirm redirect URL matches Google Cloud configuration
- Check that `GOOGLE_CALLBACK_URL` matches your domain

### "Socket.io connection fails"
- Ensure Socket.io is properly initialized in both frontend and backend
- Check browser console for connection errors
- Verify user is authenticated before connecting

### "Real-time updates not working"
- Check user ID is passed to Socket.io auth
- Verify user room: `user:{userId}` is being joined
- Monitor Socket.io events in browser DevTools

---

## Security Best Practices

1. ✅ **Environment Variables**: Never commit secrets to git
2. ✅ **HTTPS in Production**: Always use HTTPS for OAuth
3. ✅ **Session Security**: `SESSION_SECRET` must be random and long
4. ✅ **CORS**: Configured to accept only your domain
5. ✅ **Authentication Middleware**: All protected routes require `isAuthenticated`
6. ✅ **User Isolation**: Real-time updates only sent to authenticated users in their room

---

## File Structure

```
server/
├── index.ts           # Main Express app setup
├── db.ts              # SQLite database initialization
├── auth.ts            # Google OAuth strategy
├── socket.ts          # Socket.io configuration
├── node-build.ts      # Production server entry
└── routes/
    ├── auth.ts        # Authentication endpoints
    └── demo.ts        # Demo endpoint

client/
├── contexts/
│   └── AuthContext.tsx    # Auth state + Socket.io connection
├── components/
│   └── NavBar.tsx         # Updated with login/logout
└── App.tsx                # Wrapped with AuthProvider
```

---

## Next Steps

1. Implement user onboarding flow
2. Create additional API endpoints for projects/communities
3. Add database backup/export functionality
4. Deploy to production
5. Set up monitoring and logging

---

## Support

For issues or questions:
- Check browser console for errors
- Look at server logs
- Verify environment variables are set
- Test Socket.io connection with browser DevTools
