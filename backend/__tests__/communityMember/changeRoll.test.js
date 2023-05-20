const mongoose = require("mongoose");
const {
  changeRoll,
} = require("../../src/controllers/communityMemberController"); // Import the changeRoll function

// Create a mock request object
const req = {
  params: { id: "memberId" },
  body: {
    role: "new role",
  },
};

// Create a mock response object
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  throw: jest.fn(),
};

// Mock the CommunityMember model
const CommunityMember = mongoose.model("CommunityMember");

describe("changeRoll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should change the role of the member and return the updated member", async () => {
    // Mock the CommunityMember.findById method
    CommunityMember.findById = jest.fn().mockResolvedValueOnce({
      save: jest.fn().mockResolvedValueOnce({
        _id: "memberId",
        ...req.body,
      }),
    });

    await changeRoll(req, res);

    expect(CommunityMember.findById).toHaveBeenCalledWith("memberId");
    expect(res.json).toHaveBeenCalledWith({
      _id: "memberId",
      ...req.body,
    });
  });

  it("should handle the case when the member is not found", async () => {
    // Mock the CommunityMember.findById method
    CommunityMember.findById = jest.fn().mockResolvedValueOnce(null);

    await changeRoll(req, res);

    expect(CommunityMember.findById).toHaveBeenCalledWith("memberId");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.throw).toHaveBeenCalledWith(Error, "Member not found");
  });

  it("should handle the case when an error occurs during member update", async () => {
    // Mock the CommunityMember.findById method
    CommunityMember.findById = jest.fn().mockResolvedValueOnce({
      save: jest.fn().mockRejectedValueOnce(new Error("Update failed")),
    });

    await changeRoll(req, res);

    expect(CommunityMember.findById).toHaveBeenCalledWith("memberId");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.throw).toHaveBeenCalledWith(Error, "Update failed");
  });
});
