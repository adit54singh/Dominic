import { RequestHandler } from "express";
import { getQuery, allQuery } from "../db";
import {
  createUserProfileVector,
  findMatchingCommunities,
  findMatchingUsers,
  rankRecommendations,
} from "../ml";

/**
 * Get recommended communities for the current user
 */
export const getRecommendedCommunities: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = (req.user as any).id;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    // Get user profile
    const user = await getQuery("SELECT * FROM users WHERE id = ?", [userId]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Parse user data
    const skills = user.skills ? JSON.parse(user.skills) : [];
    const domains = user.domains ? JSON.parse(user.domains) : [];
    const goals = user.goals ? JSON.parse(user.goals) : [];
    const experience = user.experience || "intermediate";

    // Create user profile vector
    const userVector = createUserProfileVector({
      userId,
      skills,
      domains,
      goals,
      experience,
    });

    // Get all communities with their details
    const allCommunities = await allQuery("SELECT * FROM communities");
    const communitiesWithTags = (allCommunities as any[]).map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      domain: c.domain || "",
      tags: c.tags ? JSON.parse(c.tags) : [],
    }));

    // Get communities user has already joined
    const joinedCommunities = await allQuery(
      "SELECT community_id FROM user_communities WHERE user_id = ?",
      [userId],
    );
    const joinedIds = new Set(
      (joinedCommunities as any[]).map((c) => c.community_id),
    );

    // Filter out already joined communities
    const availableCommunities = communitiesWithTags.filter(
      (c) => !joinedIds.has(c.id),
    );

    // Find matching communities
    const recommendations = findMatchingCommunities(
      userVector,
      availableCommunities,
      limit,
    );

    // Rank and return
    const rankedRecommendations = rankRecommendations(recommendations, {
      preferredDomains: domains,
    });

    res.json({
      recommendations: rankedRecommendations,
      count: rankedRecommendations.length,
    });
  } catch (error) {
    console.error("Error getting community recommendations:", error);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};

/**
 * Get recommended users for the current user
 */
export const getRecommendedUsers: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = (req.user as any).id;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    // Get current user profile
    const user = await getQuery("SELECT * FROM users WHERE id = ?", [userId]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Parse user data
    const skills = user.skills ? JSON.parse(user.skills) : [];
    const domains = user.domains ? JSON.parse(user.domains) : [];
    const goals = user.goals ? JSON.parse(user.goals) : [];
    const experience = user.experience || "intermediate";

    // Create user profile vector
    const userVector = createUserProfileVector({
      userId,
      skills,
      domains,
      goals,
      experience,
    });

    // Get all other users
    const allUsers = await allQuery(
      "SELECT id, name, avatar, bio, skills, domains, goals, experience FROM users WHERE id != ?",
      [userId],
    );

    const otherUsers = (allUsers as any[]).map((u) => ({
      id: u.id,
      name: u.name,
      avatar: u.avatar,
      bio: u.bio || "",
      skills: u.skills ? JSON.parse(u.skills) : [],
      domains: u.domains ? JSON.parse(u.domains) : [],
      goals: u.goals ? JSON.parse(u.goals) : [],
      experience: u.experience || "intermediate",
    }));

    // Get users that current user is already following
    const followingList = await allQuery(
      "SELECT following_id FROM follows WHERE follower_id = ?",
      [userId],
    );
    const followingIds = new Set(
      (followingList as any[]).map((f) => f.following_id),
    );

    // Filter out already followed users
    const availableUsers = otherUsers.filter((u) => !followingIds.has(u.id));

    // Find matching users
    const recommendations = findMatchingUsers(
      userVector,
      availableUsers,
      limit,
    );

    // Rank and return
    const rankedRecommendations = rankRecommendations(recommendations, {
      preferredDomains: domains,
    });

    res.json({
      recommendations: rankedRecommendations,
      count: rankedRecommendations.length,
    });
  } catch (error) {
    console.error("Error getting user recommendations:", error);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};

/**
 * Get personalized dashboard recommendations (mix of communities and users)
 */
export const getPersonalizedRecommendations: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userId = (req.user as any).id;
    const communityLimit = req.query.communityLimit
      ? parseInt(req.query.communityLimit as string)
      : 3;
    const userLimit = req.query.userLimit
      ? parseInt(req.query.userLimit as string)
      : 3;

    // Get user profile
    const user = await getQuery("SELECT * FROM users WHERE id = ?", [userId]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Parse user data
    const skills = user.skills ? JSON.parse(user.skills) : [];
    const domains = user.domains ? JSON.parse(user.domains) : [];
    const goals = user.goals ? JSON.parse(user.goals) : [];
    const experience = user.experience || "intermediate";

    // Create user profile vector
    const userVector = createUserProfileVector({
      userId,
      skills,
      domains,
      goals,
      experience,
    });

    // Get communities recommendations
    const allCommunities = await allQuery("SELECT * FROM communities");
    const joinedCommunities = await allQuery(
      "SELECT community_id FROM user_communities WHERE user_id = ?",
      [userId],
    );
    const joinedIds = new Set(
      (joinedCommunities as any[]).map((c) => c.community_id),
    );

    const communitiesWithTags = (allCommunities as any[])
      .filter((c) => !joinedIds.has(c.id))
      .map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        domain: c.domain || "",
        tags: c.tags ? JSON.parse(c.tags) : [],
      }));

    const communityRecs = findMatchingCommunities(
      userVector,
      communitiesWithTags,
      communityLimit,
    );

    // Get user recommendations
    const allUsers = await allQuery(
      "SELECT id, name, avatar, bio, skills, domains, goals, experience FROM users WHERE id != ?",
      [userId],
    );
    const followingList = await allQuery(
      "SELECT following_id FROM follows WHERE follower_id = ?",
      [userId],
    );
    const followingIds = new Set(
      (followingList as any[]).map((f) => f.following_id),
    );

    const otherUsers = (allUsers as any[])
      .filter((u) => !followingIds.has(u.id))
      .map((u) => ({
        id: u.id,
        name: u.name,
        avatar: u.avatar,
        bio: u.bio || "",
        skills: u.skills ? JSON.parse(u.skills) : [],
        domains: u.domains ? JSON.parse(u.domains) : [],
        goals: u.goals ? JSON.parse(u.goals) : [],
        experience: u.experience || "intermediate",
      }));

    const userRecs = findMatchingUsers(userVector, otherUsers, userLimit);

    res.json({
      communities: rankRecommendations(communityRecs, {
        preferredDomains: domains,
      }),
      users: rankRecommendations(userRecs, { preferredDomains: domains }),
    });
  } catch (error) {
    console.error("Error getting personalized recommendations:", error);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};
