const tryCatch = require("../utils/tryCatch")
const cloudinary =require('../config/cloudinary')
const path =require("path")
const prisma = require('../models')
const createError=require("../utils/createError")
const fs =require("fs/promises")

module.exports.createPost =tryCatch(async(req,resp)=>{
        const {message}=req.body
        const haveFile =!!req.file
        let uploadResult ={}
        if(haveFile) {
            console.log(req.file.path)
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                overwrite : true,
                public_id : path.parse(req.file.path).name
            })
            fs.unlink(req.file.path)
        }
        // console.log(uploadResult);
        const data = {
            message:message,
            image :uploadResult.secure_url || '',
            userId:req.user.id 
        }
        const rs =await prisma.post.create({data:data})
        resp.status(201).json({msg:"create post done",result:rs})

    // const {message}=req.body
    // console.log(req.body);
    // console.log(req.file);
    // resp.json({msg:'Create Post',filename:req.file.originalname,message:message ,user:req.user.firstname})
})
module.exports.getPost =tryCatch(async(req,resp)=>{
    const rs = await prisma.post.findMany({
        orderBy:{createdAt:"desc"},
        include : {
            user:{
                select:{

                    firstname:true,lastname:true,profileImage:true
                }
            },
     
        comments :{
            // select:{ message:true},
            include:{
            user:{
                select:{
                    firstname:true,lastname:true,profileImage:true
                    }
            }
        }
        },
        likes  :{
            include:{
                user:{
                    select:{
                        firstname:true,lastname:true,profileImage:true
                        }
                 }
             }
         }
   
    }
    })
    resp.json({posts:rs})
})

module.exports.deletePost =tryCatch(async(req,resp)=>{
    const {id}=req.params

    const postData = await prisma.post.findUnique({where:{id:+id}})
    console.log(postData);
    if(req.user.id !== postData.userId){
        createError(400,'Cannot delete')
    }
    const rs =await prisma.post.delete({
        where:{id:+id}
    })
    resp.json({msg:`Delete post ${id} Done`,deletePost:postData})
})

module.exports.updatePost =tryCatch(async(req,resp)=>{
    const {id} =req.params
    const {message,removePic}=req.body

    const postData = await prisma.post.findUnique({where:{id:+id}})
    if(!postData || req.user.id !== postData.userId){
        createError(400,'Cannot edit this post')
    }
    const haveFile = !!req.file
    if(haveFile){
        uploadResult = await cloudinary.uploader.upload(req.file.path, {
            overwrite:true,
            public_id:path.parse(req.file.path).name
        })
        fs.unlink(req.file.path)
    }
    let data = haveFile 
    ? {message, image: uploadResult.secure_url, userId:req.user.id}
    : {message, userId: req.user.id,image:removePic? '' : postData.image }
    const rs = await prisma.post.update({
        where:{id:+id},data
    })

    resp.json({msg:'Update Post'})
})