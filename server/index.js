
const userRoute = require('./routes/user');
//setup express server 
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 4000;


//setup middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();
//setup route
router.route('/productDetails').post(userRoute.userRoute);
router.route('/user').get(userRoute.getUser);
//handle get request 
app.use("/", router);
//setup port
app.listen(PORT, function () {
    console.log('Server is running on port: ', PORT);
}
);


