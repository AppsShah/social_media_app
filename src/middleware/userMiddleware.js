const { findUserById } = require("../database/usersQuery")

const followCheck=async(req,res,next)=>{
    const followerId=req.params.id
    const usersId=req.userData.id
    if(!followerId){
        res.status(401).send({message:'Please provide Id'})
        return
    }
    if(usersId===followerId){
        res.status(401).send({message:'You cannot follow or unfollow yourself'})
        return
    }
    const followerUser=await findUserById(followerId)
    if(!followerUser){
        res.status(401).send({message:'User not found'})
        return
    }
    req.followerUser=followerUser
    return next()
}
module.exports={followCheck}