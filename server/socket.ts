import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { runQuery, getQuery, allQuery } from './db';

const userSockets = new Map<string, Set<string>>(); // userId -> Set of socketIds

export const setupSocket = (httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: ['http://localhost:8080', 'http://localhost:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Middleware to check authentication
  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error('Authentication required'));
    }
    socket.data.userId = userId;
    next();
  });

  io.on('connection', (socket: Socket) => {
    const userId = socket.data.userId;

    // Track user's sockets
    if (!userSockets.has(userId)) {
      userSockets.set(userId, new Set());
    }
    userSockets.get(userId)!.add(socket.id);

    console.log(`User ${userId} connected with socket ${socket.id}`);

    // Join user-specific room
    socket.join(`user:${userId}`);

    // Activity broadcast - send to specific user
    socket.on('activity', async (data) => {
      try {
        const { type, action, details } = data;
        const { v4: uuidv4 } = require('uuid');
        const activityId = uuidv4();

        // Save to database
        await runQuery(
          `INSERT INTO activities (id, user_id, type, action, details, timestamp)
           VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
          [activityId, userId, type, action, details]
        );

        // Emit to user's sockets only
        io.to(`user:${userId}`).emit('activity:new', {
          id: activityId,
          user_id: userId,
          type,
          action,
          details,
          timestamp: new Date().toISOString(),
        });

        socket.emit('activity:ack', { id: activityId });
      } catch (error) {
        console.error('Error saving activity:', error);
        socket.emit('error', { message: 'Failed to save activity' });
      }
    });

    // Real-time project updates
    socket.on('project:update', async (data) => {
      try {
        const { projectId, progress, status } = data;

        await runQuery(
          `UPDATE projects 
           SET progress = ?, status = ?, updated_at = CURRENT_TIMESTAMP
           WHERE id = ? AND user_id = ?`,
          [progress, status, projectId, userId]
        );

        const project = await getQuery('SELECT * FROM projects WHERE id = ?', [projectId]);

        // Emit to user's sockets only
        io.to(`user:${userId}`).emit('project:updated', project);
      } catch (error) {
        console.error('Error updating project:', error);
        socket.emit('error', { message: 'Failed to update project' });
      }
    });

    // Community join event
    socket.on('community:join', async (data) => {
      try {
        const { communityId } = data;

        await runQuery(
          `INSERT OR IGNORE INTO user_communities (user_id, community_id, joined_at)
           VALUES (?, ?, CURRENT_TIMESTAMP)`,
          [userId, communityId]
        );

        const community = await getQuery(
          'SELECT * FROM communities WHERE id = ?',
          [communityId]
        );

        // Emit to user's sockets only
        io.to(`user:${userId}`).emit('community:joined', community);

        // Broadcast to community channel
        io.emit('community:member-joined', {
          communityId,
          userId,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error joining community:', error);
        socket.emit('error', { message: 'Failed to join community' });
      }
    });

    // User follow event
    socket.on('user:follow', async (data) => {
      try {
        const { followingId } = data;

        await runQuery(
          `INSERT OR IGNORE INTO follows (follower_id, following_id, created_at)
           VALUES (?, ?, CURRENT_TIMESTAMP)`,
          [userId, followingId]
        );

        // Emit to both users
        io.to(`user:${userId}`).emit('follow:success', { followingId });

        // Notify the followed user
        io.to(`user:${followingId}`).emit('user:followed', {
          followerId: userId,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error following user:', error);
        socket.emit('error', { message: 'Failed to follow user' });
      }
    });

    // Sync user data on demand
    socket.on('data:sync', async (data) => {
      try {
        const { type } = data; // 'projects', 'communities', 'activity', 'all'

        let syncData: any = {};

        if (type === 'all' || type === 'projects') {
          syncData.projects = await allQuery(
            'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
          );
        }

        if (type === 'all' || type === 'communities') {
          syncData.communities = await allQuery(
            `SELECT c.* FROM communities c
             INNER JOIN user_communities uc ON c.id = uc.community_id
             WHERE uc.user_id = ?
             ORDER BY uc.joined_at DESC`,
            [userId]
          );
        }

        if (type === 'all' || type === 'activity') {
          syncData.activity = await allQuery(
            'SELECT * FROM activities WHERE user_id = ? ORDER BY timestamp DESC LIMIT 50',
            [userId]
          );
        }

        socket.emit('data:synced', syncData);
      } catch (error) {
        console.error('Error syncing data:', error);
        socket.emit('error', { message: 'Failed to sync data' });
      }
    });

    socket.on('disconnect', () => {
      const sockets = userSockets.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          userSockets.delete(userId);
          console.log(`User ${userId} fully disconnected`);
        }
      }
    });
  });

  return io;
};

// Helper function to emit to specific user
export const emitToUser = (io: SocketIOServer, userId: string, event: string, data: any) => {
  io.to(`user:${userId}`).emit(event, data);
};

// Helper function to broadcast to all connected users
export const broadcastToAll = (io: SocketIOServer, event: string, data: any) => {
  io.emit(event, data);
};
