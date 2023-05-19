const mongoose = require("mongoose");
const {
  createCommunity,
} = require("../../src/controllers/communityController"); // Import the createCommunity function

// Create a mock request object
const req = {
  body: {
    commName: "Community Name",
    location: "Community Location",
    contactNumber: "Contact Number",
    email: "Email",
    startedDate: "Started Date",
    size: "Community Size",
    registrationFile: "Registration File",
    logo: "Logo",
    coverPic: "Cover Picture",
    createdBy: "Created By",
  },
};

// Create a mock response object
const res = {
  send: jest.fn(),
};

// Mock the Community model
const Community = mongoose.model("Community");

describe("createCommunity", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new community and send the created community", async () => {
    // Mock the community save method
    const saveMock = jest.fn().mockResolvedValueOnce(req.body);
    jest.spyOn(Community.prototype, "save").mockImplementation(saveMock);

    await createCommunity(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(req.body);
  });

  it("should handle errors during community creation", async () => {
    // Mock the community save method to throw an error
    jest
      .spyOn(Community.prototype, "save")
      .mockRejectedValueOnce(new Error("Community creation failed"));

    await createCommunity(req, res);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: "Community creation failed",
    });
  });
});
