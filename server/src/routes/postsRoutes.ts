import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

const config = {
  db: "./db.json",
};

const router = Router();

router.get("", (req: Request, res: Response) => {
  const { userId, search, page, rows } = req.query;

  const pageNumber = Number(page) || 1;
  const rowsNumber = Number(rows) || 10;

  const dbData = JSON.parse(readFileSync(config.db, "utf-8"));
  const users = dbData.users;

  const searchValue = typeof search === "string" ? search.toLowerCase() : "";

  let posts = dbData.posts;

  if (userId) {
    posts = posts.filter((post) => post.userId === Number(userId));
  } else {
    posts = posts.map(({ userId, ...rest }) => ({
      ...rest,
      username: users.find((user) => user.id === userId)?.username,
    }));
  }

  if (searchValue) {
    posts = posts.filter((post) => {
      const title = post.title.toLowerCase().includes(searchValue);
      const username =
        !userId && post.username.toLowerCase().includes(searchValue);

      return title || username;
    });
  }

  const totalCount = posts.length;
  const totalPages = Math.ceil(totalCount / rowsNumber);

  const validPage = totalPages > 0 ? pageNumber : 0;

  const startIndex = (validPage - 1) * rowsNumber;
  const endIndex = startIndex + rowsNumber;

  posts = posts.slice(startIndex, endIndex);

  res.json({
    result: posts,
    count: totalCount,
    totalPages,
    currentPage: validPage,
    rows: rowsNumber,
  });
});

export default router;
