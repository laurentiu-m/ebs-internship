import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import dotenv from "dotenv";
import { axiosInstance } from "../api/axios";
import { readFileSync } from "fs";

dotenv.config();

const config = {
  db: "./db.json",
};

const db = jsonServer.router(config.db).db;

const router = Router();

router.get("", (req: Request, res: Response) => {
  const { id } = req.query;
  const dbData = JSON.parse(readFileSync(config.db, "utf-8"));
  let users = dbData.users;

  if (id) {
    users = users.filter((user) => user.id === Number(id));
  }

  res.json({ result: users, count: users.length });
});

router.put("/edit/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, username } = req.body;

  const users = db
    .get("users")
    .filter((user) => user.id !== Number(id))
    .value();

  const isEmailTaken = users.some((user) => user.email === email);
  const isUsernameTaken = users.some((user) => user.username === username);

  if (isEmailTaken) {
    res.status(404).json({
      field: "email",
      type: "server",
      messageKey: "email_server",
    });
    return;
  }

  if (isUsernameTaken) {
    res.status(404).json({
      field: "username",
      type: "server",
      messageKey: "username_server",
    });
    return;
  }

  try {
    await axiosInstance.put(`/users/${id}`, req.body);

    res.status(200).json({
      message: `You've edited successfully user ${id}`,
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred during editing user" });
  }
});

export default router;
