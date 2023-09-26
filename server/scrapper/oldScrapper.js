const puppeteer = require('puppeteer');
const getProductCode = require('./utils/getProductCode.js');
  const scrapper = async () => {
   
      const browser = await puppeteer.launch({
        headless: false,
        
      });
      const page = await browser.newPage();
      // improving network performance
      await page.setViewport({ width: 1920, height: 1080 });
      await page.setRequestInterception(true);
      
      page.on('request', (req) => {
        //req.resourceType() == 'stylesheet' ||req.resourceType() == 'font' || 
          if( req.resourceType() == 'image'){
              req.abort();
          }
          else {
              req.continue();
          }
      });
      
      await page.goto("https://www.amazon.in/");
      await page.type("#twotabsearchtextbox", "Mens Shirt");
      await page.click("#nav-search-submit-text");
      await page.waitForNavigation();
      // await page.waitForSelector(".s-result-item .s-card-border");
      console.log("new page loaded")
      
      
      
       let  products = await page.evaluate(() => {
          console.log("evaluating...")
          let results = [];
         
          const items = document.querySelectorAll(".s-result-item .s-card-border");
         
          
          for (let i = 0; i < items.length; i++ ) {
          try {
            const item = items[i];
            const title = item.querySelector("h2 > a > span");
            const price = item.querySelector(".a-price-whole");
            const cents = item.querySelector(".a-price-fraction");
            const image = item.querySelector("img");
            const url = item.querySelector("h2 > a").getAttribute("href");
              let newUrl = "https://www.amazon.in" + url;
        

              const pattern = /dp\/([A-Z0-9]+)/;
              const matches = url.match(pattern);
              const asin  = matches ? matches[1] : null;
         
              console.log(title.innerText,parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`),image.getAttribute("src"),image.getAttribute("src"),  i)
    
        
            // if (!title || !price || !image || !newUrl) continue;
            let obj = {
              title: title.innerText?title.innerText:"",
              price: parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`)?parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`):"Not Found",
              image: image.getAttribute("src")?image.getAttribute("src"):"Not Found",
              url : newUrl?newUrl:"Not Found",
              asin : asin?asin:"Not Found",

            }
            results.push(obj);
          } catch (error) {
              console.log("error in addind")
          }
             
          
           
          }
          return results;
        });
    
    
      console.log(products);
      // await browser.close();
      return products;
  
   
};
const scrapeProducts = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.amazon.com/");
    await page.type("#twotabsearchtextbox", "JavaScript book");
    await page.click("#nav-search-submit-text");
    await page.waitForNavigation();
    const products = await page.evaluate(() => {
      let results = [];
      const items = document.querySelectorAll(".s-result-item .s-card-border");
      for (let i = items.length; i--; ) {
        const item = items[i];
        const title = item.querySelector("h2 > a > span");
        const price = item.querySelector(".a-price-whole");
        const cents = item.querySelector(".a-price-fraction");
        const image = item.querySelector("img");
        if (!title || !price || !image) continue;
        results = [...results, {
          title: title.innerText,
          price: parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`),
          image: image.getAttribute("src")
        }]
      }
      return results;
    });
    console.log(products);
    console.log(products.length)
    await browser.close();
  }
module.exports = scrapper;