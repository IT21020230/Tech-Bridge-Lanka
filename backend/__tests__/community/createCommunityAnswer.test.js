const mongoose = require("mongoose");
const {
  createCommunityAnswer,
} = require("../../src/controllers/communityAnswerController"); // Import the createCommunityAnswer function

// Create a mock request object
const req = {
  body: {
    commID: "communityId",
    answer: "New answer",
    userId: "userId",
    userName: "John Doe",
    proPic: "profile picture",
  },
};

// Create a mock response object
const res = {
  send: jest.fn(),
};

// Mock the CommunityAnswer model
const CommunityAnswer = mongoose.model("CommunityAnswer");

describe("createCommunityAnswer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new community answer and send the created answer", async () => {
    // Mock the communityanswer.save method
    CommunityAnswer.prototype.save = jest.fn().mockResolvedValueOnce(req.body);

    await createCommunityAnswer(req, res);

    expect(CommunityAnswer.prototype.save).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(req.body);
  });
});
