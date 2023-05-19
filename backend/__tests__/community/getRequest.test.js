const mongoose = require("mongoose");
const {
  getRequest,
} = require("../../src/controllers/communityAnswerController"); // Import the getRequest function

// Create a mock request object
const req = {
  params: { id: "communityId" },
};

// Create a mock response object
const res = {
  send: jest.fn(),
};

// Mock the CommunityAnswer model
const CommunityAnswer = mongoose.model("CommunityAnswer");

describe("getRequest", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve and send the community answers for the specified community ID", async () => {
    // Mock the CommunityAnswer.find method
    const mockCommunityAnswers = [
      { _id: "answer1", answer: "Answer 1" },
      { _id: "answer2", answer: "Answer 2" },
    ];
    CommunityAnswer.find = jest
      .fn()
      .mockResolvedValueOnce(mockCommunityAnswers);

    await getRequest(req, res);

    expect(CommunityAnswer.find).toHaveBeenCalledWith({
      commID: "communityId",
    });
    expect(res.send).toHaveBeenCalledWith(mockCommunityAnswers);
  });
});
