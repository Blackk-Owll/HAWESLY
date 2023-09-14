const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");


async function TestAddAnnonce(){
 
   
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();

    // ouvrir a page pour ajouter une annonce 
     await driver.get("http://localhost:3000/add-listing-test");
    
     setTimeout(() => {  console.log("World!"); }, 2000);
     // remplir les champs      

     // titre 
     await driver.findElement(By.name("titre")).sendKeys(" titre test  ",Key.RETURN);
     setTimeout(() => {  console.log("World!"); }, 2000);
     
     // DESCRIPTION 
     await driver.findElement(By.name("description")).sendKeys(" description de l'annonce pour test   ",Key.RETURN);
     setTimeout(() => {  console.log("World!"); }, 2000);
     
     // prix 
     await driver.findElement(By.name("prix")).sendKeys(5000000,Key.RETURN);
     setTimeout(() => {  console.log("World!"); }, 2000);
     
     // surface 
     await driver.findElement(By.name("surface")).sendKeys(200,Key.RETURN);
     setTimeout(() => {  console.log("World!"); }, 2000);
    
    // type 
    //await driver.findElement(By.name("type")).click("Maison",Key.RETURN);
     setTimeout(() => {  console.log("World!"); }, 2000);
     
    // categorie 
    
     //await driver.findElement(By.id("type")).click();
     //setTimeout(() => {  console.log("World!"); }, 2000);

     // adress 
     await driver.findElement(By.name("adresse")).sendKeys("rue N° ... ",Key.RETURN);
     //await driver.findElement(By.css(selector),("adresse")).sendKeys("rue N° ... ",Key.RETURN);
     setTimeout(() => {  console.log("World!"); }, 2000);
    
     //await driver.findElement(By.id("confirmer")).click();
     
    //await driver.findElement(By.id("confirmer")).submit()
     //Verify the page title and print it
     var title = await driver.getTitle();
     (title==="http://localhost:3000/add-listing-test")?
     console.log('Title sucess title is :',title):
     console.log("erreur ! ",title);

     //It is always a safe practice to quit the browser after execution
    //await driver.quit();
    
}

TestAddAnnonce();