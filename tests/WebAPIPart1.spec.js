const {test, expect, request} = require('@playwright/test');
const { APiUtils } = require('../Utils/APiUtils'); //to import the class 

const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayload = {orders:[{country:"cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};

// let token;
// let orderId; 
let response;
test.beforeAll(async()=>
{ 
    const apiContext = await request.newContext(); 
    const apiUtils = new APiUtils(apiContext, loginPayload); //create the object of the apiutils & and sending the logingpayload 
    response = await apiUtils.createOrder(orderPayload); //we sending oder Payload as a input
});

test('@Client App login', async ({ page }) => 
{
// we make a object of class so we can call
    // const apiUtils = new APiUtils(apiContext,loginPayload);
    // const orderId = createOrder(orderPayload);
    page.addInitScript(value => 
        {
            window.localStorage.setItem('token',value);
        }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();

    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 });
 
 // npx playwright test tests/ClientApp.spec.js --headed


//                              npx playwright test tests/WebAPIPart1.spec.js --headed