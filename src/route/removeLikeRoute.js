const {removeLikeFromPost} = require('../controller/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const {postVerify } = require('../middleware/postMiddleware');

const router=require('express').Router();
// Remove post
router.post('/:id',verifyToken,postVerify,removeLikeFromPost)
module.exports=router