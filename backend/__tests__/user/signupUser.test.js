jest.mock("../../src/models/userModel");
jest.mock("bcrypt");
jest.mock("validator");

const User = require("../../src/models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { signupUser } = require("../../src/controllers/userController");

//should return an error if email already exists
test("should return an error if email already exists", async () => {
  const req = {
    body: {
      email: "existing@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
      phone: "1234567890",
      age: 25,
      province: "Example Province",
      city: "Example City",
      photo: "example.jpg",
      role: "member",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const User = require("../../src/models/userModel");
  User.findOne.mockResolvedValue({ email: "existing@example.com" });

  await signupUser(req, res);

  expect(res.status).toHaveBeenCalledWith(409);
  expect(res.json).toHaveBeenCalledWith({ message: "Email already exists" });
  expect(User.findOne).toHaveBeenCalledWith({ email: "existing@example.com" });
});

//should return an error if required fields are missing
test("should return an error if email, password, or name is missing", async () => {
  const req = {
    body: {
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
      phone: "1234567890",
      age: 25,
      province: "Example Province",
      city: "Example City",
      photo: "example.jpg",
      role: "member",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await signupUser(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    message: "email, password, name fields must be filled",
  });
});

//should return an error if email is not valid
test("should return an error if email is not valid", async () => {
  const req = {
    body: {
      email: "existing.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "John Doe",
      phone: "1234567890",
      age: 25,
      province: "Example Province",
      city: "Example City",
      photo: "example.jpg",
      role: "member",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await signupUser(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "Email is not valid",
  });
});

//should return an error if password and confirm password are equal or not
test("should return an error if password and confirm password are equal or not", async () => {
  const req = {
    body: {
      email: "existing@gmail.com",
      password: "Password123!",
      confirmPassword: "Pasd123!",
      name: "John Doe",
      phone: "1234567890",
      age: 25,
      province: "Example Province",
      city: "Example City",
      photo: "example.jpg",
      role: "member",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await signupUser(req, res);

  // Verify the expected behavior
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "Password and confirm password mismatch",
  });
});
