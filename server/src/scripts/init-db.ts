import fs from "fs";
import { createRandomUser } from "./generateUser";

const generateData = (count: number): object[] => {
  const userArr = [];
  for (let i = 0; i < count; i++) {
    userArr.push(createRandomUser());
  }

  return userArr;
};

const initDB = (data: object) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2), "utf-8");
};

const count = 10;
const users = generateData(count);

const data = {
  users,
};

initDB(data);
