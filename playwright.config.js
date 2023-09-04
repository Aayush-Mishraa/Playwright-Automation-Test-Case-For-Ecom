// @ts-check
const { defineConfig, devices } = require('@playwright/test');


const config = {
  testDir: './tests',
  /* Run tests in files in parallel */
 timeout: 30*1000,
 expect:{
  timeout:5000
 },
  /* Fail the build on CI if you accidentally left test.only in the source code. */

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot : 'on',
    trace : 'on',
   
  
   
  },

};
module.exports=config;

