/// <reference types= "cypress" />
const inputData = require("../../fixtures/example.json");

class VerificationUI {
  openPlatform() {
    cy.title().should("eq", "Veriff - Demo Integration");
    cy.get("#logo-color-regular", { timeout: 20000 })
      .should("exist")
      .and("be.visible");
    cy.get(".grid-panel").within(() => {
      cy.get(".TextField-module_input__3FXIK")
        .should("exist")
        .and("be.visible");
      cy.get(".Select-module_select__1qWxd")
        .should("exist")
        .and("be.visible")
        .then(($el) => {
          expect($el).to.have.length(2);
        });
      cy.get("#downshift-1-input").should("exist").and("be.visible");
      cy.get(".grid-options").within(() => {
        cy.get(".Radio-module_radio__2iYyp")
          .first()
          .should("exist")
          .and("be.visible")
          .and("be.checked");
        cy.get(".Radio-module_radio__2iYyp")
          .last()
          .should("exist")
          .and("be.visible")
          .and("not.be.checked");
      });
    });
    cy.get(".UnstyledButton-module_base__1a3SB")
      .should("exist")
      .and("be.visible")
      .and("be.enabled");
  }
  clickVerifyMeButton() {
    cy.intercept({
      method: "POST",
      url: "/api/v2/events",
    }).as("SessionStart");
    cy.get(".UnstyledButton-module_base__1a3SB").click();
    cy.wait("@SessionStart", { timeout: 20000 });
  }
  verificationDialogbox() {
    cy.url().should("eq", "https://demo.saas-3.veriff.me/");

    cy.get("#veriffFrame", { timeout: 20000 }) //Get Iframe by ID
      .its("0.contentDocument.body") //Get the body of Iframe
      .should("not.be.empty", { timeout: 20000 }) //body should not be empty
      .then((body) => {
        cy.wrap(body).find("[data-test-leave-session-button]").should("exist"); //Wrap the body and find the elements within it
        cy.wrap(body).find("input").type("1234");
        cy.wrap(body)
          .find("h1")
          .should("contain.text", "Let's get you verified");
      });
  }
  fillFiledsAndSelectInContext() {
    cy.get(".grid-panel").within(() => {
      cy.get(".TextField-module_input__3FXIK").clear().type(inputData.Name);
      cy.get(".Select-module_wrapper__Qs5Lu").first().click();
      cy.xpath("//body/reach-portal[1]/div[1]", { timeout: 20000 }).within(
        () => {
          cy.get("#downshift-0-item-8").click();
        }
      );

      cy.get("#downshift-1-input").click();
      cy.xpath("//body/reach-portal[1]/div[1]").within(() => {
        cy.get('[data-testid="EE"]').click();
      });
      cy.get(".Select-module_wrapper__Qs5Lu").last().click();
      cy.xpath("//ul[@id='downshift-2-menu']").within(() => {
        cy.get("#downshift-2-item-1").click();
      });
    });
  }
  checkRedirect() {
    cy.get(".grid-options").within(() => {
      cy.get(".Radio-module_radio__2iYyp").last().check();
    });
  }
  verifyReidrect() {
    cy.url().should("not.eq", "https://demo.saas-3.veriff.me/");
    cy.get(".p1o17nau").should("exist").and("be.visible");
    cy.get("h1")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Let's get you verified");
    cy.get(".c1osd9qo > .bxn0um8")
      .should("exist")
      .and("contain.text", "Continue with your current device")
      .and("be.enabled");
  }
}
module.exports = new VerificationUI();
