import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import dotenv from "dotenv";

dotenv.config();

const config = {
  db: "./db.json",
};

const db = jsonServer.router(config.db).db;

const router = Router();

router.get("/users/top", (req: Request, res: Response) => {
  const posts = db.get("posts").value();
  const users = db.get("users").value();

  const postCounts = users.map((user) => {
    const postCount = posts.filter((post) => post.userId === user.id).length;
    return { userId: user.id, postCount, username: user.username };
  });

  const topUsers = postCounts
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 12);

  res.json(topUsers);
});

router.get("/posts/top", (req: Request, res: Response) => {
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
    .slice(0, 12);

  res.json(topPosts);
});

router.get("/gender", (req: Request, res: Response) => {
  const users = db.get("users").value();

  const { female, male, prefer_not_to_say } = users.reduce((acc, user) => {
    acc[user.gender] = (acc[user.gender] || 0) + 1;
    return acc;
  }, {});

  const total = female + male + prefer_not_to_say;

  res.json({
    total,
    result: [
      {
        name: "female",
        value: female,
        percentage: Math.round(((female * 100) / total) * 100) / 100,
      },
      {
        name: "male",
        value: male,
        percentage: Math.round(((male * 100) / total) * 100) / 100,
      },
      {
        name: "prefer_not_to_say",
        value: prefer_not_to_say,
        percentage: Math.round(((prefer_not_to_say * 100) / total) * 100) / 100,
      },
    ],
  });
});

router.get("/roles", (req: Request, res: Response) => {
  const users = db.get("users").value();

  const { admin, moderator, user } = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const total = admin + moderator + user;

  res.json({
    total,
    result: [
      {
        name: "admin",
        value: admin,
        percentage: Math.round(((admin * 100) / total) * 100) / 100,
      },
      {
        name: "moderator",
        value: moderator,
        percentage: Math.round(((moderator * 100) / total) * 100) / 100,
      },
      {
        name: "user",
        value: user,
        percentage: Math.round(((user * 100) / total) * 100) / 100,
      },
    ],
  });
});

router.get("/users/:id/posts/comments", (req: Request, res: Response) => {
  const { id } = req.params;

  const comments = db.get("comments").value();
  const postsId = db
    .get("posts")
    .filter((post) => post.userId === Number(id))
    .map((post) => post.id)
    .value();

  const totalComments = db
    .get("comments")
    .filter((comment) => postsId.includes(comment.postId))
    .value().length;

  const commentsCounts = postsId
    .map((postId) => {
      const commentCount = comments.filter(
        (comment) => comment.postId === postId
      ).length;

      if (commentCount > 0) {
        return { postId, commentCount };
      }

      return null;
    })
    .filter((comment) => comment !== null);

  res.json({ totalComments, commentsCounts });
});

router.get("/users/:id/albums/total", (req: Request, res: Response) => {
  const { id } = req.params;

  const totalAlbums = db
    .get("albums")
    .filter((album) => album.userId === Number(id))
    .value().length;

  res.json(totalAlbums);
});

router.get("/comments/total", (req: Request, res: Response) => {
  const comments = db.get("comments").value();

  res.json({ total: comments.length });
});

export default router;
