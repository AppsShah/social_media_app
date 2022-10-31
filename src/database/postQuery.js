const { MongoClient } =require("mongodb");
const dotenv = require('dotenv').config()
const mongodb = new MongoClient(process.env.MONGO_URL);
const database='socialMediaApp'
const collection='posts'
const createPosts=(userid,postid,title,description,date)=>mongodb.db(database).collection(collection).insertOne({userid,postid,title,description,createdOn:new Date(date),likes:0,comments:[]})
const findPosts=(postid)=>mongodb.db(database).collection(collection).findOne({postid})
const findAllPostsOfUser=(userid)=>mongodb.db(database).collection(collection).find({userid}).toArray()
const deletePosts=(postid)=>mongodb.db(database).collection(collection).deleteOne({postid})
const commentOnPosts=(postid,comment,commentid)=>mongodb.db(database).collection(collection).updateOne({postid},{$push:{comments:{comment,commentid}}})
const addLike=(postid)=>mongodb.db(database).collection(collection).updateOne({postid},{$inc:{likes:1}})
const removeLike=(postid)=>mongodb.db(database).collection(collection).updateOne({postid},{$inc:{likes:-1}})
module.exports={createPosts,findPosts,deletePosts,findAllPostsOfUser,commentOnPosts,addLike,removeLike}
