// Mock User model and bcrypt dependency
jest.mock("../../src/models/userModel");
jest.mock("bcrypt");

const User = require("../../src/models/userModel");
const bcrypt = require("bcrypt");
const { updateUser } = require("../../src/controllers/userController");

describe("updateUser", () => {
  it("should update the user successfully", async () => {
    // Mock request and response objects
    const req = {
      params: { id: "user_id" },
      body: {
        email: "newemail@example.com",
        password: "NewPassword123!",
        name: "New Name",
        phone: "9876543210",
        age: 30,
        province: "New Province",
        city: "New City",
        photo: "newphoto.jpg",
        role: "admin",
      },
    };
    const res = {
      json: jest.fn(),
    };

    // Mock User.findById() to return a user object
    const existingUser = {
      email: "oldemail@example.com",
      password: "OldPassword123!",
      name: "Old Name",
      phone: "1234567890",
      age: 25,
      province: "Old Province",
      city: "Old City",
      photo: "oldphoto.jpg",
      role: "user",
      save: jest.fn(),
    };
    User.findById = jest.fn().mockResolvedValue(existingUser);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("OldPassword123!", salt);

    // Mock bcrypt.genSalt() and bcrypt.hash()
    bcrypt.genSalt = jest.fn().mockResolvedValue("salt");
    bcrypt.hash = jest.fn().mockResolvedValue(hash);

    // Execute the updateUser function
    await updateUser(req, res);

    // Verify the expected behavior
    expect(User.findById).toHaveBeenCalledWith("user_id");
    expect(existingUser.email).toBe("newemail@example.com");
    expect(existingUser.password).toBe(hash);
    expect(existingUser.name).toBe("New Name");
    expect(existingUser.phone).toBe("9876543210");
    expect(existingUser.age).toBe(30);
    expect(existingUser.province).toBe("New Province");
    expect(existingUser.city).toBe("New City");
    expect(existingUser.photo).toBe("newphoto.jpg");
    expect(existingUser.role).toBe("admin");
    expect(existingUser.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "User updated successfully",
    });
  });

  it("should return an error for user not found", async () => {
    // Mock request and response objects
    const req = {
      params: { id: "non_existing_user_id" },
      body: {
        email: "newemail@example.com",
        password: "NewPassword123!",
        name: "New Name",
        phone: "9876543210",
        age: 30,
        province: "New Province",
        city: "New City",
        photo: "newphoto.jpg",
        role: "admin",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findById() to return null
    User.findById = jest.fn().mockResolvedValue(null);

    // Execute the updateUser function
    await updateUser(req, res);

    // Verify the expected behavior
    expect(User.findById).toHaveBeenCalledWith("non_existing_user_id");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should handle server errors", async () => {
    // Mock request and response objects
    const req = {
      params: { id: "user_id" },
      body: {
        email: "newemail@example.com",
        password: "NewPassword123!",
        name: "New Name",
        phone: "9876543210",
        age: 30,
        province: "New Province",
        city: "New City",
        photo: "newphoto.jpg",
        role: "admin",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findById() to throw an error
    User.findById = jest.fn().mockRejectedValue(new Error("Database error"));

    // Execute the updateUser function
    await updateUser(req, res);

    // Verify the expected behavior
    expect(User.findById).toHaveBeenCalledWith("user_id");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
  });
});
