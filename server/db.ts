import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'dominic.db');

let db: Database | null = null;

export const initializeDatabase = async () => {
  try {
    const SQL = await initSqlJs();

    // Load existing database or create new one
    let data: Buffer | undefined;
    if (fs.existsSync(DB_PATH)) {
      data = fs.readFileSync(DB_PATH);
      db = new SQL.Database(data);
      console.log('Loaded existing database from:', DB_PATH);
    } else {
      db = new SQL.Database();
      console.log('Created new database at:', DB_PATH);
    }

    // Create tables
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_id TEXT UNIQUE,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        avatar TEXT,
        bio TEXT,
        location TEXT,
        company TEXT,
        title TEXT,
        skills TEXT,
        experience TEXT,
        domains TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        domain TEXT,
        tech_stack TEXT,
        status TEXT DEFAULT 'active',
        progress INTEGER DEFAULT 0,
        due_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS communities (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        domain TEXT,
        category TEXT,
        privacy TEXT DEFAULT 'public',
        members INTEGER DEFAULT 0,
        posts INTEGER DEFAULT 0,
        rules TEXT,
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS user_communities (
        user_id TEXT NOT NULL,
        community_id TEXT NOT NULL,
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, community_id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        action TEXT,
        details TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS follows (
        follower_id TEXT NOT NULL,
        following_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (follower_id, following_id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid TEXT PRIMARY KEY,
        sess TEXT NOT NULL,
        expire INTEGER NOT NULL
      )
    `);

    saveDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const saveDatabase = () => {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

export const runQuery = (query: string, params: any[] = []) => {
  if (!db) throw new Error('Database not initialized');
  try {
    db.run(query, params);
    saveDatabase();
    return { changes: db.getRowsModified() };
  } catch (error) {
    console.error('Query error:', error, query);
    throw error;
  }
};

export const getQuery = (query: string, params: any[] = []) => {
  if (!db) throw new Error('Database not initialized');
  try {
    const stmt = db.prepare(query);
    stmt.bind(params);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row;
    }
    stmt.free();
    return undefined;
  } catch (error) {
    console.error('Query error:', error, query);
    throw error;
  }
};

export const allQuery = (query: string, params: any[] = []) => {
  if (!db) throw new Error('Database not initialized');
  try {
    const stmt = db.prepare(query);
    stmt.bind(params);
    const results: any[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch (error) {
    console.error('Query error:', error, query);
    throw error;
  }
};

export default db;
