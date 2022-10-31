const {likePost} = require('../controller/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const {postVerify } = require('../middleware/postMiddleware');

const router=require('express').Router();
// like post
router.post('/:id',verifyToken,postVerify,likePost)
module.exports=router