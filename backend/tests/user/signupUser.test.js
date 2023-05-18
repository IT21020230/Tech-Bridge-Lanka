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

//should return an error if password is weak
describe("signupUser", () => {
  it("should return an error for weak password", async () => {
    // Mock request and response objects
    const req = {
      body: {
        email: "test@example.com",
        password: "weakpassword",
        confirmPassword: "weakpassword",
        name: "John Doe",
        phone: "1234567890",
        age: 25,
        province: "Example Province",
        city: "Example City",
        photo: "example.jpg",
        role: "user",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock isStrongPassword() to return false for weak password
    const validator = require("validator");
    validator.isStrongPassword = jest.fn().mockReturnValue(false);

    // Execute the signupUser function
    await signupUser(req, res);

    // Verify the expected behavior
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Password is not strong enough.\nMust contain an uppercase, a lowercase, a special character, a number and must be more than eight characters",
    });
  });
});

//should return an error if required fields are missing
// test("should return an error if email, password, or name is missing", async () => {
//   const req = {
//     body: {
//       email: "test@example.com",
//       password: "Password123!",
//       name: "John Doe",
//     },
//   };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn(),
//   };

//   await signupUser(req, res);

//   expect(res.status).toHaveBeenCalledWith(400);
//   expect(res.json).toHaveBeenCalledWith({
//     message: "email, password, name fields must be filled",
//   });
// });
