import Requests from "../PageObjects/Requests";

describe("API Tests", () => {
  it("Session Creation Request Tests", () => {
    Requests.startSessionRequest();
  });

  it("Request with /Session as the end point", () => {
    Requests.sendSessionRequest();
  });
});
