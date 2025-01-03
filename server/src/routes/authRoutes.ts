import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import { User, LoginUser, RegisterUser } from "../types";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { axiosInstance } from "../api/axios";

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET_KEY || "default-secret-key",
  jwtExpiration: process.env.JWT_EXPIRATION_TIME || "1h",
  port: process.env.PORT || 3000,
  db: "./db.json",
};

const db = jsonServer.router(config.db).db;

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { email, password }: LoginUser = req.body;

  const users: User[] = db.get("users").value();
  const user: User = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: config.jwtExpiration }
  );

  res.status(200).json({ message: "You have login successfully", token });
});

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, name, password, phone }: RegisterUser = req.body;

  if (!username || !email || !name || !password || !phone) {
    res.status(404).json("Please complete the register form");
    return;
  }

  const users: User[] = db.get("users").value();

  const checkEmail: User | undefined = users.find(
    (user) => user.email === email
  );
  if (checkEmail) {
    res.status(404).json("Someone already has this email, please try another");
    return;
  }

  const checkUsername: User | undefined = users.find(
    (user) => user.username === username
  );
  if (checkUsername) {
    res
      .status(404)
      .json("Someone already has this username, please try another");
    return;
  }

  try {
    await axiosInstance.post("/users", {
      username,
      email,
      name,
      password,
      phone,
    });
    res.status(200).json("You've been registred successfully");
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json("An error occurred during registration");
  }
});

export default router;
