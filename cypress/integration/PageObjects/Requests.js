/// <reference types= "cypress" />
const ReqData = require("../../fixtures/example.json");
const ResData = require("../../fixtures/response.json");
const sessionData = require("../../fixtures/session.json")
const sessionResp = require("../../fixtures/sessionResponse.json")

class Requests {
//Sends the request and checkes if the session is created by checking the status in the request response
  startSessionRequest() {
    cy.request({
      method: "POST",
      url: "https://magic.saas-3.veriff.me/api/v2/events",
      headers: {
        Authorization: "Bearer " + ReqData.Token,
        "Content-Type":ReqData.Content_Type
      },
      body:{
        sessionData
      }
    }).then((res)=>{
      expect(res.status).to.eq(202);
      expect(res.body).to.deep.equal(sessionResp)

    })
  }

  sendSessionRequest() {
    cy.request({
      method: "GET",
      url: "https://magic.saas-3.veriff.me/api/v2/sessions",
      headers: {
        Authorization: "Bearer " + ReqData.Token,
      },
    }).then((res) => {
      expect(res.body).to.deep.equal(ResData)
    });
  }
}
module.exports = new Requests();
