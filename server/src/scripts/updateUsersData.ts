import { faker } from "@faker-js/faker";
import { axiosInstance } from "../api/axios";

type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  password: string;
  role: string;
};

const getUsers = async (): Promise<UserData[]> => {
  const response = await axiosInstance.get<UserData[]>("/users");
  return response.data;
};

const updateUser = (user: UserData): UserData => {
  return {
    ...user,
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(["admin", "moderator", "user"]),
  };
};

const updateUsersData = async () => {
  try {
    const users = await getUsers();

    for (const user of users) {
      const updatedUser = updateUser(user);
      await axiosInstance.patch(`/users/${user.id}`, updatedUser);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

updateUsersData();
