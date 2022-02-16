/// <reference types= "cypress" />
import VerificationUI from "../PageObjects/VerificationUI";
import Requests from "../PageObjects/Requests";

beforeEach(() => {
  cy.visit("/");
});

//Click Verify Me button without entering any information Scenario
Given("the platform is opened", () => {
  VerificationUI.openPlatform();
});
When("the verify me button is clicked", () => {
  VerificationUI.clickVerifyMeButton();
});
Then("the verification dialogue box appears", () => {
  VerificationUI.verificationDialogbox();
});
//Click Verify Me button without entering any information Scenario ends

//Enter Fields and Select InContext as option Scenario
When("the mandatory field are entered and InContext is selected", () => {
  VerificationUI.fillFiledsAndSelectInContext();
  VerificationUI.clickVerifyMeButton();
});
//Enter Fields and Select InContext as option ScenarioEnds

//Enter the mandatroy fileds and select Redirect as Option Scenario
When("the mandatory field are entered and Redirect is selected", () => {
  VerificationUI.fillFiledsAndSelectInContext();
  VerificationUI.checkRedirect();
  VerificationUI.clickVerifyMeButton();
});
Then("the page is redirected to the verification page", () => {
  VerificationUI.verifyReidrect();
});
//Enter the mandatroy fileds and select Redirect as Option Scenario Ends
