const  scrapper  = require( "../scrapper/index")
const processData = require("../scrapper/processData")
exports.userRoute = async (req, res) => {
          const  {productName , noOfProduct } = req.body;
         
     if(!productName || !noOfProduct){
         return res.status(400).json({msg: 'please enter all fields'});
     }
     if(noOfProduct > 50){
        return res.status(400).json({msg: 'max 50 products allowed'});
     }
       const data = await  scrapper(productName,noOfProduct);
        // const processedData =    await processData(data);


       res.status(200).json({data: data});
            console.log("Post Request to /user");
            


}
exports.getUser = async (req ,res) => {
   
    console.log("Get Request to /user");
    res.status(200).json({msg: 'Successfull'});
}