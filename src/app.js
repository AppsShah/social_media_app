const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const morgan=require('morgan')
const userRoute=require('./route/userRoute')
const authRoute=require('./route/authRoute')
const postRoute=require('./route/postRoute')
const likeRoute=require('./route/likeRoute')
const removeLike=require('./route/removeLikeRoute')
const connectMongo = require('./database/mongodbConnection')
const app=express()
dotenv.config()
//mongo db connect
connectMongo()

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('common'))


//request
app.get('/',(req,res)=>{
    res.status(200).send({
        status:200,
        message:'welcome to social media app'
    })
})
app.use('/api',userRoute)
app.use('/api/authenticate',authRoute)
app.use('/api/posts/',postRoute)
app.use('/api/all_posts',postRoute)
app.use('/api/comment',postRoute)
app.use('/api/like/',likeRoute)
app.use('/api/unlike/',removeLike)


const server=app.listen(process.env.PORT || 3000,()=>{
    console.log('Node server started !')
})

module.exports=server