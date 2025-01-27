import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import dotenv from "dotenv";

dotenv.config();

const config = {
  db: "./db.json",
};

const db = jsonServer.router(config.db).db;

const router = Router();

router.get("/top-users", (req: Request, res: Response) => {
  const posts = db.get("posts").value();
  const users = db.get("users").value();

  const postCounts = users.map((user) => {
    const postCount = posts.filter((post) => post.userId === user.id).length;
    return { userId: user.id, postCount };
  });

  const topUsers = postCounts
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 10);

  res.json(topUsers);
});

router.get("/top-posts", (req: Request, res: Response) => {
  const posts = db.get("posts").value();
  const comments = db.get("comments").value();

  const commentCounts = posts.map((post) => {
    const commentCount = comments.filter(
      (comment) => comment.postId === post.id
    ).length;
    return { postId: post.id, commentCount };
  });

  const topPosts = commentCounts
    .sort((a, b) => b.commentCount - a.commentCount)
    .slice(0, 10);

  res.json(topPosts);
});

router.get("/gender-count", (req: Request, res: Response) => {
  const users = db.get("users").value();

  const { female, male, prefer_not_to_say } = users.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});

  res.json([
    { name: "female", value: female },
    { name: "male", value: male },
    { name: "prefer_not_to_say", value: prefer_not_to_say },
  ]);
});

router.get("/roles-count", (req: Request, res: Response) => {
  const users = db.get("users").value();

  const {admin, moderator, user} = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  res.json([
    {name: "admin", value: admin},
    {name: "moderator", value: moderator},
    {name: "user", value: user}
  ])
})

export default router;
