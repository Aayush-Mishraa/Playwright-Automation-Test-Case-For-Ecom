const {test,expect}=require('@playwright/test');
// const { expect } = require('../playwright.config');


test('First Playwright test', async ({browser})=>
{
//Playwright code-

const context = await browser.newContext();
const page =  await context.newPage();

//for login into the page 
const username = page.locator('input#username');
const signIn = page.locator('#signInBtn')

//this locator to select all the loactor and make the list     
const cardTitles = page.locator(".card-body a");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await username.type("ayush")
await page.locator("[type = 'password']").type("learning");
await signIn.click();

console.log(await page.locator("[style*= 'block']").textContent());
await expect(page.locator("[style*= 'block']")).toContainText('Incorrect');

await username.fill("");
await username.fill("rahulshettyacademy");
await signIn.click();

// console.log(await cardTitles.nth(0).textContent());
// console.log(await cardTitles.nth(1).textContent());
const alltitles = await cardTitles.allTextContents();
console.log(alltitles);


});

test('UI control', async ({browser})=>
{
    const context = await browser.newContext();
const page =  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('input#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("Teacher");
   
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText"); 

});

test('child window handle', async ({browser})=>
{
const context = await browser.newContext();
const page =  await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink= page.locator("[href*='documents-request']");

const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),

])
const text = await newPage.locator(".red").textContent();
const arrayText = text.split("@");
const domain = arrayText [1].split(" ")[0]
console.log(domain);
});




























// test('Page Playwright test', async ({page})=>  //page fixeer we use to call the url direclty 
// {

// await page.goto("https://rahulshettyacademy.com/client/");
// //get title
// console.log(await page.title());
// await expect(page).toHaveTitle("Google");




// });