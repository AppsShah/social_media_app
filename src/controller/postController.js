const { v4: uuidv4 } = require('uuid');
const { createPosts, deletePosts,findAllPostsOfUser, commentOnPosts, addLike, removeLike } = require('../database/postQuery');
const createPost=async(req,res)=>{
    const userid=req.userData.id
    const {title,description}=req.body
    const postid=uuidv4();
    const createOn=new Date()
    const db=await createPosts(userid,postid,title,description,createOn)
    res.status(200).send({
        postId:postid,
        title,
        description,
        createOn
    })
}
const deletePost=async(req,res)=>{
    const postid=req.params.id
    await deletePosts(postid)
    res.status(200).send({message:'post deleted successfully'})
}
const findSinglePost=async(req,res)=>{
    const post=req.singlePost
    res.status(200).send({title:post.title,description:post.description,likes:post.likes,comments:post.comments,createdOn:post.createdOn})
}
const findAllPost=async(req,res)=>{
    const userId=req.userData.id
    
    const allPosts=await findAllPostsOfUser(userId)
    const ShowPosts=[]
    allPosts.forEach((element)=>{
        ShowPosts.push({
            postId:element.postid,
            title:element.title,
            description:element.description,
            createdAt:element.createdOn,
            likes:element.likes,
            comments:element.comments
        })
    })
    res.status(200).send(ShowPosts)
}
const commentOnPost=async(req,res)=>{
    const {comment}=req.body
    const postid=req.params.id
    const commentid=uuidv4()
    commentOnPosts(postid,comment,commentid)
    res.status(200).send({
        commentId:commentid
    })
}
const likePost=async(req,res)=>{
    const postid=req.params.id
    await addLike(postid)
    res.status(200).send({message:'Like the post'})
}
const removeLikeFromPost=async(req,res)=>{
    const postid=req.params.id
    await removeLike(postid)
    res.status(200).send({message:'Unlike the post'})
}
module.exports={createPost,deletePost,findSinglePost,findAllPost,commentOnPost,likePost,removeLikeFromPost}