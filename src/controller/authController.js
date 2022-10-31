const jwt = require('jsonwebtoken')

const auth=(req,res)=>{
    const user=req.sendUser.user
    const jwttoken=jwt.sign({
        id:user.id,
        email:user.email
      }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res.status(200).send({
        token:jwttoken
    })}

module.exports={auth}