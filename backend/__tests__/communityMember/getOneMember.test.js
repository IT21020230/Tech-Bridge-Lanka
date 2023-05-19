const mongoose = require("mongoose");
const {
  getOneMember,
} = require("../../src/controllers/communityMemberController"); // Import the getOneMember function

// Create a mock request object
const req = {
  params: {
    uID: "userId",
    cID: "communityId",
  },
};

// Create a mock response object
const res = {
  send: jest.fn(),
};

// Mock the CommunityMember model
const CommunityMember = mongoose.model("CommunityMember");

describe("getOneMember", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve the member with matching userID and commID and return it", async () => {
    // Mock the CommunityMember.find method
    CommunityMember.find = jest
      .fn()
      .mockResolvedValueOnce(["member1", "member2"]);

    await getOneMember(req, res);

    expect(CommunityMember.find).toHaveBeenCalledWith({
      userID: req.params.uID,
      commID: req.params.cID,
    });
    expect(res.send).toHaveBeenCalledWith(["member1", "member2"]);
  });

  it("should handle the case when an error occurs during member retrieval", async () => {
    // Mock the CommunityMember.find method
    CommunityMember.find = jest
      .fn()
      .mockRejectedValueOnce(new Error("Retrieval failed"));

    await getOneMember(req, res);

    expect(CommunityMember.find).toHaveBeenCalledWith({
      userID: req.params.uID,
      commID: req.params.cID,
    });
    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.throw).toHaveBeenCalledWith(Error, "Retrieval failed");
  });
});
