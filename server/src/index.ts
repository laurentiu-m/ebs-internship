import jsonServer from "json-server";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
