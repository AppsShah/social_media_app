const { auth } = require('../controller/authController');
const {checkEmailAndPassword} = require('../middleware/authMiddleware');
const router=require('express').Router();

router.post('/',checkEmailAndPassword,auth)

module.exports=router