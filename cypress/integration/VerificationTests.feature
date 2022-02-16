Feature: Tests for the configuration of the verification flow

    Successfully test the configuratio of the verification flow

    Scenario: Click  Verify Me without filling any details
        Given the platform is opened
        When the verify me button is clicked
        Then the verification dialogue box appears

    Scenario: Enter the mandatroy fileds and select InContext as Option
        Given the platform is opened
        When the mandatory field are entered and InContext is selected
        Then the verification dialogue box appears

    Scenario: Enter the mandatroy fileds and select Redirect as Option
        Given the platform is opened
        When the mandatory field are entered and Redirect is selected
        Then the page is redirected to the verification page