const { user, follow, unfollow } = require('../controller/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { followCheck } = require('../middleware/userMiddleware');
const router=require('express').Router();
router.get('/user',verifyToken,user)
router.post('/unfollow/:id',verifyToken,followCheck,unfollow)
router.post('/follow/:id',verifyToken,followCheck,follow)
module.exports=router