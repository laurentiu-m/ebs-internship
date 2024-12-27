import { faker } from "@faker-js/faker";
import axios from "axios";

const apiUrl = "http://localhost:8000/users";

const getUsers = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

const updateUser = (user: object) => {
  return {
    ...user,
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(["Admin", "Moderator", "User"]),
  };
};

const initUserData = async () => {
  try {
    const users = await getUsers();

    for (const user of users) {
      const updatedUser = updateUser(user);
      await axios.patch(`${apiUrl}/${user.id}`, updatedUser);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

initUserData();
