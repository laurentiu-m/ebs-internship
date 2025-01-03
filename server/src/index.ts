import express from "express";
import jsonServer from "json-server";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: "./db.json",
};

const jsonRouter = jsonServer.router(config.db);
const jsonMiddlewares = jsonServer.defaults();

const app = express();

app.use(cors());
app.use(express.json());

app.use(jsonMiddlewares);
app.use("/api", routes);
app.use("/", jsonRouter);

const port = config.port;

app.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
