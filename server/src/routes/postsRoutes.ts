import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

const config = {
  db: "./db.json",
};

const router = Router();

router.get("", (req: Request, res: Response) => {
  const { userId } = req.query;
  const dbData = JSON.parse(readFileSync(config.db, "utf-8"));
  const users = dbData.users;

  let posts = dbData.posts;

  if (userId) {
    posts = posts.filter((post) => post.userId === Number(userId));
    res.json({ results: posts, count: posts.length });
    return;
  }

  posts = posts.map(({ userId, ...rest }) => ({
    ...rest,
    username: users.find((user) => user.id === userId).username,
  }));

  res.json({ results: posts, count: posts.length });
});

export default router;
