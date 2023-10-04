const puppeteer = require('puppeteer');


const processData =async(data,page)=>{
    const finalProductData = [];
      
      for(let i = 0 ; i < data.length ; i++){
        const item = data[i];
        try {
        await page.goto(item.url, { waitUntil: 'networkidle2' });
          
        } catch (error) {
          console.log(error + " "+ "Error in processData")
          finalProductData.push({...item})
          continue;
        }
       
         const newData = await page.evaluate(() => {
          let deliverdBy , availabilty ,soldBy ,newAsin;
            try {
                const element = document.getElementById("mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE");
                const text = element.innerText;
                const match = text.match(datePattern);
                    if (match) {
                    const day = match[1];
                    const month = match[2];

                    deliverdBy= day + ' ' + month;

                    } 

            } catch (error) {} 
           try {
                 const text=   document.querySelector("#availabilityInsideBuyBox_feature_div").innerText;
              if(text.includes("In stock")){
            availabilty = true;}
           } catch (error) {}
             try {
            const element = document.querySelector("#shipsFromSoldByInsideBuyBox_feature_div").innerText;
            soldBy = element;

             } catch (error) {}
             try {
               const string = window.location.href;
              //  const pattern = /dp\/([A-Z0-9]+)/;
                const match = string.match(/\/dp\/(.*)\//);
                newAsin = match[1];

             } catch (error) {
              
             }
             const obj = {deliverdBy:deliverdBy?deliverdBy:"N/A" , 
             availabilty : availabilty?availabilty:"N/A" ,
             soldBy : soldBy?soldBy:"N/A",
            asin : newAsin?newAsin:"N/A" };
            ;
          return obj;
        });
        
     finalProductData.push( {...item , ...newData});

 }

    




    return finalProductData;
}

module.exports = processData;