/**
 * ML Recommendation System
 * Uses vector similarity (cosine similarity) to recommend communities and users
 * Based on skills, domains, and technology stack similarity
 */

/**
 * User Profile Vector - represents a user's profile as a feature vector
 */
export interface UserProfileVector {
  userId: string;
  skills: Record<string, number>;
  domains: Record<string, number>;
  goals: Record<string, number>;
  allTerms: string[];
}

/**
 * Recommendation Result
 */
export interface Recommendation {
  id: string;
  name: string;
  description: string;
  similarity: number;
  reason: string;
  category: string;
}

/**
 * Common skills and technologies across all platforms
 */
const COMMON_TERMS = {
  skills: [
    "javascript",
    "python",
    "java",
    "c++",
    "react",
    "node.js",
    "django",
    "flask",
    "machine learning",
    "data analysis",
    "ui/ux design",
    "mobile development",
    "devops",
    "cloud computing",
    "cybersecurity",
    "blockchain",
    "flutter",
    "swift",
    "kotlin",
    "typescript",
    "mongodb",
    "postgresql",
    "aws",
    "docker",
  ],
  domains: [
    "software-dev",
    "web-dev",
    "mobile-dev",
    "data-science",
    "design",
    "cloud-computing",
    "blockchain",
    "devops",
    "cybersecurity",
    "game-dev",
    "iot",
    "robotics",
    "ar-vr",
    "quantum-computing",
  ],
  goals: [
    "get placed in faang companies",
    "build my own startup",
    "improve coding skills",
    "learn new technologies",
    "build impressive projects",
    "increase leetcode rating",
    "find study partners",
    "get mentorship",
    "build professional network",
    "contribute to open source",
  ],
};

/**
 * Create a user profile vector from raw user data
 */
export function createUserProfileVector(userData: {
  userId: string;
  skills: string[];
  domains: string[];
  goals: string[];
  experience?: string;
}): UserProfileVector {
  const skillVector: Record<string, number> = {};
  const domainVector: Record<string, number> = {};
  const goalVector: Record<string, number> = {};

  // Process skills
  userData.skills.forEach((skill) => {
    const normalized = skill.toLowerCase().trim();
    skillVector[normalized] = (skillVector[normalized] || 0) + 1;
  });

  // Process domains
  userData.domains.forEach((domain) => {
    const normalized = domain.toLowerCase().trim();
    domainVector[normalized] = (domainVector[normalized] || 0) + 1;
  });

  // Process goals
  userData.goals.forEach((goal) => {
    const normalized = goal.toLowerCase().trim();
    goalVector[normalized] = (goalVector[normalized] || 0) + 1;
  });

  // Add experience level as a factor
  if (userData.experience) {
    const expWeight =
      userData.experience.toLowerCase() === "beginner"
        ? 0.5
        : userData.experience.toLowerCase() === "intermediate"
          ? 1.0
          : 1.5;
    for (const skill in skillVector) {
      skillVector[skill] *= expWeight;
    }
  }

  const allTerms = Array.from(
    new Set([
      ...Object.keys(skillVector),
      ...Object.keys(domainVector),
      ...Object.keys(goalVector),
    ]),
  );

  return {
    userId: userData.userId,
    skills: skillVector,
    domains: domainVector,
    goals: goalVector,
    allTerms,
  };
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(
  vec1: Record<string, number>,
  vec2: Record<string, number>,
): number {
  const allKeys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  allKeys.forEach((key) => {
    const v1 = vec1[key] || 0;
    const v2 = vec2[key] || 0;
    dotProduct += v1 * v2;
    magnitude1 += v1 * v1;
    magnitude2 += v2 * v2;
  });

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
}

/**
 * Calculate Jaccard similarity (for categorical data like domains, goals)
 */
function jaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

/**
 * Calculate overall similarity between two user profiles
 */
export function calculateProfileSimilarity(
  userVector1: UserProfileVector,
  userVector2: UserProfileVector,
): number {
  const skillSimilarity = cosineSimilarity(
    userVector1.skills,
    userVector2.skills,
  );
  const domainSet1 = new Set(Object.keys(userVector1.domains));
  const domainSet2 = new Set(Object.keys(userVector2.domains));
  const domainSimilarity = jaccardSimilarity(domainSet1, domainSet2);
  const goalSet1 = new Set(Object.keys(userVector1.goals));
  const goalSet2 = new Set(Object.keys(userVector2.goals));
  const goalSimilarity = jaccardSimilarity(goalSet1, goalSet2);

  // Weighted average: skills are most important (50%), domains (30%), goals (20%)
  return skillSimilarity * 0.5 + domainSimilarity * 0.3 + goalSimilarity * 0.2;
}

/**
 * Find matching communities based on user profile
 */
export function findMatchingCommunities(
  userVector: UserProfileVector,
  communities: Array<{
    id: string;
    name: string;
    description: string;
    domain: string;
    tags: string[];
  }>,
  topN: number = 5,
): Recommendation[] {
  const scores = communities
    .map((community) => {
      const communityDomainNorm = community.domain.toLowerCase().trim();
      const domainMatch = userVector.domains[communityDomainNorm] || 0;

      // Check skill overlap
      const communityTags = community.tags.map((t) => t.toLowerCase().trim());
      const skillMatches = communityTags.filter(
        (tag) => userVector.skills[tag],
      ).length;
      const skillScore = skillMatches / Math.max(communityTags.length, 1);

      // Overall score: domain match is primary, skills are secondary
      const score =
        (domainMatch > 0 ? 0.6 : 0) +
        skillScore * 0.4 +
        (skillMatches > 0 ? 0.1 : 0);

      const reasons: string[] = [];
      if (domainMatch > 0) {
        reasons.push(`matches your interest in ${community.domain}`);
      }
      if (skillMatches > 0) {
        reasons.push(
          `relevant to your skills: ${communityTags.slice(0, 2).join(", ")}`,
        );
      }

      return {
        id: community.id,
        name: community.name,
        description: community.description,
        similarity: Math.min(score, 1),
        reason: reasons.join(" and ") || "relevant community",
        category: "community" as const,
      };
    })
    .filter((rec) => rec.similarity > 0.1)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);

  return scores;
}

/**
 * Find matching users based on profile similarity
 */
export function findMatchingUsers(
  userVector: UserProfileVector,
  otherUsers: Array<{
    id: string;
    name: string;
    avatar: string;
    bio: string;
    skills: string[];
    domains: string[];
    goals: string[];
    experience: string;
  }>,
  topN: number = 5,
): Recommendation[] {
  const scores = otherUsers
    .filter((user) => user.id !== userVector.userId)
    .map((user) => {
      const otherVector = createUserProfileVector({
        userId: user.id,
        skills: user.skills,
        domains: user.domains,
        goals: user.goals,
        experience: user.experience,
      });

      const similarity = calculateProfileSimilarity(userVector, otherVector);

      // Find common elements for reasoning
      const commonSkills = userVector.allTerms.filter((term) =>
        otherVector.allTerms.includes(term),
      );
      const commonDomains = Object.keys(userVector.domains).filter((d) =>
        Object.keys(otherVector.domains).includes(d),
      );
      const commonGoals = Object.keys(userVector.goals).filter((g) =>
        Object.keys(otherVector.goals).includes(g),
      );

      const reasons: string[] = [];
      if (commonSkills.length > 0) {
        reasons.push(
          `shares your skills: ${commonSkills.slice(0, 2).join(", ")}`,
        );
      }
      if (commonDomains.length > 0) {
        reasons.push(`interested in ${commonDomains.slice(0, 2).join(", ")}`);
      }
      if (commonGoals.length > 0) {
        reasons.push(`has similar goals`);
      }

      return {
        id: user.id,
        name: user.name,
        description: user.bio || "Passionate developer",
        similarity,
        reason: reasons.join(" and ") || "similar profile",
        category: "user" as const,
      };
    })
    .filter((rec) => rec.similarity > 0.15)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);

  return scores;
}

/**
 * Normalize term for comparison
 */
export function normalizeTerm(term: string): string {
  return term
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "");
}

/**
 * Rank recommendations with additional weighting
 */
export function rankRecommendations(
  recommendations: Recommendation[],
  userPreferences?: {
    preferredExperience?: string;
    preferredDomains?: string[];
  },
): Recommendation[] {
  return recommendations
    .map((rec) => {
      let bonus = 0;

      if (userPreferences?.preferredDomains) {
        if (
          userPreferences.preferredDomains.some((d) => rec.reason.includes(d))
        ) {
          bonus += 0.1;
        }
      }

      return {
        ...rec,
        similarity: Math.min(rec.similarity + bonus, 1),
      };
    })
    .sort((a, b) => b.similarity - a.similarity);
}
