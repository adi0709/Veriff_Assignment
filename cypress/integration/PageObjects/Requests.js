/// <reference types= "cypress" />
const ReqData = require("../../fixtures/example.json");

class Requests {
  getToken() {
    cy.request({
      method: "GET",
      url: "https://demo.saas-3.veriff.me/environment",
      headers: {
        Connection: ReqData.Connection,
        "sec-ch-ua": ReqData.sec_ch_ua,
        "sec-ch-ua-mobile": ReqData.sec_ch_ua_mobile,
        "User-Agent": ReqData.User_Agent,
        "sec-ch-ua-platform": ReqData.sec_ch_ua_platform,
        Accept: ReqData.Accept,
        "Sec-Fetch-Site": ReqData.Sec_Fetch_Site,
        "Sec-Fetch-Mode": ReqData.Sec_Fetch_Mode,
        "Sec-Fetch-Dest": ReqData.Sec_Fetch_Dest,
        Referer: ReqData.Referer,
        "Accept-Language": ReqData.Accept_Language,
        Cookie: ReqData.Cookie,
      },
    }).then((res) => {
      expect(res.body).to.deep.equal({
        env: "production",
      });
      expect(res.status).to.eq(200);
    });
  }

  sendSessionRequest() {
    cy.request({
      method: "GET",
      url: "https://magic.saas-3.veriff.me/api/v2/sessions",
      headers: {
        "Accept-Encoding": ReqData.Accept_Encoding,
        Connection: ReqData.Connection,
        "sec-ch-ua": ReqData.sec_ch_ua,
        "sec-ch-ua-mobile": ReqData.sec_ch_ua_mobile,
        "User-Agent": ReqData.User_Agent,
        "sec-ch-ua-platform": ReqData.sec_ch_ua_platform,
        Authorization: "Bearer " + ReqData.Token,
        "Content-Type": ReqData.Content_Type,
        "X-Veriff-Platform": ReqData.X_Veriff_Platform,
        Accept: ReqData.Accept,
        "Sec-Fetch-Site": ReqData.Sec_Fetch_Site,
        "Sec-Fetch-Mode": ReqData.Sec_Fetch_Mode,
        "Sec-Fetch-Dest": ReqData.Sec_Fetch_Dest,
        Referer: ReqData.Referer,
        "Accept-Language": ReqData.Accept_Language,
        Cookie: ReqData.Cookie,
        "If-None-Match": ReqData.If_None_Match,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      cy.log(res.body);
      expect(res.body.activeVerificationSession).to.deep.equal({
        id: "bb8ac3fb-ab96-49d6-899e-f2e8a5ecdc2c",
        status: "created",
        document: {
          country: "EE",
          type: "ID_CARD",
        },
      });
    });
  }
}
module.exports = new Requests();
