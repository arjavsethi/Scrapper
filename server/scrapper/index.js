const puppeteer = require('puppeteer');
const processData = require("./processData.js");
const getProductCode = require('./utils/getProductCode.js');
  const scrapper = async (productName,noOfProduct) => {
   
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
      
      await page.goto("https://www.amazon.in/",{waitUntil: "networkidle2"});
      try {
        await page.waitForSelector("#twotabsearchtextbox");
        await page.type("#twotabsearchtextbox", productName);
      } catch (error) {
        
        await page.type("#twotabsearchtextbox", productName);
      }
      
      await page.click("#nav-search-submit-text");
      await page.waitForNavigation();
      // await page.waitForSelector(".s-result-item .s-card-border");
      console.log("new page loaded")
      
      
      
       let  products = await page.evaluate((noOfProduct) => {
          console.log("evaluating...")
          let results = [];
         
          const items = document.querySelectorAll(".s-result-item .s-card-border");
         
          
          for (let i = 0; i < 10; i++ ) {
        
            const item = items[i];
            let title , price , cents , image , url , newUrl , asin ,rating,originalPrice,discount,noOFReviews, isDotd, dotdPrice,isFreeDelivery;
            try{ title = item.querySelector("h2 > a > span"); }catch(e){console.log(e)}
             try{price = item.querySelector(".a-price-whole");}catch(e){console.log(e)}
         
       
             try {cents = item.querySelector(".a-price-fraction");}catch(e){console.log(e)}
             try  {image = item.querySelector("img");}catch(e){console.log(e)}
        try {url = item.querySelector("h2 > a").getAttribute("href");}catch(e){console.log(e)}
        try {const ratingElement = item.querySelector(".a-icon-star-small .a-icon-alt");
              rating = ratingElement ? ratingElement.textContent : "N/A"; 
             } catch (error) { console.log(error)  
                
        }
        try {
          const priceElement = item.querySelector('.a-price.a-text-price .a-offscreen');
           originalPrice = priceElement ? priceElement.textContent : "N/A";
        } catch (error) {
          
        }
        try {
          discount=  item.querySelector(".s-price-instructions-style").querySelector('.a-letter-space').nextElementSibling.textContent
        } catch (error) { 
        }
        try{
       const elemets=   item.querySelector(".s-price-instructions-style").previousElementSibling.getElementsByTagName('div');
           noOFReviews = elemets[0].getElementsByTagName('span')[3].innerText;
        }catch(e){  console.log(e)} 

        try {
      const str =   item.querySelector(".s-price-instructions-style").innerText;
      if(str.includes("Deal of the Day")){
        isDotd = true;
      }else{
        isDotd =  false;
      }

        } catch (error) { }

            if(isDotd){
              dotdPrice = price?.innerText?price?.innerText:"N/A"; 
              }


        try {
        const str =  item.querySelector(".s-price-instructions-style").nextElementSibling.innerText;
        if(str.includes("FREE Delivery by Amazon")){
          isFreeDelivery = true;
        }
        } catch (error) {}    
            newUrl = "https://www.amazon.in" + url;
              const pattern = /dp\/([A-Z0-9]+)/;
              const matches = url.match(pattern);
               asin  = matches ? matches[1] : null;
         
    
        
            // if (!title || !price || !image || !newUrl) continue;
            let obj = {
              title: title?.innerText?title?.innerText:"",
              price: price?.innerText?price?.innerText:"N/A",
              image: image?.getAttribute("src")?image?.getAttribute("src"):"Not Found",
              url : newUrl?newUrl:"Not Found",
       
              rating : rating?rating:"Not Found",
              ranking : i+1,
              originalPrice : originalPrice?originalPrice:"Not Found",
              discount : discount?discount:"No discount",
              noOFReviews : noOFReviews?noOFReviews:"Not review",
              isDotd : isDotd?isDotd:false,
              dotdPrice : dotdPrice?dotdPrice:"Not Deal of the day",
              isFreeDelivery : isFreeDelivery?isFreeDelivery:false
            }
            results.push(obj);
        
             
          
           
          }
          return results;
        });
    
    
      console.log(products);
      console.log(products.length);
    const finalProductData=  await processData(products,page);
      await browser.close();
      return finalProductData;
  
   
};



module.exports = scrapper;