const mongoose = require("mongoose");
const {
  updateCommunity,
} = require("../../src/controllers/communityController"); // Import the updateCommunity function

// Create a mock request object
const req = {
  params: { id: "communityId" },
  body: {
    vission: "new vission",
    Mission: "new mission",
    faceBookLink: "new facebook link",
    instergrameLink: "new instagram link",
    whatsappLink: "new whatsapp link",
    email: "new email",
    contactNumber: "new contact number",
    coverPic: "new cover pic",
    logo: "new logo",
    size: "new size",
  },
};

// Create a mock response object
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  throw: jest.fn(),
};

// Mock the Community model
const Community = mongoose.model("Community");

describe("updateCommunity", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the community and return the updated community", async () => {
    // Mock the Community.findById method
    Community.findById = jest.fn().mockResolvedValueOnce({
      save: jest.fn().mockResolvedValueOnce({
        _id: "communityId",
        ...req.body,
      }),
    });

    await updateCommunity(req, res);

    expect(Community.findById).toHaveBeenCalledWith("communityId");
    expect(res.json).toHaveBeenCalledWith({
      _id: "communityId",
      ...req.body,
    });
  });

  it("should handle the case when the community is not found", async () => {
    // Mock the Community.findById method
    Community.findById = jest.fn().mockResolvedValueOnce(null);

    await updateCommunity(req, res);

    expect(Community.findById).toHaveBeenCalledWith("communityId");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.throw).toHaveBeenCalledWith(Error, "community not found");
  });

  it("should handle the case when an error occurs during community update", async () => {
    // Mock the Community.findById method
    Community.findById = jest.fn().mockResolvedValueOnce({
      save: jest.fn().mockRejectedValueOnce(new Error("Update failed")),
    });

    await updateCommunity(req, res);

    expect(Community.findById).toHaveBeenCalledWith("communityId");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.throw).toHaveBeenCalledWith(Error, "Update failed");
  });
});
