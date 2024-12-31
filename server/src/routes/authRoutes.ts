import { Router, Request, Response } from "express";
import jsonServer from "json-server";
import { User, LoginUser, RegisterUser } from "../types";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { axiosInstance } from "../api/axios";

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
      return;
    } else {
      res.status(404).json("Email or password is not valid");
      return;
    }
  } else {
    res.status(404).json("Email or password is not valid");
    return;
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const {
    name,
    username,
    email,
    phone,
    gender,
    password,
    confirmPassword,
  }: RegisterUser = req.body;

  if (
    !email ||
    !name ||
    !password ||
    !gender ||
    !confirmPassword ||
    !username ||
    !phone
  ) {
    res.status(404).json({ message: "Please complete the register form" });
    return;
  }

  const users: User[] = db.get("users").value();

  const checkEmail: User | undefined = users.find(
    (user) => user.email === email
  );
  if (checkEmail) {
    res
      .status(404)
      .json({ message: "Someone already has this email, please try another" });
    return;
  }

  const checkUsername: User | undefined = users.find(
    (user) => user.username === username
  );
  if (checkUsername) {
    res.status(404).json({
      message: "Someone already has this username, please try another",
    });
    return;
  }

  const checkPassword = password === confirmPassword;
  if (!checkPassword) {
    res.status(404).json({ message: "Password must match" });
    return;
  }

  try {
    await axiosInstance.post("/users", {
      name,
      username,
      email,
      phone,
      gender,
      password,
      role: "user",
    });
    res.status(200).json({ message: "You've registered successfully" });
    return;
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ message: "An error occurred during registration" });
    return;
  }
});

export default router;
