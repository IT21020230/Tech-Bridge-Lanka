jest.mock("../../src/models/userModel");

const User = require("../../src/models/userModel");

const { getUserById } = require("../../src/controllers/userController");

const { getUserById } = require("../path/to/getUserById");

describe("getUserById", () => {
  it("should return a user when a valid ID is provided", async () => {
    // Mock User.findById() to return a user
    const user = { name: "John Doe", email: "john@example.com", role: "user" };
    User.findById.mockResolvedValue(user);

    // Mock request and response objects
    const req = {
      params: {
        id: "validId123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    // Execute the getUserById function
    await getUserById(req, res);

    // Verify the expected behavior
    expect(User.findById).toHaveBeenCalledWith("validId123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(user);
  });

  it('should return "User not found" when an invalid ID is provided', async () => {
    // Mock User.findById() to return null
    User.findById.mockResolvedValue(null);

    // Mock request and response objects
    const req = {
      params: {
        id: "invalidId456",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Execute the getUserById function
    await getUserById(req, res);

    // Verify the expected behavior
    expect(User.findById).toHaveBeenCalledWith("invalidId456");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it('should return "Server error" if an error occurs', async () => {
    // Mock User.findById() to throw an error
    const errorMessage = "Database error";
    User.findById.mockRejectedValue(new Error(errorMessage));

    // Mock request and response objects
    const req = {
      params: {
        id: "validId123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Execute the getUserById function
    await getUserById(req, res);

    // Verify the expected behavior
    expect(User.findById).toHaveBeenCalledWith("validId123");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
  });
});
