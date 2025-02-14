const createError = require("../utils/createError")
const jwt =require('jsonwebtoken')

const tryCatch = require("../utils/tryCatch")
const prisma = require("../models")

//ตรวจToken ว่าใช่คนเดียวกันไหม
module.exports =tryCatch(async(req,resp,next)=>{
    const authorization =req.headers.authorization
    if(!authorization || !authorization.startsWith('Bearer ')){
       createError(401,'Unauthorized1')
    }
    const token = authorization.split(' ')[1]
    console.log(token);
    if(!token){
       createError(401,'Unauthorized 2')
    }
    const payload =jwt.verify(token,process.env.JWT_SECRET)
    console.log(payload);
   
   
    //เอา payload.id ไปหาuser
    const foundUser =await prisma.user.findUnique({
        where:{id:payload.id}
     })
     console.log(foundUser);
     if(!foundUser){
        createError(401,"Unauthorized 3")
     }
   
    //สร้าง userData ที่ไม่มีkey : password ,createdAt,updateAt
    const {password,creatAt,updateAt,...userData}=foundUser
   console.log(userData);
    //ฝากข้อมูล user ไว้ที่ req object : keyชื่อ req.user
    req.user =userData
    next()
   })

   