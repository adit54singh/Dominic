import { RequestHandler } from "express";
import passport from "passport";
import { getQuery, runQuery, allQuery } from "../db";

export const googleAuth: RequestHandler = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback: RequestHandler = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Authentication failed" });
    }
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login failed" });
      }
      res.redirect(`/?authenticated=true&user=${user.id}`);
    });
  })(req, res, next);
};

export const getCurrentUser: RequestHandler = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json(req.user);
};

export const logout: RequestHandler = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
};

export const updateUserProfile: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const {
      name,
      bio,
      location,
      company,
      title,
      skills,
      experience,
      domains,
      goals,
    } = req.body;
    const userId = (req.user as any).id;

    // Convert arrays to JSON strings if they're arrays
    const skillsJson = Array.isArray(skills) ? JSON.stringify(skills) : skills;
    const domainsJson = Array.isArray(domains)
      ? JSON.stringify(domains)
      : domains;
    const goalsJson = Array.isArray(goals) ? JSON.stringify(goals) : goals;

    await runQuery(
      `UPDATE users
       SET name = ?, bio = ?, location = ?, company = ?, title = ?, skills = ?, experience = ?, domains = ?, goals = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        name,
        bio,
        location,
        company,
        title,
        skillsJson,
        experience,
        domainsJson,
        goalsJson,
        userId,
      ],
    );

    const updatedUser = await getQuery("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const updateOnboardingProfile: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { skills, experience, domains, goals } = req.body;
    const userId = (req.user as any).id;

    // Convert arrays to JSON strings if they're arrays
    const skillsJson = Array.isArray(skills) ? JSON.stringify(skills) : skills;
    const domainsJson = Array.isArray(domains)
      ? JSON.stringify(domains)
      : domains;
    const goalsJson = Array.isArray(goals) ? JSON.stringify(goals) : goals;

    await runQuery(
      `UPDATE users
       SET skills = ?, experience = ?, domains = ?, goals = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [skillsJson, experience, domainsJson, goalsJson, userId],
    );

    const updatedUser = await getQuery("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating onboarding profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getUserProjects: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = (req.user as any).id;
    const projects = await allQuery(
      "SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );

    const formattedProjects = (projects as any[]).map((p) => ({
      ...p,
      tech_stack: p.tech_stack ? JSON.parse(p.tech_stack) : [],
    }));

    res.json(formattedProjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const createProject: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { title, description, domain, tech_stack, due_date } = req.body;
    const userId = (req.user as any).id;
    const projectId = require("uuid").v4();

    await runQuery(
      `INSERT INTO projects (id, user_id, title, description, domain, tech_stack, due_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [
        projectId,
        userId,
        title,
        description,
        domain,
        JSON.stringify(tech_stack || []),
        due_date,
      ],
    );

    const project = await getQuery("SELECT * FROM projects WHERE id = ?", [
      projectId,
    ]);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getUserCommunities: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = (req.user as any).id;
    const communities = await allQuery(
      `SELECT c.* FROM communities c
       INNER JOIN user_communities uc ON c.id = uc.community_id
       WHERE uc.user_id = ?
       ORDER BY uc.joined_at DESC`,
      [userId],
    );

    const formattedCommunities = (communities as any[]).map((c) => ({
      ...c,
      tags: c.tags ? JSON.parse(c.tags) : [],
      rules: c.rules ? JSON.parse(c.rules) : [],
    }));

    res.json(formattedCommunities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch communities" });
  }
};

export const joinCommunity: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { communityId } = req.body;
    const userId = (req.user as any).id;

    await runQuery(
      `INSERT OR IGNORE INTO user_communities (user_id, community_id, joined_at)
       VALUES (?, ?, CURRENT_TIMESTAMP)`,
      [userId, communityId],
    );

    res.json({ message: "Community joined successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to join community" });
  }
};

export const leaveCommunity: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { communityId } = req.body;
    const userId = (req.user as any).id;

    await runQuery(
      "DELETE FROM user_communities WHERE user_id = ? AND community_id = ?",
      [userId, communityId],
    );

    res.json({ message: "Community left successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to leave community" });
  }
};

export const getUserActivity: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = (req.user as any).id;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const activities = await allQuery(
      "SELECT * FROM activities WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?",
      [userId, limit],
    );

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};

export const addActivity: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { type, action, details } = req.body;
    const userId = (req.user as any).id;
    const activityId = require("uuid").v4();

    await runQuery(
      `INSERT INTO activities (id, user_id, type, action, details, timestamp)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [activityId, userId, type, action, details],
    );

    const activity = await getQuery("SELECT * FROM activities WHERE id = ?", [
      activityId,
    ]);
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to add activity" });
  }
};

export const followUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { followingId } = req.body;
    const userId = (req.user as any).id;

    await runQuery(
      `INSERT OR IGNORE INTO follows (follower_id, following_id, created_at)
       VALUES (?, ?, CURRENT_TIMESTAMP)`,
      [userId, followingId],
    );

    res.json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to follow user" });
  }
};

export const unfollowUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { followingId } = req.body;
    const userId = (req.user as any).id;

    await runQuery(
      "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
      [userId, followingId],
    );

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unfollow user" });
  }
};
