import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import dotenv from "dotenv";

dotenv.config();

const config = {
  db: "./db.json",
};

const db = jsonServer.router(config.db).db;

const router = Router();

router.get("", (req: Request, res: Response) => {
  const { userId } = req.query;
  let posts = db.get("posts").value();

  if (userId) {
    posts = posts.filter((post) => post.userId === Number(userId));
  }

  res.json({ results: posts, count: posts.length });
});

export default router;
