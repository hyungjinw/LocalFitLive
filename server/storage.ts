import { users, evaluations, type User, type InsertUser, type Evaluation, type InsertEvaluation } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  getAllEvaluations(): Promise<Evaluation[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createEvaluation(insertEvaluation: InsertEvaluation): Promise<Evaluation> {
    const [evaluation] = await db
      .insert(evaluations)
      .values(insertEvaluation)
      .returning();
    return evaluation;
  }

  async getAllEvaluations(): Promise<Evaluation[]> {
    return await db.select().from(evaluations).orderBy(desc(evaluations.createdAt));
  }
}

export const storage = new DatabaseStorage();
