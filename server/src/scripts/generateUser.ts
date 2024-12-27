import { faker } from "@faker-js/faker";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  password: string;
  role: string;
};

export const createRandomUser = (): User => {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(["Male", "Female", "Prefer Not to Say"]),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(["Admin", "Moderator", "User"]),
  };
};
