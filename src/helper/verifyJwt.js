const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config()
const jwtverify=async (token)=>{
    const decode=await jwt.verify(token,process.env.SECRET_KEY)
    return decode
}
module.exports={jwtverify}