const mongoose = require("mongoose");
const {
  updateQuestion,
} = require("../../src/controllers/communityQuestionController"); // Import the updateQuestion function

// Create a mock request object
const req = {
  params: { id: "questionId" },
  body: {
    question: "new question",
  },
};

// Create a mock response object
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  throw: jest.fn(),
};

// Mock the CommunityQuestion model
const CommunityQuestion = mongoose.model("CommunityQuestion");

describe("updateQuestion", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the community question and return the updated question", async () => {
    // Mock the CommunityQuestion.findById method
    CommunityQuestion.findById = jest.fn().mockResolvedValueOnce({
      save: jest.fn().mockResolvedValueOnce({
        _id: "questionId",
        ...req.body,
      }),
    });

    await updateQuestion(req, res);

    expect(CommunityQuestion.findById).toHaveBeenCalledWith("questionId");
    expect(res.json).toHaveBeenCalledWith({
      _id: "questionId",
      ...req.body,
    });
  });

  it("should handle the case when the community question is not found", async () => {
    // Mock the CommunityQuestion.findById method
    CommunityQuestion.findById = jest.fn().mockResolvedValueOnce(null);

    await updateQuestion(req, res);

    expect(CommunityQuestion.findById).toHaveBeenCalledWith("questionId");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.throw).toHaveBeenCalledWith(Error, "community rule not found");
  });

  it("should handle the case when an error occurs during question update", async () => {
    // Mock the CommunityQuestion.findById method
    CommunityQuestion.findById = jest.fn().mockResolvedValueOnce({
      save: jest.fn().mockRejectedValueOnce(new Error("Update failed")),
    });

    await updateQuestion(req, res);

    expect(CommunityQuestion.findById).toHaveBeenCalledWith("questionId");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.throw).toHaveBeenCalledWith(Error, "Update failed");
  });
});
