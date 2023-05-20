const mongoose = require("mongoose");
const {
  createCommunityMember,
} = require("../../src/controllers/communityMemberController"); // Import the createCommunityMember function

// Create a mock request object
const req = {
  body: {
    userID: "userId",
    name: "member name",
    pic: "profile picture",
    comId: "communityId",
    role: "member role",
  },
};

// Create a mock response object
const res = {
  send: jest.fn(),
};

// Mock the CommunityMember model
const CommunityMember = mongoose.model("CommunityMember");

describe("createCommunityMember", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new community member and return the created member", async () => {
    // Mock the CommunityMember.save method
    CommunityMember.prototype.save = jest.fn().mockResolvedValueOnce(req.body);

    await createCommunityMember(req, res);

    expect(CommunityMember.prototype.save).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(req.body);
  });

  it("should handle the case when an error occurs during member creation", async () => {
    // Mock the CommunityMember.save method
    CommunityMember.prototype.save = jest
      .fn()
      .mockRejectedValueOnce(new Error("Creation failed"));

    await createCommunityMember(req, res);

    expect(CommunityMember.prototype.save).toHaveBeenCalledTimes(1);
    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.throw).toHaveBeenCalledWith(Error, "Creation failed");
  });
});
