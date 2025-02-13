require('dotenv').config()
const express = require("express")
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/errorMiddleware')
const authRoute = require('./routes/auth-route')
const app =express()

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