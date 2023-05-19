jest.mock("../../src/models/userModel");
const User = require("../../src/models/userModel");
const { getAllUser } = require("../../src/controllers/userController");

describe("getAllUser", () => {
  //
  it("should return all users", async () => {
    // Mock User.find() to return an array of users
    const users = [
      { name: "John Doe", email: "john@example.com", role: "user" },
      { name: "Jane Smith", email: "jane@example.com", role: "user" },
    ];
    User.find.mockResolvedValue(users);

    // Mock request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Execute the getAllUser function
    await getAllUser(req, res);

    // Verify the expected behavior
    expect(User.find).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(users);
  });

  it('should return "User not found" if no users are found', async () => {
    // Mock User.find() to return an empty array
    User.find.mockResolvedValue([]);

    // Mock request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Execute the getAllUser function
    await getAllUser(req, res);

    // Verify the expected behavior
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("User not found");
  });

  it('should return "Server error" if an error occurs', async () => {
    // Mock User.find() to throw an error
    const errorMessage = "Database error";
    User.find.mockRejectedValue(new Error(errorMessage));

    // Mock request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Execute the getAllUser function
    await getAllUser(req, res);

    // Verify the expected behavior
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Server error" });
  });
});
