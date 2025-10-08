import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEvaluationSchema } from "@shared/schema";
import "./types";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        res.json({ success: true });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post('/api/admin/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed" });
      } else {
        res.json({ success: true });
      }
    });
  });

  app.post('/api/evaluations', async (req, res) => {
    try {
      const data = insertEvaluationSchema.parse(req.body);
      const evaluation = await storage.createEvaluation(data);
      res.json(evaluation);
    } catch (error) {
      res.status(400).json({ message: "Invalid evaluation data" });
    }
  });

  app.get('/api/evaluations', requireAuth, async (req, res) => {
    try {
      const evaluations = await storage.getAllEvaluations();
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch evaluations" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
