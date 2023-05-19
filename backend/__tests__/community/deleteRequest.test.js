const mongoose = require("mongoose");
const {
  deleteRequest,
} = require("../../src/controllers/communityAnswerController"); // Import the deleteRequest function

// Create a mock request object
const req = {
  params: { id: "requestId" },
};

// Create a mock response object
const res = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
  throw: jest.fn(),
};

// Mock the CommunityAnswer model
const CommunityAnswer = mongoose.model("CommunityAnswer");

describe("deleteRequest", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the request and send the deleted request", async () => {
    // Mock the CommunityAnswer.findByIdAndDelete method
    CommunityAnswer.findByIdAndDelete = jest
      .fn()
      .mockResolvedValueOnce("deletedRequest");

    await deleteRequest(req, res);

    expect(CommunityAnswer.findByIdAndDelete).toHaveBeenCalledWith("requestId");
    expect(res.send).toHaveBeenCalledWith("deletedRequest");
  });

  it("should handle the case when the request is not found", async () => {
    // Mock the CommunityAnswer.findByIdAndDelete method
    CommunityAnswer.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);

    await deleteRequest(req, res);

    expect(CommunityAnswer.findByIdAndDelete).toHaveBeenCalledWith("requestId");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.throw).toHaveBeenCalledWith(Error, "Request not found");
  });

  it("should handle the case when an error occurs during request deletion", async () => {
    // Mock the CommunityAnswer.findByIdAndDelete method
    CommunityAnswer.findByIdAndDelete = jest
      .fn()
      .mockRejectedValueOnce(new Error("Deletion failed"));

    await deleteRequest(req, res);

    expect(CommunityAnswer.findByIdAndDelete).toHaveBeenCalledWith("requestId");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.throw).toHaveBeenCalledWith(Error, "Deletion failed");
  });
});
