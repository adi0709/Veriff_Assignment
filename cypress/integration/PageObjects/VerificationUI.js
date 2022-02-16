/// <reference types= "cypress" />
const inputData = require("../../fixtures/example.json");

class VerificationUI {
  //Verify the URL and the visibility of all the elements of the platform
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

  //Clicks the Verify Me button
  clickVerifyMeButton() {
    cy.intercept({
      method: "POST",
      url: "/api/v2/events",
    }).as("SessionStart");
    cy.get(".UnstyledButton-module_base__1a3SB").click();
    cy.wait("@SessionStart", { timeout: 20000 });
  }

  //Checks the iframe  that opens up and interacts with the elements of the iframe
  verificationDialogbox() {
    cy.url().should("eq", "https://demo.saas-3.veriff.me/");

    cy.get("#veriffFrame", { timeout: 20000 }) //Get Iframe by ID
      .its("0.contentDocument.body") //Get the body of Iframe
      .should("not.be.empty", { timeout: 20000 }) //body should not be empty
      .then((body) => {
        cy.wrap(body)
          .find("[data-test-leave-session-button]")
          .should("exist")
          .and("be.visible"); //Wrap the body and find the elements within it
        cy.wrap(body)
          .find(".obxao7l > :nth-child(1) > h2")
          .should("contain.text", "Option 1: Scan the QR code");
        cy.wrap(body)
          .find("form > h2")
          .should("contain.text", "ption 2: Send link via SMS");
        cy.wrap(body)
          .find('[data-testid="phone-number-submit-button"]')
          .should("exist")
          .and("be.visible")
          .and("not.be.enabled");
        cy.wrap(body).find("#phone").type("1234");
        cy.wrap(body)
          .find('[data-testid="phone-number-submit-button"]')
          .should("be.enabled");
        cy.wrap(body)
          .find("h1")
          .should("exist")
          .and("be.visible")
          .and("contain.text", "Let's get you verified");
        cy.wrap(body)
          .find(".ddh2tul")
          .should("exist")
          .and("be.visible")
          .and(
            "contain.text",
            "Demo Inc would like to confirm your identity, a process powered by Veriff."
          );
      });
  }

  //Provide values to the fields of the Platform
  fillFiledsAndSelectInContext() {
    cy.get(".grid-panel").within(() => {
      cy.get(".TextField-module_input__3FXIK").clear().type(inputData.Name);
      cy.get('[name="language"]').click();

      //Using th xpath to get the dynamic dropdowns
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
    cy.get(".ddh2tul")
      .should("exist")
      .and("be.visible")
      .and(
        "contain.text",
        "Demo Inc would like to confirm your identity, a process powered by Veriff."
      );
    cy.get(".c1osd9qo > .bxn0um8")
      .should("exist")
      .and("contain.text", "Continue with your current device")
      .and("be.enabled");
    cy.get(".obxao7l > :nth-child(1) > h2").should(
      "contain.text",
      "Option 1: Scan the QR code"
    );
    cy.get("form > h2").should("contain.text", "Option 2: Send link via SMS");
    cy.get('[data-testid="phone-number-submit-button"]')
      .should("exist")
      .and("be.visible")
      .and("not.be.enabled");
    cy.get("#phone").should("exist").and("be.visible").type("12324243");
    cy.get('[data-testid="phone-number-submit-button"]').and("be.enabled");
  }
}
module.exports = new VerificationUI();
