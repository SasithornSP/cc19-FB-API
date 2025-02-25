require('dotenv').config()
const express = require("express")
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/errorMiddleware')
const authRoute = require('./routes/auth-route')
const app =express()
const cors =require('cors')
const morgan=require('morgan')
const helmet=require('helmet')
const postRoute =require("./routes/post-route")
const authenticate = require('./middlewares/authenticate')
const commentRoute = require('./routes/comment-route')
const likeRoute = require('./routes/like-route')


// app.use(cors({
//     origin:'http://localhost:5173'}))

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
//rotes
// app.use("/",(req,resp)=>{})
app.use("/auth",authRoute)
app.use("/post",authenticate,postRoute)
app.use("/comment",authenticate,commentRoute)
app.use("/like",authenticate,likeRoute)

//notfound
app.use(notFound)

//error middlewares
app.use(errorMiddleware)

const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`Server runing on ${port}`))