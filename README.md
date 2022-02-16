# sample_test_cypress

This repo contains automation tests for the Veriff: Document Verifaction Platform

#Setting Up

Download the repo to your local system.  
 `git clone https://github.com/adi0709/sample_test_cypress.git` 2. Make sure you have node and npm installed. 3. Make sure to install the latest version of cypress in the folder.
Use the commands:  
 `npm install cypress --save-dev`  
 or  
 `yarn add cypress --dev`

4. Make sure to update all the dependencies
   `npm install`
5. Execute the UI tests by running the following commands  
   `npx cypress open`  
   or  
   `npx cypress run --headed --browser chrome`
6. To execute the API tests we'll have to remove
   `"testFiles": "**/*.feature",` from `cypress.json` file
   and execute
   `npx cypress run --spec ./cypress/integration/APITests/ApiTests.spec.js --headed --browser chrome`

7. The reports will be generated in the `Reports` folder after a test run along with the Videos of the Tests run in the `Test` folder.
