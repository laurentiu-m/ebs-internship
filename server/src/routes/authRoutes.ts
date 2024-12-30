import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import { User, LoginUser } from "../types";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();

const db = jsonServer.router("db.json").db;

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

router.post("/login", (req: Request, res: Response) => {
  const { email, password }: LoginUser = req.body;

  const users: User[] = db.get("users").value();
  const user: User = users.find((user) => user.email === email);

  if (user) {
    if (user.password === password) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "You have login successfully", token });
    } else {
      res.status(404).json("Email or password is not valid");
    }
  } else {
    res.status(404).json("Email or password is not valid");
  }
});

export default router;
