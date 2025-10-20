import path from "path";
import { createServer } from "./index";
import { createServer as createHTTPServer } from "http";
import { setupSocket } from "./socket";
import * as express from "express";

(async () => {
  const app = await createServer();
  const port = process.env.PORT || 3000;

  // In production, serve the built SPA files
  const __dirname = import.meta.dirname;
  const distPath = path.join(__dirname, "../spa");

  // Serve static files
  app.use(express.static(distPath));

  // Create HTTP server and Socket.io
  const httpServer = createHTTPServer(app);
  const io = setupSocket(httpServer);

  // Make io accessible via app
  (app as any).io = io;

  // Handle React Router - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }

    res.sendFile(path.join(distPath, "index.html"));
  });

  httpServer.listen(port, () => {
    console.log(`🚀 Dominic server running on port ${port}`);
    console.log(`📱 Frontend: http://localhost:${port}`);
    console.log(`🔧 API: http://localhost:${port}/api`);
    console.log(`🔗 WebSocket: ws://localhost:${port}`);
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("🛑 Received SIGTERM, shutting down gracefully");
    httpServer.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    console.log("🛑 Received SIGINT, shutting down gracefully");
    httpServer.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
})();
