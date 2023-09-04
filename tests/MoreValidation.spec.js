const{test,expect} =require('@playwright/test')



test("Popup validation", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    //navigation 
    // await page.goBack();
    // await page.goForword();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();


//how to handle popup java

// await page.pause(); 
page.on('dailoge', dailog => dailog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();




//To access to the chid window 
const framePage = page.frameLocator("#courses-iframe");
framePage.locator("li a[href='lifetime-access']:visible").click();
const testCheck = await framePage.locator(".text h2").textContent();
console.log(testCheck.split(" ")[1]);

});

//  npx playwright test tests/MoreValidation.spec.js --debug