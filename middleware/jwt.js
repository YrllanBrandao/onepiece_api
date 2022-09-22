const jwt = require("jsonwebtoken");
const dotenv = require("dotenv/config");
const auth = (req, res, next) =>{

    const authToken = req.headers['authorization'];

    if(authToken !== undefined)
    {
        const bearer = authToken.split(' ');
        
        console.log(token +"<<")
        jwt.verify(token, process.env.JWTSECRET, (error, data)=>{
            
            if(error)
            {
                res.status(401).json({
                    'token': 'invalid token'
                })
            }
            else{
               
                next();
            }
        })
    }
    else{
        res.status(401).json({
            'RESPONSE': 'UNAUTHORIZED'
        })
    }
   
   
}

module.exports = auth;