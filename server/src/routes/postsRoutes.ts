import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

const config = {
  db: "./db.json",
};

const db = jsonServer.router(config.db).db;

const router = Router();

router.get("", (req: Request, res: Response) => {
  const { userId } = req.query;
  const dbData = JSON.parse(readFileSync(config.db, "utf-8"));
  let posts = dbData.posts;

  if (userId) {
    posts = posts.filter((post) => post.userId === Number(userId));
  }

  res.json({ results: posts, count: posts.length });
});

export default router;
