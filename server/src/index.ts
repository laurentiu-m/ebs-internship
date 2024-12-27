import jsonServer from "json-server";
import cors from "cors";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router("src/db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
