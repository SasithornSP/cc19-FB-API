const express =require('express')
const postRoute =express.Router()
const postController =require("../controller/post-controller")
const upload =require('../middlewares/upload')

// authRoute.post('/register',(req,resp)=>{resp.send('Register')})
postRoute.get('/',postController.getPost)
postRoute.post('/',upload.single('image'),postController.createPost)
postRoute.put('/:id',upload.single('image'),postController.updatePost)
postRoute.delete('/:id',postController.deletePost)

module.exports= postRoute