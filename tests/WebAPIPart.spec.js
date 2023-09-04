const {test, expect, request} = require('@playwright/test');

const constPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}; //its a java script value whichwe take it from the the response 
const orderPayload = {orders:[{country:"cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
let token;
let orderId; 

test.beforeAll(async()=>
{ 
    const apiContext = await request.newContext(); 
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data:constPayload //here we give our data 
    })// any data always give the curly braces
   // we do assertion hear to check weather the response we got is succes or not

    expect(loginResponse.ok()).toBeTruthy(); //If it susses we get true
    const loginResponseJson=  await loginResponse.json(); // we get json respones in the json body so we store in one vareable 
     token = loginResponseJson.token; 
    console.log(token);  
    
   //  

   const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
   
   {
      data:orderPayload,
      Headers:
      {
         'Autherization': token,
         'content-type' : 'application/json'
      }
   })
   const orderResponseJson = await orderResponse.json();
   console.log(orderResponseJson);
   orderId = orderResponseJson.orders[0];
});


test.beforeEach(()=>
{

});




test('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage


   //  we insert the java script

    page.addInitScript(value => 
        {
            window.localStorage.setItem('token',value);
        },token );

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
  
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();

    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
 

 });
 
 // npx playwright test tests/ClientApp.spec.js --headed


//                              npx playwright test tests/WebAPIPart1.spec.js --headed