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
    const invalidFields = [
      {
        field: "email",
        messageKey: "invalid_email_or_password",
      },
      { field: "password", messageKey: "none" },
    ];
    res.status(400).json({ errors: invalidFields });
    return;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role,
      language: user.language,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiration }
  );

  res.status(200).json({ message: "You have login successfully", token });
});

router.post("/register", async (req: Request, res: Response) => {
  const { name, username, email, phone, gender, password }: RegisterUser =
    req.body;

  const missingFields = [
    { field: "email", value: email },
    { field: "name", value: name },
    { field: "password", value: password },
    { field: "gender", value: gender },
    { field: "username", value: username },
    { field: "phone", value: phone },
  ].filter(({ value }) => !value);

  if (missingFields.length > 0) {
    res.status(400).json({
      error: "form_invalid",
      fields: missingFields.map(({ field }) => ({
        field,
        messageKey: `${field}_empty`,
      })),
    });
    return;
  }

  const users: User[] = db.get("users").value();

  const checkEmail: User | undefined = users.find(
    (user) => user.email === email
  );
  if (checkEmail) {
    res.status(404).json({
      field: "email",
      type: "server",
      messageKey: "email_server",
    });
    return;
  }

  const checkUsername: User | undefined = users.find(
    (user) => user.username === username
  );
  if (checkUsername) {
    res.status(404).json({
      field: "username",
      type: "server",
      messageKey: "username_server",
    });
    return;
  }

  try {
    const response = await axiosInstance.post("/users", {
      name,
      username,
      email,
      phone,
      gender,
      password,
      role: "user",
    });

    const user = response.data;
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration }
    );
    res.status(200).json({
      message: "You've been registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

router.post("/valid", (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({
      message: "You are not login to access this page",
    });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    res.status(200).json({ message: "Token is valid", decodedToken });
    return;
  } catch (error) {
    res.status(400).json({
      message: "Token is invalid or expired. Please log in again.",
    });
  }
});

export default router;
