import Requests from "../PageObjects/Requests";

describe("API Tests", () => {
  it("Session Creation Request Tests", () => {
    Requests.getToken();
  });

  it("Request with /Session as the end point", () => {
    Requests.sendSessionRequest();
  });
});
