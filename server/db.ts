import mysql from "mysql2/promise";

// Create MySQL connection pool
let pool: mysql.Pool | null = null;
let dbConnected = false;

export const initializeDatabase = async () => {
  try {
    const host = process.env.MYSQL_HOST || "localhost";
    const port = parseInt(process.env.MYSQL_PORT || "3306");
    const user = process.env.MYSQL_USER || "root";
    const database = process.env.MYSQL_DB || "dominic";

    console.log(`Attempting to connect to MySQL at ${host}:${port}...`);

    // Create connection pool
    pool = mysql.createPool({
      host,
      port,
      user,
      password: process.env.MYSQL_PASSWORD || "",
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelayMs: 0,
    });

    // Test connection
    try {
      const connection = await Promise.race([
        pool.getConnection(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Connection timeout")), 5000),
        ),
      ]);

      if (connection && typeof connection === "object" && "release" in connection) {
        await (connection as any).ping();
        (connection as any).release();
        dbConnected = true;
        console.log(`✓ Successfully connected to MySQL database: ${database}`);

        // Create tables
        await createTables();
        console.log("✓ Database tables initialized successfully");
      }
    } catch (connectionError) {
      dbConnected = false;
      console.error(
        `✗ Failed to connect to MySQL at ${host}:${port}`,
        connectionError instanceof Error ? connectionError.message : connectionError,
      );
      console.warn(
        "⚠ Database is offline. Make sure MySQL is running:",
        `  - Host: ${host}`,
        `  - Port: ${port}`,
        `  - User: ${user}`,
        `  - Database: ${database}`,
      );
      // Don't throw - let the app start anyway
      // Database operations will fail at runtime with clear errors
    }
  } catch (error) {
    console.error("Error during database initialization:", error);
    // Don't throw - let the app start anyway
  }
};

export const isDatabaseConnected = () => dbConnected;

const createTables = async () => {
  if (!pool) throw new Error("Database pool not initialized");

  const connection = await pool.getConnection();

  try {
    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        google_id VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        avatar LONGTEXT,
        bio TEXT,
        location VARCHAR(255),
        company VARCHAR(255),
        title VARCHAR(255),
        skills LONGTEXT,
        experience VARCHAR(50),
        domains LONGTEXT,
        goals LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_google_id (google_id)
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // Projects table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        domain VARCHAR(255),
        tech_stack LONGTEXT,
        status VARCHAR(50) DEFAULT 'active',
        progress INT DEFAULT 0,
        due_date DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id)
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // Communities table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS communities (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        domain VARCHAR(255),
        category VARCHAR(255),
        privacy VARCHAR(50) DEFAULT 'public',
        members INT DEFAULT 0,
        posts INT DEFAULT 0,
        rules LONGTEXT,
        tags LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_domain (domain)
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // User Communities table (many-to-many)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_communities (
        user_id VARCHAR(255) NOT NULL,
        community_id VARCHAR(255) NOT NULL,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, community_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // Activities table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS activities (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        action TEXT,
        details TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_timestamp (timestamp)
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // Follows table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS follows (
        follower_id VARCHAR(255) NOT NULL,
        following_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (follower_id, following_id),
        FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // Sessions table for express-session
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR(255) PRIMARY KEY,
        sess LONGTEXT NOT NULL,
        expire BIGINT NOT NULL,
        INDEX idx_expire (expire)
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export const runQuery = async (query: string, params: any[] = []) => {
  if (!pool) {
    const errorMsg =
      "Database pool not initialized. Make sure MySQL is running and environment variables are set.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (!dbConnected) {
    const errorMsg =
      "Database is not connected. Make sure MySQL server is running at the configured host and port.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const connection = await pool.getConnection();
    try {
      const result = await connection.execute(query, params);
      return {
        changes: result[0].affectedRows || 0,
        lastInsertId: result[0].insertId,
      };
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Query error:", error instanceof Error ? error.message : error, query);
    throw error;
  }
};

export const getQuery = async (query: string, params: any[] = []) => {
  if (!pool) {
    const errorMsg =
      "Database pool not initialized. Make sure MySQL is running and environment variables are set.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (!dbConnected) {
    const errorMsg =
      "Database is not connected. Make sure MySQL server is running at the configured host and port.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(query, params);
      const result = Array.isArray(rows) ? rows[0] : undefined;
      return result;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Query error:", error instanceof Error ? error.message : error, query);
    throw error;
  }
};

export const allQuery = async (query: string, params: any[] = []) => {
  if (!pool) {
    const errorMsg =
      "Database pool not initialized. Make sure MySQL is running and environment variables are set.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (!dbConnected) {
    const errorMsg =
      "Database is not connected. Make sure MySQL server is running at the configured host and port.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(query, params);
      return Array.isArray(rows) ? rows : [];
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Query error:", error instanceof Error ? error.message : error, query);
    throw error;
  }
};

// Keep old sync versions for backwards compatibility (they won't work, but this prevents crashes)
export const runQuerySync = (query: string, params: any[] = []) => {
  throw new Error(
    "Synchronous queries are not supported with MySQL. Use runQuery instead.",
  );
};

export const getQuerySync = (query: string, params: any[] = []) => {
  throw new Error(
    "Synchronous queries are not supported with MySQL. Use getQuery instead.",
  );
};

export const allQuerySync = (query: string, params: any[] = []) => {
  throw new Error(
    "Synchronous queries are not supported with MySQL. Use allQuery instead.",
  );
};

export const saveDatabase = () => {
  // MySQL saves automatically, no need for manual save
  console.log("Database save not needed for MySQL");
};

export default null;
