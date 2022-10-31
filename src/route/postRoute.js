const { createPost,deletePost,findSinglePost,findAllPost, commentOnPost} = require('../controller/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const url =require('url')
const { verifypost, postAndUserVerify, verifyComment ,postVerify} = require('../middleware/postMiddleware');

const router=require('express').Router();
//create new post
router.post('/',verifyToken,verifypost,createPost)
//delete post
router.delete('/:id',verifyToken,postAndUserVerify,deletePost)
// get single post
router.get('/:id',verifyToken,postAndUserVerify,findSinglePost)
//get all post
router.get('/',verifyToken,findAllPost)
// comment
router.post('/:id',verifyToken,verifyComment,postVerify,commentOnPost)
module.exports=router