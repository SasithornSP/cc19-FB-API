require('dotenv').config()
const express = require("express")
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/errorMiddleware')
const authRoute = require('./routes/auth-route')
const app =express()
const cors =require('cors')
const morgan=require('morgan')
const helmet=require('helmet')

// app.use(cors({
//     origin:'http://localhost:5173'}))

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
//rotes
// app.use("/",(req,resp)=>{})
app.use("/auth",authRoute)
app.use("/post",(req,resp)=>{resp.send('post service')})
app.use("/comment",(req,resp)=>{resp.send('comment service')})
app.use("/like",(req,resp)=>{resp.send('like service')})

//notfound
app.use(notFound)

//error middlewares
app.use(errorMiddleware)

const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`Server runing on ${port}`))