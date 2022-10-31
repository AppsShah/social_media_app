const { addingFollowers, addingToFollowing, removeFollowers, removeFollowing } = require("../database/usersQuery")

const user=(req,res)=>{
    const userprofile=req.userData
        res.status(200).send({
            email:userprofile.email,
            noOfFollowers:userprofile.followers.length,
            noOfFollowing:userprofile.following.length,
            followers:userprofile.followers,
            following:userprofile.following
        })
}
const follow=async(req,res)=>{
    const followerUser=req.followerUser
    const followingUser=req.userData
    let count=0
    followerUser.followers.forEach(element => {
        if(element===followingUser.id){
            count++
        }
    });
    if(count>0){
        res.status(200).send({message:'You are already following user'})
            return 
    }
    await Promise.allSettled([addingFollowers(followerUser.id,followingUser.id),
        addingToFollowing(followerUser.id,followingUser.id)])
    res.status(200).send({message:'Successfully followed!'})
}

const unfollow=async(req,res)=>{
    const reqUnfollowUser=req.followerUser
    const userToUnfollow=req.userData
    let count=0
    reqUnfollowUser.followers.forEach(element => {
        if(element===userToUnfollow.id){
            count++
        }
    });
    if(count===0){
        res.status(200).send({message:'You are already not following user'})
            return 
    }
    await Promise.allSettled([removeFollowers(reqUnfollowUser.id,userToUnfollow.id),removeFollowing(reqUnfollowUser.id,userToUnfollow.id)])
    res.status(200).send({message:'Successfully unfollowed!'})
}
module.exports={user,follow,unfollow}