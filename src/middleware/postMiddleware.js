const { findPosts } = require("../database/postQuery")

const verifypost=(req,res,next)=>{
    const {title,description}=req.body
    console.log(title,description)
    if(!title || !description){
        res.status(401).send({message:'please provide proper post contant Mandatory title and description'})
        return 
    }
    return next()
}

const postAndUserVerify=async(req,res,next)=>{
    const postId=req.params.id
    const userId=req.userData.id
    const post=await findPosts(postId)
    if(!post || !post.userId===userId){
        res.status(401).send({message:'post is not available'})
        return
    }
    req.singlePost=post
    return next()
}
const postVerify=async(req,res,next)=>{
    const postId=req.params.id
    const userId=req.userData.id
    const post=await findPosts(postId)
    if(!post){
        res.status(401).send({message:'post is not available'})
        return
    }
    req.singlePost=post
    return next()
}
const verifyComment=async(req,res,next)=>{
    const comment=req.body.comment
    if(!comment || !typeof comment===String){
        res.status(401).send({message:'please provide proper comment'})
    }
    return next()
}
module.exports={verifypost,postAndUserVerify,verifyComment,postVerify}