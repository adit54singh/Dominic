import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { handleDemo } from "./routes/demo";
import { initializeDatabase } from "./db";
import authPassport from "./auth";
import {
  googleAuth,
  googleAuthCallback,
  getCurrentUser,
  logout,
  updateUserProfile,
  getUserProjects,
  createProject,
  getUserCommunities,
  joinCommunity,
  leaveCommunity,
  getUserActivity,
  addActivity,
  followUser,
  unfollowUser,
} from "./routes/auth";
import {
  getRecommendedCommunities,
  getRecommendedUsers,
  getPersonalizedRecommendations,
} from "./routes/recommendations";

export async function createServer() {
  const app = express();

  // Initialize database
  await initializeDatabase();

  // Middleware
  app.use(
    cors({
      origin: ["http://localhost:8080", "http://localhost:5173"],
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
      },
    }),
  );

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Check authentication middleware
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: "Not authenticated" });
  };

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.get("/api/auth/google", googleAuth);
  app.get("/api/auth/google/callback", googleAuthCallback);
  app.get("/api/auth/user", getCurrentUser);
  app.post("/api/auth/logout", logout);

  // User routes
  app.put("/api/user/profile", isAuthenticated, updateUserProfile);
  app.get("/api/user/projects", isAuthenticated, getUserProjects);
  app.post("/api/user/projects", isAuthenticated, createProject);
  app.get("/api/user/communities", isAuthenticated, getUserCommunities);
  app.post("/api/user/communities/join", isAuthenticated, joinCommunity);
  app.post("/api/user/communities/leave", isAuthenticated, leaveCommunity);
  app.get("/api/user/activity", isAuthenticated, getUserActivity);
  app.post("/api/user/activity", isAuthenticated, addActivity);
  app.post("/api/user/follow", isAuthenticated, followUser);
  app.post("/api/user/unfollow", isAuthenticated, unfollowUser);

  // Recommendations routes (ML-based)
  app.get("/api/recommendations/communities", isAuthenticated, getRecommendedCommunities);
  app.get("/api/recommendations/users", isAuthenticated, getRecommendedUsers);
  app.get("/api/recommendations/personalized", isAuthenticated, getPersonalizedRecommendations);

  return app;
}
