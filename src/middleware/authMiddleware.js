const { jwtverify } = require("../helper/verifyJwt")
const { findUserByEmail, findUserById } = require("../database/usersQuery")

const checkEmailAndPassword=async(req,res,next)=>{
    const email=req.body.email
    const password=req.body.password
    const reg=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!email || !reg.test(email)){
        res.status(401).send({message:'Email is not proper!'})
        return 
    }
    if(!password){
        res.status(401).send({message:'Password is not proper!'})
        return
    }
    const user=await findUserByEmail(email)
    if(!user){
        res.status(401).send({message:'user not found!'})
        return
    }
    if(user.password!==password){
        res.status(401).send({message:'Incorrect password!'})
        return
    }
    req.sendUser={user}
    return next()
}

const verifyToken=async(req,res,next)=>{
try {
    const token=req.headers.authorization.split(' ')[1]
    const userdata=await jwtverify(token)
    if(userdata){
        const isUserPresent=await findUserById(userdata.id)
        if(isUserPresent){
            req.userData=isUserPresent
            return next()
        }
        res.status(401).send({message:'No user found'})
        return
    }
} catch (error) {
    res.status(401).send({message:'User token is not valid'})
    return
}
}



module.exports={checkEmailAndPassword,verifyToken}