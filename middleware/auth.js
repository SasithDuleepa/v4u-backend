const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require ('dotenv').config();

module.exports = function(req,res,next){
    const cookieValue = req.cookies.myCookie;
    const decoded_token = jwt.decode(cookieValue.token, "key", algorithms=["HS256"])
    console.log(decoded_token)
    if(decoded_token.name==="user"){
        
        

        
        next();
        
        
        

    }else
    {
        res.sendStatus(401)
    }

}