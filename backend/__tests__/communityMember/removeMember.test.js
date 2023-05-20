const mongoose = require("mongoose");
const {
  removeMember,
} = require("../../src/controllers/communityMemberController"); // Import the removeMember function

// Create a mock request object
const req = {
  params: {
    id: "memberId",
  },
};

// Create a mock response object
const res = {
  send: jest.fn(),
};

// Mock the CommunityMember model
const CommunityMember = mongoose.model("CommunityMember");

describe("removeMember", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find and delete the member with the specified id and return it", async () => {
    // Mock the CommunityMember.findByIdAndDelete method
    const deletedMember = { _id: "memberId", name: "John Doe" };
    CommunityMember.findByIdAndDelete = jest
      .fn()
      .mockResolvedValueOnce(deletedMember);

    await removeMember(req, res);

    expect(CommunityMember.findByIdAndDelete).toHaveBeenCalledWith(
      req.params.id
    );
    expect(res.send).toHaveBeenCalledWith(deletedMember);
  });

  it("should handle the case when an error occurs during member deletion", async () => {
    // Mock the CommunityMember.findByIdAndDelete method
    CommunityMember.findByIdAndDelete = jest
      .fn()
      .mockRejectedValueOnce(new Error("Deletion failed"));

    await removeMember(req, res);

    expect(CommunityMember.findByIdAndDelete).toHaveBeenCalledWith(
      req.params.id
    );
    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.throw).toHaveBeenCalledWith(Error, "Deletion failed");
  });
});
