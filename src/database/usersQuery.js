const { MongoClient } =require("mongodb");
const dotenv = require('dotenv').config()
const mongodb = new MongoClient(process.env.MONGO_URL);
const database='socialMediaApp'
const collection='users'
const findUserByEmail=(email)=>mongodb.db(database).collection(collection).findOne({email})
const findUserById=(id)=>mongodb.db(database).collection(collection).findOne({id})
const addingFollowers=(followerId,followingId)=>mongodb.db(database).collection(collection).updateOne({id:followerId},{$push:{followers:followingId}})
const addingToFollowing=(followerId,followingId)=>mongodb.db(database).collection(collection).updateOne({id:followingId},{$push:{following:followerId}})
const removeFollowers=(reqUnfollowUserId,userToUnfollowId)=>mongodb.db(database).collection(collection).updateOne({id:userToUnfollowId},{$pull:{following:reqUnfollowUserId}})
const removeFollowing=(reqUnfollowUserId,userToUnfollowId)=>mongodb.db(database).collection(collection).updateOne({id:reqUnfollowUserId},{$pull:{followers:userToUnfollowId}})
module.exports={findUserByEmail,findUserById,addingFollowers,addingToFollowing,removeFollowers,removeFollowing}
