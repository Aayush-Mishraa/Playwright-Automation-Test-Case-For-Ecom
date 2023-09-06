// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :1,
  workers: 3,
  /* Maximum time one test can run for. */
  //10-
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  projects : [
    {
      name : 'safari',
      use: {

        browserName : 'webkit',
        headless : true,
        screenshot : 'off',
        trace : 'on',//off,on 
        ...devices['iPhone 11'],    
      }

    },
    {
      name : 'chrome',
      use: {

        browserName : 'chromium',
        headless : false,
        screenshot : 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors:true,
        permissions:['geolocation'],
        
        trace : 'on',//off,on
       // ...devices['']
     //   viewport : {width:720,height:720}
         }

    }
    ]

};

module.exports = config;

























// // @ts-check
// const { defineConfig, devices } = require('@playwright/test');


// const config = {
//   testDir: './tests',
//   retries:1, // 2, 5 10, 20  we have togive this in the globle lable  
//   /* Run tests in files in parallel */
//  timeout: 30*1000,
//  expect:{
//   timeout:5000
//  },
//   /* Fail the build on CI if you accidentally left test.only in the source code. */

//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   projects: [

//     // {
//     //   name: 'safari',
//     //   use: {
//     //     browserName: 'webkit',
//     //     headless: false,
//     //     screenshot: 'on',
//     //     trace: 'on',
//     //   }
      
//     // },
//     {
//       name: 'chrome',
//       use: {
//         browserName: 'chromium',
//         headless: false,
//         screenshot: 'on',
//         trace: 'on',
//         video:'retain-on-failure',
//         // ...devices[''],

//         viewport:{width:720,hight:720}
//     }
//   }



//   ]

// };
// module.exports=config;

