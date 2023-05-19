const mongoose = require("mongoose");
const {
  getAllCommunity,
} = require("../../src/controllers/communityController"); // Import the getAllCommunity function

// Create a mock request object
const req = {};

// Create a mock response object
const res = {
  send: jest.fn(),
};

// Mock the Community model
const Community = mongoose.model("Community");

describe("getAllCommunity", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all accepted communities and send them as a response", async () => {
    // Mock the Community.find method
    Community.find = jest
      .fn()
      .mockResolvedValueOnce(["community1", "community2"]);

    await getAllCommunity(req, res);

    expect(Community.find).toHaveBeenCalledWith({ status: "Accepted" });
    expect(res.send).toHaveBeenCalledWith(["community1", "community2"]);
  });
});
